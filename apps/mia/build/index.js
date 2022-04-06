"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.template = exports.auth = exports.MiaAuthController = void 0;
const dotR = require("./r");
//@ts-ignore: 6133
const module_1 = require("@quenk/tendril/lib/app/module");
const future_1 = require("@quenk/noni/lib/control/monad/future");
const maybe_1 = require("@quenk/noni/lib/data/maybe");
const record_1 = require("@quenk/noni/lib/data/record");
const csrf_token_1 = require("@quenk/tendril/lib/app/boot/stage/csrf-token");
const login_1 = require("@mia/validators/lib/login");
const admin_1 = require("@mia/models/lib/admin");
const mia_1 = require("@devcarib/views/lib/mia");
const login_2 = require("@devcarib/views/lib/mia/login");
const auth_1 = require("@devcarib/server/lib/controllers/auth");
const auth_2 = require("@devcarib/server/lib/auth");
const db_1 = require("@devcarib/server/lib/db");
const password_1 = require("@devcarib/server/lib/data/password");
const datetime_1 = require("@devcarib/common/lib/data/datetime");
const ROUTE_INDEX = '/mia';
const ROUTE_LOGIN = '/mia/login';
const TITLE = 'Mia';
class MiaAuthenticator extends auth_2.BaseAuthenticator {
    constructor() {
        super(...arguments);
        this.validate = login_1.validate;
    }
    getUser(creds) {
        return (0, future_1.doFuture)(function* () {
            let { email, password } = creds;
            let db = yield (0, db_1.unsafeGetConnection)();
            let model = admin_1.AdminModel.getInstance(db);
            let [admin] = yield model.search({ email });
            if (admin == null)
                return (0, future_1.pure)((0, maybe_1.nothing)());
            let matches = yield (0, password_1.compare)(password, admin.password);
            if (!matches)
                return (0, future_1.pure)((0, maybe_1.nothing)());
            let change = { last_login: (0, datetime_1.now)() };
            yield model.update(admin.id, change);
            return (0, future_1.pure)((0, maybe_1.just)({ id: admin.id }));
        });
    }
}
/**
 * MiaAuthController serves the endpoints for mia authentication.
 */
class MiaAuthController extends auth_1.AuthController {
    constructor() {
        super(...arguments);
        this.views = {
            index: () => new mia_1.IndexView({ title: TITLE }),
            auth: (req, ctx) => new login_2.LoginView({
                title: 'Caribbean Developers Job Board - Admin Login',
                styles: [],
                auth: (0, record_1.merge)(ctx, {
                    message: 'Email or password invalid.'
                }),
                csrfToken: req.prs.getOrElse(csrf_token_1.PRS_CSRF_TOKEN, '')
            })
        };
        this.urls = {
            index: ROUTE_INDEX,
            auth: ROUTE_LOGIN
        };
        this.authenticator = new MiaAuthenticator();
        this.userSessionKey = 'admin';
    }
}
exports.MiaAuthController = MiaAuthController;
exports.auth = new MiaAuthController();
//@ts-ignore: 6133
const template = ($app) => ({ 'id': `mia`,
    'app': { 'dirs': { 'self': `/apps/mia/build`,
            'public': [`../public`, `../frontend/public`, `../packages/mia-views/public`] },
        'modules': { 'r': dotR.template },
        'routes': //@ts-ignore: 6133
        ($module) => {
            let $routes = [];
            $routes.push({
                method: 'get',
                path: '/',
                filters: [exports.auth.onIndex.bind(exports.auth)], tags: {}
            });
            $routes.push({
                method: 'get',
                path: '/login',
                filters: [exports.auth.onAuthForm.bind(exports.auth)], tags: {}
            });
            $routes.push({
                method: 'post',
                path: '/login',
                filters: [exports.auth.onAuthenticate.bind(exports.auth)], tags: {}
            });
            $routes.push({
                method: 'post',
                path: '/logout',
                filters: [exports.auth.onLogout.bind(exports.auth)], tags: {}
            });
            return $routes;
        } },
    'create': 
    //@ts-ignore: 6133 
    (s) => new module_1.Module(s) });
exports.template = template;
//# sourceMappingURL=index.js.map