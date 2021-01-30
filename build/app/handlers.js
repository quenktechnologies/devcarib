"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showPostJobPage = exports.showPosts = exports.showPost = exports.createPost = exports.logout = exports.login = exports.showLoginForm = exports.showIndex = exports.ERROR_AUTH_FAILED = void 0;
const bcryptjs = require("bcryptjs");
const collection_1 = require("@quenk/noni-mongodb/lib/database/collection");
const response_1 = require("@quenk/tendril/lib/app/api/response");
const control_1 = require("@quenk/tendril/lib/app/api/control");
const pool_1 = require("@quenk/tendril/lib/app/api/pool");
const api_1 = require("@quenk/tendril/lib/app/api");
const record_1 = require("@quenk/noni/lib/data/record");
const future_1 = require("@quenk/noni/lib/control/monad/future");
const candidate_post_1 = require("@board/checks/lib/candidate-post");
exports.ERROR_AUTH_FAILED = 'Invalid Email or password! Try again.';
/**
 * showIndex of the site.
 *
 * For now this will redirect to the dashboard if the user is logged in
 * or to the login form if they are not.
 *
 * In a future iteration this will display recent job postings.
 */
exports.showIndex = (r) => response_1.redirect(r.session.exists('user') ? '/dashboard' : '/login', 302);
/**
 * showLoginForm displays the user login form.
 */
exports.showLoginForm = (r) => response_1.show('login.html', { error: r.session.getOrElse('error', '') });
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
exports.login = (r) => api_1.doAction(function* () {
    if (record_1.isRecord(r.body)) {
        let email = r.body.email;
        let password = r.body.password;
        let db = yield getMain();
        let users = db.collection('users');
        let qry = { email: email };
        let mUser = yield control_1.fork(collection_1.findOne(users, qry));
        if (mUser.isNothing()) {
            r.session.set('error', exports.ERROR_AUTH_FAILED);
            return response_1.redirect('/login', 303);
        }
        let user = mUser.get();
        let didMatch = yield control_1.fork(compare(password, user.password));
        if (didMatch) {
            //regenerate the session to start a fresh.
            yield control_1.fork(r.session.regenerate());
            r.session.set('user', user.id);
            return response_1.redirect('/dashboard', 303);
        }
        else {
            r.session.set('error', exports.ERROR_AUTH_FAILED);
            return response_1.redirect('/login', 303);
        }
    }
    else {
        r.session.set('error', exports.ERROR_AUTH_FAILED);
        return response_1.redirect('/login', 302);
    }
});
const compare = (pwd, hash) => future_1.fromCallback(cb => bcryptjs.compare(pwd, hash, cb));
/**
 * logout the user from the application.
 *
 * This basically destroys the session so we no longer know who the user is.
 */
exports.logout = (r) => api_1.doAction(function* () {
    if (r.session != null)
        yield control_1.fork(r.session.destroy());
    return response_1.redirect('/', 302);
});
/**
 * createPost saves the submitted post data in the database for approval later.
 */
exports.createPost = (r) => api_1.doAction(function* () {
    let eResult = yield control_1.fork(candidate_post_1.check(r.body));
    if (eResult.isRight()) {
        let data = eResult.takeRight();
        let db = yield getMain();
        let collection = db.collection('posts');
        data.approved = false;
        data.created_on = new Date();
        yield control_1.fork(collection_1.insertOne(collection, data));
        return response_1.created({ id: data.id });
    }
    else {
        return response_1.conflict({ errors: eResult.takeLeft().explain() });
    }
});
/**
 * showPost displays a page for a single approved post.
 */
exports.showPost = (r) => api_1.doAction(function* () {
    let id = Number(r.params.id); //XXX: this could be done with a check.
    let db = yield getMain();
    let collection = db.collection('posts');
    let qry = { id, approved: true };
    let mResult = yield control_1.fork(collection_1.findOne(collection, qry));
    if (mResult.isNothing())
        return response_1.show('errors/not-found.html', {}, 404);
    else
        return response_1.show('post.html', { post: mResult.get() });
});
/**
 * showPosts currently approved.
 *
 * This only shows the most recent 50 posts. In future we will refactor if
 * needed to show more.
 */
exports.showPosts = (_) => api_1.doAction(function* () {
    let db = yield getMain();
    let collection = db.collection('posts');
    let qry = { approved: true };
    let posts = yield control_1.fork(collection_1.find(collection, qry, { sort: { created_at: -1 }, limit: 50 }));
    return response_1.show('index.html', { posts });
});
/**
 * showPostJobPage displays the form for creating new posts on a new
 * page.
 */
exports.showPostJobPage = (_) => api_1.doAction(function* () {
    return response_1.show('post-form.html', {});
});
//retrieves the main connection from the tendril pool.
const getMain = () => pool_1.checkout('main');
//# sourceMappingURL=handlers.js.map