"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const api_1 = require("@quenk/tendril/lib/app/api");
const control_1 = require("@quenk/tendril/lib/app/api/control");
const response_1 = require("@quenk/tendril/lib/app/api/response");
const tendril_show_wml_1 = require("@quenk/tendril-show-wml");
/**
 * AuthController provides a workflow for authenticating a user. It is designed
 * with the intention of serving an Single Page Application (SPA) but can be
 * used to authenticate a regular website as well.
 *
 * The actual details of determing whether an authentication request should be
 * honoured or not are left up to the provided authenticator.
 */
class AuthController {
    constructor() {
        /**
         * userSessionKey is the session value to store the user data in.
         */
        this.userSessionKey = 'user';
        /**
         * authContextKey is the session key used to store metadata between a failed
         * auth attempt and the login form.
         */
        this.authContextKey = 'auth';
        /**
         * checkAuth produces a filter that can be included in a route to ensure
         * the user is authenticated before proceeding.
         *
         * @param isXHR - If true, responds with a status code only on failure,
         *                redirects to the auth form otherwise.
         */
        this.checkAuth = (isXHR = false) => (req) => {
            if (req.session.exists(this.userSessionKey))
                return (0, control_1.next)(req);
            return isXHR ? (0, response_1.unauthorized)() : (0, response_1.redirect)(this.urls.auth, 302);
        };
    }
    /**
     * onIndex displays the index page of the application if the user is properly
     * authenticated.
     *
     * If not, the user will be redirected to the login page.
     */
    onIndex(req) {
        let that = this;
        return (0, api_1.doAction)(function* () {
            let muser = req.session.get(that.userSessionKey);
            if (muser.isJust()) {
                return (0, tendril_show_wml_1.render)(that.views.index(req));
            }
            else {
                return (0, response_1.redirect)(that.urls.auth, 302);
            }
        });
    }
    /**
     * onAuthForm renders the login form.
     */
    onAuthForm(req) {
        let ctx = req.session.getOrElse(this.authContextKey, { failed: false, credentials: {} });
        return (0, tendril_show_wml_1.render)(this.views.auth(req, ctx));
    }
    /**
     * onAuthenticate handles the authentication request sent by the user.
     */
    onAuthenticate(req) {
        let that = this;
        return (0, api_1.doAction)(function* () {
            let euser = yield (0, control_1.fork)(that.authenticator.authenticate(req));
            if (euser.isLeft()) {
                req.session.setWithDescriptor(that.authContextKey, euser.takeLeft(), { ttl: 1 });
                return (0, response_1.redirect)(that.urls.auth, 303);
            }
            req.session.set(that.userSessionKey, euser.takeRight());
            return (0, response_1.redirect)(that.urls.index, 302);
        });
    }
    /**
     * onLogout destroys the user's authenticated session.
     */
    onLogout(req) {
        let that = this;
        return (0, api_1.doAction)(function* () {
            yield (0, control_1.fork)(req.session.destroy());
            return (0, response_1.redirect)(that.urls.auth, 302);
        });
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.js.map