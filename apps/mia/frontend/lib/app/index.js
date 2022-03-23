"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mia = void 0;
const function_1 = require("@quenk/noni/lib/data/function");
const future_1 = require("@quenk/noni/lib/control/monad/future");
const display_1 = require("@quenk/jouvert/lib/app/service/display");
const factory_1 = require("@quenk/jouvert/lib/app/remote/model/factory");
const director_1 = require("@quenk/jouvert/lib/app/service/director");
const remote_1 = require("@quenk/jouvert/lib/app/remote");
const jouvert_1 = require("@quenk/jouvert");
const hash_1 = require("@quenk/frontend-routers/lib/hash");
const browser_1 = require("@quenk/jhr/lib/browser");
const app_1 = require("./views/app");
const routes_1 = require("./routes");
const REMOTE_BACKGROUD = 'remote.background';
const agent = (0, browser_1.createAgent)();
/**
 * Mia is the main class for the admin application.
 *
 * @param appNode    - The DOM node for the base application content (layout).
 * @param dialogNode - The DOM node that will be used for dialogs.
 */
class Mia extends jouvert_1.Jouvert {
    constructor(appNode, dialogNode) {
        super({ log: { level: 1000, logger: console } });
        this.appNode = appNode;
        this.dialogNode = dialogNode;
        /**
         * view is the WML content to display on the screen.
         */
        this.view = new app_1.MiaView(this);
        /**
         * router for various application views.
         */
        this.router = new hash_1.HashRouter(window, {});
        /**
         * services map used to look up service actors.
         */
        this.services = {};
        /**
         * values contains various bits of information used to generate
         * the view.
         */
        this.values = {
            header: {
                /**
                 * links for the main navigation area.
                 */
                links: {
                    'Jobs': '#/jobs',
                    'Users': '#/users'
                },
                logout: () => this.runFuture(this.logout())
            },
        };
        this.onError = (e) => {
            console.error(e);
            alert('An error has occurred! Details have been logged to the console.');
        };
    }
    get models() {
        return factory_1.RemoteModelFactory
            .getInstance(this, this.services[REMOTE_BACKGROUD]);
    }
    static create(appNode, dialogNode) {
        return new Mia(appNode, dialogNode);
    }
    /**
     * getModel provides a RemoteModel instance for the specified path.
     */
    getModel(path, handler) {
        return this.models.create(path, handler);
    }
    /**
     * logout the user from the application.
     */
    logout() {
        return confirm('Do you want to logout now?') ?
            agent
                .post('/mia/logout', {})
                .chain(() => {
                window.location.href = '/admin';
                return (0, future_1.pure)(undefined);
            }) :
            (0, future_1.pure)(undefined);
    }
    /**
     * runFuture is used to execute async work wrapped in the Future type.
     */
    runFuture(ft) {
        ft.fork(this.onError, function_1.noop);
    }
    /**
     * Any actor spawned by the app directly's address is stored in the services
     * map.
     */
    spawn(t) {
        let addr = super.spawn(t);
        this.services[t.id] = addr;
        return addr;
    }
    /**
     * tell a message to an actor in the system.
     */
    tell(addr, msg) {
        this.vm.tell(addr, msg);
        return this;
    }
    /**
     * run puts up the applications base view and spawns all the needed service
     * actors for routing, remote requests etc.
     */
    run() {
        // TODO: Replace this with library calls once available.
        let viewDelegate = new display_1.HTMLElementViewDelegate(this.appNode);
        viewDelegate.set(this.view);
        this.spawn({
            id: 'views',
            create: () => new display_1.Display(new display_1.WMLLayoutViewDelegate(this.view.findById('content').get()), this)
        });
        this.spawn({
            id: 'dialogs',
            create: () => new display_1.Display(new display_1.HTMLElementViewDelegate(this.dialogNode), this)
        });
        this.spawn({
            id: 'remote.background',
            create: () => new remote_1.Remote(agent, this)
        });
        this.spawn({
            id: 'router',
            create: () => new director_1.Director(this.services.views, this.router, {}, routes_1.routes, this)
        });
        this.router.start();
        setTimeout(() => this.router.handleEvent(new Event('hashchanged')), 100);
    }
}
exports.Mia = Mia;
//# sourceMappingURL=index.js.map