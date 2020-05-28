"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showJobs = exports.showProfile = exports.createJob = exports.logout = exports.login = exports.createEmployer = exports.showRegistrationForm = exports.showLoginForm = exports.showDashboard = exports.showIndex = exports.ERROR_AUTH_FAILED = void 0;
const bcryptjs = require("bcryptjs");
const collection_1 = require("@quenk/safe-mongodb/lib/database/collection");
const response_1 = require("@quenk/tendril/lib/app/api/action/response");
const control_1 = require("@quenk/tendril/lib/app/api/action/control");
const pool_1 = require("@quenk/tendril/lib/app/api/action/pool");
const monad_1 = require("@quenk/noni/lib/control/monad");
const record_1 = require("@quenk/noni/lib/data/record");
const future_1 = require("@quenk/noni/lib/control/monad/future");
const employer_1 = require("@board/checks/lib/employer");
const job_1 = require("@board/checks/lib/job");
exports.ERROR_AUTH_FAILED = 'Invalid Email or password! Try again.';
/**
 * showIndex of the site.
 *
 * For now this will redirect to the dashboard if the user is logged in
 * or to the login form if they are not.
 *
 * In a future iteration this will display recent job postings.
 */
exports.showIndex = (r) => {
    let req = r;
    if (req.session.user == null) {
        return response_1.redirect('/login', 302);
    }
    else {
        return response_1.redirect('/dashboard', 302);
    }
};
/**
 * showDashboard displays the application dashboard.
 */
exports.showDashboard = (_) => response_1.show('dashboard.html', {});
/**
 * showLoginForm displays the user login form.
 */
exports.showLoginForm = (r) => response_1.show('login.html', r.session);
/**
 * showRegistrationForm displays the employer regisration form.
 */
exports.showRegistrationForm = (r) => response_1.show('employer/registration/form.html', r.session);
/**
 * createEmployer creates a new user account for an employer.
 *
 * It works like this:
 * 1. We apply the Employer check to the request body to see if its valid.
 * 2. If yes we save the employer in the "users" collection and redirect
 *    to the login page.
 * 3. If not, we store the errors in the session and redirect to the form.
 */
exports.createEmployer = (req) => monad_1.doN(function* () {
    let r = req;
    let eResult = yield control_1.await(() => employer_1.check(r.body));
    if (eResult.isRight()) {
        let data = eResult.takeRight();
        let db = yield getMain();
        let collection = db.collection('users');
        yield control_1.await(() => collection_1.insertOne(collection, data));
        return response_1.redirect('/login', 303);
    }
    else {
        //TODO: expand the errors so they make sense.
        if (r.session != null)
            r.session.errors = eResult.takeLeft().explain();
        return response_1.redirect('/', 303);
    }
});
/**
 * login attempts to authenticate a user so they can access the protected
 * resources of the application.
 *
 * It works like this:
 *
 * 1. The user submits an email and password.
 * 2. If we have no matching email in the database, we redirect and tell the
 *    user their attempt failed.
 * 3. If there is a matching email, we retreive the password hash for it.
 * 4. We then compare the provided password to the hash we have in the database.
 * 5. If the comparison is successful, we refres the session and store the
 *    user's id, then redirect to the dashboard.
 * 6. If the comparisson fails, we redirect the user and tell them their attempt
 *    failed.
 */
exports.login = (req) => monad_1.doN(function* () {
    //shut the compiler up.
    let r = req;
    //If a session does not exist, the user is probably not
    //using our form so we reject the request.
    if (r.session == null)
        return response_1.redirect('/login', 303);
    if (record_1.isRecord(r.body)) {
        let email = r.body.email;
        let password = r.body.password;
        let db = yield getMain();
        let users = db.collection('users');
        let qry = { email: email };
        let mUser = yield control_1.await(() => collection_1.findOne(users, qry));
        if (mUser.isNothing()) {
            r.session.error = exports.ERROR_AUTH_FAILED;
            return response_1.redirect('/login', 303);
        }
        let user = mUser.get();
        let didMatch = yield control_1.await(() => compare(password, user.password));
        if (didMatch) {
            //regenerate the session to start a fresh.
            yield control_1.await(() => future_1.fromCallback(cb => r.session.regenerate(cb)));
            r.session.user = user.id;
            return response_1.redirect('/dashboard', 303);
        }
        else {
            r.session.error = exports.ERROR_AUTH_FAILED;
            return response_1.redirect('/login', 303);
        }
    }
    else {
        r.session.error = exports.ERROR_AUTH_FAILED;
        return response_1.redirect('/login', 302);
    }
});
const compare = (pwd, hash) => future_1.fromCallback(cb => bcryptjs.compare(pwd, hash, cb));
/**
 * logout the user from the application.
 *
 * This basically destroys the session so we no longer know who the user is.
 */
exports.logout = (req) => monad_1.doN(function* () {
    let r = req;
    if (r.session != null)
        yield control_1.await(() => future_1.fromCallback(cb => r.session.destroy(cb)));
    return response_1.redirect('/', 302);
});
/**
 * createJob
 *
 * Operates simllar to createEmployer except we are creating a job.
 * This handler is meant to be used by the dashboard's client side application.
 * The responses are in JSON.
 */
exports.createJob = (r) => monad_1.doN(function* () {
    let eResult = yield control_1.await(() => job_1.check(r.body));
    if (eResult.isRight()) {
        let data = eResult.takeRight();
        let db = yield getMain();
        let collection = db.collection('jobs');
        data.employer = r.session.user;
        yield control_1.await(() => collection_1.insertOne(collection, data));
        return response_1.created({ id: data.id });
    }
    else {
        return response_1.conflict(eResult.takeLeft().explain());
    }
});
/**
 * showProfile
 *
 * gets and id, then gets the jobs collection from the
 * database. Then searches through the jobs collection for
 * a job where the job's id is the same as the previously collected id
 * and displays the information related to that job.
 */
exports.showProfile = (r) => monad_1.doN(function* () {
    let id = r.params.id;
    let db = yield getMain();
    let collection = db.collection('jobs');
    let mResult = yield control_1.await(() => collection_1.findOne(collection, { id: id }));
    if (mResult.isNothing())
        return response_1.show('errors/not-found.html', {}, 404);
    else
        return response_1.show('jobs/profile.html', { job: mResult.get() });
});
/**
 * showJobs
 *
 * shows the recent 30 posts from the database to visitors of the site.
 */
exports.showJobs = (_) => monad_1.doN(function* () {
    let db = yield getMain();
    let collection = db.collection('jobs');
    let mResult = yield control_1.await(() => collection_1.find(collection, {}, { sort: { created_at: -1 }, limit: 30 }));
    let jobs = mResult.isNothing() ? [] : mResult.get();
    return response_1.show('jobs/index.html', { jobs: jobs });
});
//retrieves the main connection from the tendril pool.
const getMain = () => pool_1.checkout('main');
//# sourceMappingURL=handlers.js.map