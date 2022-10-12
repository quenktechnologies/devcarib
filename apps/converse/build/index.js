"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.template = exports.ensureAuthXHR = exports.invites = exports.auth = exports.ConverseAuthController = void 0;
const dotR = require("./r");
//@ts-ignore: 6133
const module_1 = require("@quenk/tendril/lib/app/module");
const future_1 = require("@quenk/noni/lib/control/monad/future");
const record_1 = require("@quenk/noni/lib/data/record");
const maybe_1 = require("@quenk/noni/lib/data/maybe");
const csrf_token_1 = require("@quenk/tendril/lib/app/boot/stage/csrf-token");
const controller_1 = require("@quenk/server/lib/app/auth/controller");
const authenticator_1 = require("@quenk/server/lib/app/auth/authenticator");
const login_1 = require("@converse/validators/lib/login");
const user_1 = require("@converse/models/lib/user");
const db_1 = require("@devcarib/server/lib/db");
const password_1 = require("@devcarib/server/lib/data/password");
const datetime_1 = require("@devcarib/common/lib/data/datetime");
const views_1 = require("./views");
const user_2 = require("./views/user");
const login_2 = require("./views/login");
const invites_1 = require("./invites");
class ConverseAuthenticator extends authenticator_1.BaseAuthenticator {
    constructor() {
        super(...arguments);
        this.validate = login_1.validate;
    }
    getUser(creds) {
        return (0, future_1.doFuture)(function* () {
            let { email, password } = creds;
            let db = yield (0, db_1.unsafeGetConnection)();
            let model = user_1.UserModel.getInstance(db);
            let [user] = yield model.search({
                $or: [{ email }, { username: email }]
            });
            if (user == null)
                return (0, future_1.pure)((0, maybe_1.nothing)());
            let matches = yield (0, password_1.compare)(password, user.password);
            if (!matches)
                return (0, future_1.pure)((0, maybe_1.nothing)());
            let change = { last_login: (0, datetime_1.now)() };
            yield model.update(user.id, change);
            return (0, future_1.pure)((0, maybe_1.just)({ id: user.id, username: user.username }));
        });
    }
}
/**
 * ConverseAuthController serves the endpoints for converse authentication.
 */
class ConverseAuthController extends controller_1.AuthController {
    constructor() {
        super(...arguments);
        this.views = {
            index: () => new user_2.UserView(),
            form: (req, ctx) => new login_2.LoginView({
                title: 'Caribbean Developers Job Board - Admin Login',
                styles: [],
                auth: (0, record_1.merge)(ctx, {
                    message: 'Email or password invalid.'
                }),
                csrfToken: req.prs.getOrElse(csrf_token_1.PRS_CSRF_TOKEN, '')
            })
        };
        this.authenticator = new ConverseAuthenticator();
    }
    userNotDetected(req) {
        //TODO: We should not need to specify all these properties here.
        //Only csrfToken should be required.
        return this.show(new views_1.IndexView({
            auth: {
                failed: false,
                message: ''
            },
            csrfToken: req.prs.getOrElse(csrf_token_1.PRS_CSRF_TOKEN, '')
        }));
    }
}
exports.ConverseAuthController = ConverseAuthController;
exports.auth = new ConverseAuthController();
exports.invites = new invites_1.InviteController();
exports.ensureAuthXHR = exports.auth.ensureAuthXHR;
//@ts-ignore: 6133
const template = ($app) => ({ 'id': `converse`,
    'app': { 'dirs': { 'self': `/apps/converse/build`,
            'public': [`../public`, `../frontend/public`] },
        'path': `/`,
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
            $routes.push({
                method: 'get',
                path: '/invites/:id',
                filters: [exports.invites.onForm.bind(exports.invites)], tags: {}
            });
            $routes.push({
                method: 'post',
                path: '/invites/:id',
                filters: [exports.invites.onRegister.bind(exports.invites)], tags: {}
            });
            $routes.push({
                method: 'get',
                path: '/register/success',
                filters: [exports.invites.onSuccess.bind(exports.invites)], tags: {}
            });
            return $routes;
        } },
    'create': 
    //@ts-ignore: 6133 
    (s) => new module_1.Module(s) });
exports.template = template;
//# sourceMappingURL=index.js.map