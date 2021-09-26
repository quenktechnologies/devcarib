"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.template = exports.AdminController = exports.AdminModel = void 0;
const dotR = require("./r");
//@ts-ignore: 6133
const module_1 = require("@quenk/tendril/lib/app/module");
const moment = require("moment");
const bcrypt = require("bcryptjs");
const future_1 = require("@quenk/noni/lib/control/monad/future");
const api_1 = require("@quenk/tendril/lib/app/api");
const pool_1 = require("@quenk/tendril/lib/app/api/pool");
const control_1 = require("@quenk/tendril/lib/app/api/control");
const response_1 = require("@quenk/tendril/lib/app/api/response");
const csrf_token_1 = require("@quenk/tendril/lib/app/boot/stage/csrf-token");
const dback_model_mongodb_1 = require("@quenk/dback-model-mongodb");
const tendril_show_wml_1 = require("@quenk/tendril-show-wml");
const login_1 = require("@board/validators/lib/login");
const admin_1 = require("@board/views/lib/admin");
const login_2 = require("@board/views/lib/admin/login");
const ROUTE_INDEX = '/admin';
const ROUTE_LOGIN = '/admin/login';
const KEY_LOGIN_VIEW_CTX = 'loginCtx';
const ERR_AUTH_FAILED = 'Email or password is invalid!';
const ERR_AUTH_INVALID = 'Correct the below error(s) before continuing.';
const messages = {
    minLength: '{$key} must be {target} or more characters!',
    maxLength: '{$key} must be less than {target} characters!',
    notNull: '{$key} is required!'
};
/**
 * AdminModel
 */
class AdminModel extends dback_model_mongodb_1.BaseModel {
    constructor() {
        super(...arguments);
        this.id = 'id';
    }
    static getInstance(db) {
        return new AdminModel(db, db.collection('admins'));
    }
}
exports.AdminModel = AdminModel;
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
        this.showIndex = (r) => {
            return api_1.doAction(function* () {
                let muser = r.session.get('admin');
                if (muser.isJust()) {
                    return tendril_show_wml_1.render(new admin_1.IndexView({
                        title: 'Caribbean Developers Job Board - Admin',
                        styles: ['/assets/css/board-admin.css']
                    }));
                }
                else {
                    return response_1.redirect(ROUTE_LOGIN, 301);
                }
            });
        };
    }
    /**
     * showLoginForm renders the page with the login form.
     */
    showLoginForm(r) {
        return api_1.doAction(function* () {
            // Type is used here until wml optional properties are sorted out.
            let ctx = r.session.getOrElse(KEY_LOGIN_VIEW_CTX, {});
            ctx.title = 'Caribbean Developers Job Board - Admin Login';
            ctx.styles = [];
            return tendril_show_wml_1.render(new login_2.LoginView({
                title: 'Caribbean Developers Job Board - Admin Login',
                styles: [],
                csrfToken: r.prs.getOrElse(csrf_token_1.PRS_CSRF_TOKEN, '')
            }));
        });
    }
    /**
     * authenticate the admin user.
     */
    authenticate(req) {
        return api_1.doAction(function* () {
            let elogin = login_1.validate(req.body);
            if (elogin.isLeft())
                return showAuthError(req, {
                    message: ERR_AUTH_INVALID,
                    errors: elogin.takeLeft().explain(messages)
                });
            let { email, password } = elogin.takeRight();
            let db = yield pool_1.checkout('main');
            let model = AdminModel.getInstance(db);
            let [admin] = yield control_1.fork(model.search({ email }));
            if (admin == null)
                return showAuthError(req, authFailedErr(email));
            let matches = yield control_1.fork(comparePasswords(password, admin.password));
            if (!matches)
                return showAuthError(req, authFailedErr(email));
            let change = { last_login: today() };
            yield control_1.fork(model.update(admin.id, change));
            req.session.set('admin', { id: admin.id });
            return response_1.redirect(ROUTE_INDEX, 302);
        });
    }
    /**
     * logout the admin user.
     */
    logout(r) {
        return api_1.doAction(function* () {
            yield control_1.fork(r.session.destroy());
            return response_1.redirect(ROUTE_LOGIN, 302);
        });
    }
}
exports.AdminController = AdminController;
const authFailedErr = (email) => ({
    email,
    errors: { message: ERR_AUTH_FAILED }
});
const showAuthError = (r, ctx) => api_1.doAction(function* () {
    r.session.setWithDescriptor(KEY_LOGIN_VIEW_CTX, ctx, { ttl: 1 });
    return response_1.redirect(ROUTE_LOGIN, 303);
});
const comparePasswords = (pwd1, pwd2) => future_1.fromCallback(cb => bcrypt.compare(pwd1, pwd2, cb));
const today = () => moment.utc().toDate();
//@ts-ignore: 6133
const template = ($app) => ({ 'id': `admin`, 'app': { 'dirs': { 'self': `/apps/mia/build/app` },
        'modules': { 'r': dotR.template }, 'routes': //@ts-ignore: 6133
        ($module) => {
            let $routes = [];
            let adminCtl = new AdminController();
            $routes.push({
                method: 'get',
                path: '/',
                filters: [adminCtl.showIndex.bind(adminCtl)]
            });
            $routes.push({
                method: 'get',
                path: '/login',
                filters: [adminCtl.showLoginForm.bind(adminCtl)]
            });
            $routes.push({
                method: 'post',
                path: '/login',
                filters: [adminCtl.authenticate.bind(adminCtl)]
            });
            $routes.push({
                method: 'post',
                path: '/logout',
                filters: [adminCtl.logout.bind(adminCtl)]
            });
            return $routes;
        } },
    'create': 
    //@ts-ignore: 6133 
    (s) => new module_1.Module(s) });
exports.template = template;
//# sourceMappingURL=index.js.map