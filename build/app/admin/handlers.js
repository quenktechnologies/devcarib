"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsCtl = exports.adminCtl = exports.AdminController = exports.PostsController = exports.UserModel = exports.PostModel = void 0;
const moment = require("moment");
const bcrypt = require("bcryptjs");
const prs = require("@quenk/tendril/lib/app/api/storage/prs");
const session = require("@quenk/tendril/lib/app/api/storage/session");
const type_1 = require("@quenk/noni/lib/data/type");
const regex_1 = require("@quenk/noni/lib/data/string/regex");
const api_1 = require("@quenk/tendril/lib/app/api");
const pool_1 = require("@quenk/tendril/lib/app/api/pool");
const control_1 = require("@quenk/tendril/lib/app/api/control");
const response_1 = require("@quenk/tendril/lib/app/api/response");
const dback_resource_mongodb_1 = require("@quenk/dback-resource-mongodb");
const dback_model_mongodb_1 = require("@quenk/dback-model-mongodb");
const post_1 = require("@board/checks/lib/post");
const future_1 = require("@quenk/noni/lib/control/monad/future");
const templates = {};
/**
 * PostModel
 */
class PostModel extends dback_model_mongodb_1.BaseModel {
    constructor() {
        super(...arguments);
        this.id = 'id';
    }
    static getInstance(db) {
        return new PostModel(db, db.collection('posts'));
    }
}
exports.PostModel = PostModel;
/**
 * UserModel
 */
class UserModel extends dback_model_mongodb_1.BaseModel {
    constructor() {
        super(...arguments);
        this.id = 'id';
    }
    static getInstance(db) {
        return new UserModel(db, db.collection('admins'));
    }
}
exports.UserModel = UserModel;
/**
 * PostsController provides the handlers for the /admin/r/posts routes.
 */
class PostsController extends dback_resource_mongodb_1.BaseResource {
    constructor() {
        super(...arguments);
        /**
         * runSearch executes a search using the "q" query variable
         * as an argument for
         */
        this.runSearch = (r) => {
            let that = this;
            return api_1.doAction(function* () {
                let qry = {};
                if (type_1.isString(r.query.q)) {
                    let filter = { $regex: regex_1.escape(r.query.q), $options: 'i' };
                    qry = { $or: [{ title: filter }, { company: filter }] };
                }
                yield prs.set("resource.mongodb.search.query" /* query */, qry);
                return that.search(r);
            });
        };
        /**
         * runUpdate valdiates and applies an update to a Post.
         */
        this.runUpdate = (r) => {
            let that = this;
            return api_1.doAction(function* () {
                let eBody = yield control_1.fork(post_1.adminCheckPatch(r.body));
                if (eBody.isLeft()) {
                    let errors = eBody.takeLeft().explain(templates);
                    return response_1.conflict({ errors });
                }
                r.body = eBody.takeRight();
                return that.update(r);
            });
        };
    }
    getModel() {
        return api_1.doAction(function* () {
            let db = yield pool_1.checkout('main');
            return control_1.value(PostModel.getInstance(db));
        });
    }
}
exports.PostsController = PostsController;
/**
 * AdminController serves the UI for the admin section.
 *
 * All the routes here should only be accessible to authenticated admin level
 * users!
 */
class AdminController {
    constructor() {
        /**
         * showIndex displays the admin app page to the user.
         *
         * Note: This is not a JSON endpoint!
         */
        this.showIndex = (_) => {
            return api_1.doAction(function* () {
                let muser = yield session.get('user');
                if (muser.isJust()) {
                    return response_1.show('admin.html');
                }
                else {
                    return response_1.redirect('/admin/login', 301);
                }
            });
        };
    }
    /**
     * showLoginForm renders the page with the login form.
     */
    showLoginForm(_) {
        // TODO: Show messages stored in flash
        return response_1.show('login.html', {});
    }
    /**
     * authenticate the admin user.
     */
    authenticate(req) {
        let { username, password } = req.body;
        return api_1.doAction(function* () {
            let db = yield pool_1.checkout('main');
            let model = UserModel.getInstance(db);
            let musers = yield control_1.fork(model.search({ username }));
            if (musers.isNothing())
                return showAuthError(username);
            let user = musers.get()[0];
            let matches = yield control_1.fork(comparePasswords(password, user.password));
            if (!matches)
                return showAuthError(username);
            let change = { last_login: today() };
            yield control_1.fork(model.update(user.id, change));
            yield session.set('user', { id: user.id });
            return response_1.redirect('/admin', 302);
        });
    }
    /**
     * logout the admin user.
     */
    logout(_) {
        return api_1.doAction(function* () {
            yield session.destroy();
            return response_1.redirect('/admin/login', 303);
        });
    }
}
exports.AdminController = AdminController;
const showAuthError = (_username) => api_1.doAction(function* () {
    // TODO: This function awaits flash support in tendril.
    return response_1.redirect('/admin/login', 303);
});
const comparePasswords = (pwd1, pwd2) => future_1.fromCallback(cb => bcrypt.compare(pwd1, pwd2, cb));
const today = () => moment.utc().toDate();
exports.adminCtl = new AdminController();
exports.postsCtl = new PostsController();
//# sourceMappingURL=handlers.js.map