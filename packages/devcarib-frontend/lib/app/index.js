"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevCarib = void 0;
const display_1 = require("@quenk/jouvert/lib/app/service/display");
const factory_1 = require("@quenk/jouvert/lib/app/remote/model/factory");
const director_1 = require("@quenk/jouvert/lib/app/service/director");
const remote_1 = require("@quenk/jouvert/lib/app/remote");
const jouvert_1 = require("@quenk/jouvert");
const hash_1 = require("@quenk/frontend-routers/lib/hash");
const browser_1 = require("@quenk/jhr/lib/browser");
const defaultConf = {
    log: {
        level: Number(process.env.PVM_LOG_LEVEL) || 1,
        logger: console
    }
};
/**
 * DevCarib serves as the parent class for the various frontend SPAs.
 *
 * This class sets up the actor system, view management and routing so
 * extending classes don't have to repeat the same steps across apps.
 *
 * @param main       - DOM node for the application content.
 * @param dialogs    - DOM node for dialogs.
 * @param conf       - Potoo compatiable configuration object.
 */
class DevCarib extends jouvert_1.Jouvert {
    constructor(main, dialogs, conf = defaultConf) {
        super(conf);
        this.main = main;
        this.dialogs = dialogs;
        this.conf = conf;
        /**
         * agent used to make the main XHR requests.
         */
        this.agent = (0, browser_1.createAgent)();
        /**
         * router for various screens of the application.
         */
        this.router = new hash_1.HashRouter(window, {});
        /**
         * services keeps the address of service actors within the system.
         */
        this.services = {};
    }
    /**
     * @private
     */
    get models() {
        return factory_1.RemoteModelFactory
            .getInstance(this, this.services['remote.background']);
    }
    /**
     * getModel is a factory method for creating [[RemoteModel]] instances.
     */
    getModel(paths, handler = [], _context = {}) {
        return this.models.create(paths, handler);
    }
    /**
     * spawn an actor directly from the root.
     *
     * Any actor spawned here is automatically added to the services map.
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
     * init spawns all the services needed by the application
     */
    init() {
        // TODO: Replace this with library calls once available.
        let viewDelegate = new display_1.HTMLElementViewDelegate(this.main);
        viewDelegate.set(this.view);
        this.spawn({
            id: 'views',
            create: () => new display_1.Display(new display_1.HTMLElementViewDelegate(this.view.findById('content').get()), this)
        });
        this.spawn({
            id: 'dialogs',
            create: () => new display_1.Display(new display_1.HTMLElementViewDelegate(this.dialogs), this)
        });
        this.spawn({
            id: 'remote.background',
            create: () => new remote_1.Remote(this.agent, this)
        });
        this.spawn({
            id: 'router',
            create: () => new director_1.Director(this.services.views, this.router, {}, this.routes, this)
        });
    }
    /**
     * run the application.
     */
    run() {
        this.init();
        this.router.start();
        setTimeout(() => this.router.handleEvent(new Event('hashchanged')), 100);
    }
}
exports.DevCarib = DevCarib;
//# sourceMappingURL=index.js.map