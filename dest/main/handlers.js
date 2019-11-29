"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs = require("bcryptjs");
const collection_1 = require("@quenk/safe-mongodb/lib/database/collection");
const response_1 = require("@quenk/tendril/lib/app/api/action/response");
const control_1 = require("@quenk/tendril/lib/app/api/action/control");
const pool_1 = require("@quenk/tendril/lib/app/api/action/pool");
const monad_1 = require("@quenk/noni/lib/control/monad");
const employer_1 = require("@board/checks/lib/employer");
const job_1 = require("@board/checks/lib/job");
const record_1 = require("@quenk/noni/lib/data/record");
const future_1 = require("@quenk/noni/lib/control/monad/future");
/**
 * showIndex of the site.
 */
exports.showIndex = (r) => {
    let req = r;
    console.error(req.session);
    if (req.session.user == null) {
        return response_1.redirect('/login', 302);
    }
    else {
        return response_1.redirect('/dashboard', 302);
    }
};
/**
 * showRegistrationForm displays the employer regisration form.
 */
exports.showRegistrationForm = (_) => response_1.show('employer/registration/form.html', {});
exports.showDashboard = (_) => response_1.show('dashboard.html', {});
/**
 * showLoginForm displays the user login form.
 */
exports.showLoginForm = (_) => response_1.show('login.html', {});
/**
 *   createEmployer creates the employer after registration.
*/
exports.createEmployer = (r) => monad_1.doN(function* () {
    let eResult = yield control_1.await(() => employer_1.check(r.body));
    if (eResult.isRight()) {
        let data = eResult.takeRight();
        let db = yield pool_1.checkout('main');
        let collection = db.collection('users');
        yield control_1.await(() => collection_1.insertOne(collection, data));
        return response_1.redirect('/login', 302);
    }
    else {
        console.log(eResult.takeLeft().explain());
        return response_1.redirect('/', 302);
    }
});
exports.authenticate = (r) => monad_1.doN(function* () {
    if (record_1.isRecord(r.body)) {
        let email = r.body.email;
        let password = r.body.password;
        let db = yield pool_1.checkout('main');
        let users = db.collection('users');
        let qry = { email };
        let mUser = yield control_1.await(() => collection_1.findOne(users, qry));
        if (mUser.isNothing())
            return response_1.redirect('/login', 302);
        let user = mUser.get();
        let didMatch = yield control_1.await(() => compare(password, user.password));
        if (didMatch) {
            r.session.user = user.id;
            return response_1.redirect('/dashboard', 302);
        }
        else {
            return response_1.redirect('/login', 302);
        }
    }
    else {
        return response_1.redirect('/login', 302);
    }
});
const compare = (pwd, hash) => future_1.fromCallback(cb => bcryptjs.compare(pwd, hash, cb));
/**
 * logout the user from the system.
 *
 * Clears the session property.
 */
exports.logout = (r) => {
    r.session = {};
    return response_1.redirect('/', 302);
};
exports.createJob = (r) => monad_1.doN(function* () {
    let eResult = yield control_1.await(() => job_1.check(r.body));
    if (eResult.isRight()) {
        let data = eResult.takeRight();
        let db = yield pool_1.checkout('main');
        let collection = db.collection('jobs');
        data.employer = r.session.user;
        yield control_1.await(() => collection_1.insertOne(collection, data));
        return response_1.created();
    }
    else {
        return response_1.conflict(eResult.takeLeft().explain());
    }
});
//# sourceMappingURL=handlers.js.map