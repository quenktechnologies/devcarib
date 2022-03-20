"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.template = exports.WebController = void 0;
//@ts-ignore: 6133
const module_1 = require("@quenk/tendril/lib/app/module");
const moment = require("moment");
const bcrypt = require("bcryptjs");
const future_1 = require("@quenk/noni/lib/control/monad/future");
const api_1 = require("@quenk/tendril/lib/app/api");
const pool_1 = require("@quenk/tendril/lib/app/api/pool");
const control_1 = require("@quenk/tendril/lib/app/api/control");
const response_1 = require("@quenk/tendril/lib/app/api/response");
const tendril_show_wml_1 = require("@quenk/tendril-show-wml");
const csrf_token_1 = require("@quenk/tendril/lib/app/boot/stage/csrf-token");
const login_1 = require("@converse/validators/lib/login");
const login_2 = require("@converse/views/lib/login");
const views_1 = require("@converse/views");
const user_1 = require("@converse/models/lib/user");
const record_1 = require("@quenk/noni/lib/data/record");
const ROUTE_INDEX = '/';
const ROUTE_LOGIN = '/converse/login';
const KEY_LOGIN_VIEW_CTX = 'loginCtx';
const ERR_AUTH_FAILED = 'Email or password is incorrect.';
const messages = {
    minLength: '{$key} must be {target} or more characters!',
    maxLength: '{$key} must be less than {target} characters!',
    notNull: '{$key} is required!'
};
/**
 * WebController serves the UI for web requests.
 */
class WebController {
    /**
     * onIndex renders the index page to the user.
     *
     * If a user session cannot be detected, the user is redirected to the
     * login page.
     */
    onIndex(r) {
        return (0, api_1.doAction)(function* () {
            let muser = r.session.get('user');
            if (muser.isJust()) {
                return (0, tendril_show_wml_1.render)(new views_1.IndexView({}));
            }
            else {
                return (0, response_1.redirect)(ROUTE_LOGIN, 301);
            }
        });
    }
    /**
     * onLoginForm renders the login page.
     */
    onLoginForm(r) {
        return (0, api_1.doAction)(function* () {
            let ctx = r.session.getOrElse(KEY_LOGIN_VIEW_CTX, {});
            return (0, tendril_show_wml_1.render)(new login_2.LoginView((0, record_1.merge)(ctx, {
                csrfToken: r.prs.getOrElse(csrf_token_1.PRS_CSRF_TOKEN, '')
            })));
        });
    }
    /**
     * onLoginFormSubmit handles the authentication atempt.
     */
    onLoginFormSubmit(req) {
        return (0, api_1.doAction)(function* () {
            let elogin = (0, login_1.validate)(req.body);
            if (elogin.isLeft())
                return showAuthError(req, {
                    message: ERR_AUTH_FAILED,
                    errors: elogin.takeLeft().explain(messages)
                });
            let { email, password } = elogin.takeRight();
            let db = yield (0, pool_1.checkout)('main');
            let model = user_1.UserModel.getInstance(db);
            let [user] = yield (0, control_1.fork)(model.search({ email }));
            if (user == null)
                return showAuthError(req, authFailedErr(email));
            let matches = yield (0, control_1.fork)(comparePasswords(password, user.password));
            if (!matches)
                return showAuthError(req, authFailedErr(email));
            let change = { last_login: today() };
            yield (0, control_1.fork)(model.update(user.id, change));
            req.session.set('user', { id: user.id });
            return (0, response_1.redirect)(ROUTE_INDEX, 302);
        });
    }
    /**
     * onLogout is called when the user logs out.
     */
    onLogout(r) {
        return (0, api_1.doAction)(function* () {
            yield (0, control_1.fork)(r.session.destroy());
            return (0, response_1.redirect)(ROUTE_LOGIN, 302);
        });
    }
}
exports.WebController = WebController;
const authFailedErr = (email) => ({
    email,
    errors: { message: ERR_AUTH_FAILED }
});
const showAuthError = (r, ctx) => (0, api_1.doAction)(function* () {
    r.session.setWithDescriptor(KEY_LOGIN_VIEW_CTX, ctx, { ttl: 1 });
    return (0, response_1.redirect)(ROUTE_LOGIN, 303);
});
const comparePasswords = (pwd1, pwd2) => (0, future_1.fromCallback)(cb => bcrypt.compare(pwd1, pwd2, cb));
const today = () => moment.utc().toDate();
//@ts-ignore: 6133
const template = ($app) => ({ 'id': `converse`,
    'app': { 'dirs': { 'self': `/apps/converse/build` },
        'routes': //@ts-ignore: 6133
        ($module) => {
            let $routes = [];
            let userCtrl = new WebController();
            $routes.push({
                method: 'get',
                path: '/',
                filters: [userCtrl.onIndex.bind(userCtrl)], tags: {}
            });
            $routes.push({
                method: 'get',
                path: '/login',
                filters: [userCtrl.onLoginForm.bind(userCtrl)], tags: {}
            });
            $routes.push({
                method: 'post',
                path: '/login',
                filters: [userCtrl.onLoginFormSubmit.bind(userCtrl)], tags: {}
            });
            $routes.push({
                method: 'post',
                path: '/logout',
                filters: [userCtrl.onLogout.bind(userCtrl)], tags: {}
            });
            return $routes;
        } },
    'create': 
    //@ts-ignore: 6133 
    (s) => new module_1.Module(s) });
exports.template = template;
//# sourceMappingURL=index.js.map