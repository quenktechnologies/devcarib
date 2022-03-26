"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mia = void 0;
const function_1 = require("@quenk/noni/lib/data/function");
const future_1 = require("@quenk/noni/lib/control/monad/future");
const app_1 = require("@devcarib/frontend/lib/app");
const app_2 = require("./views/app");
const routes_1 = require("./routes");
/**
 * Mia application main class.
 */
class Mia extends app_1.DevCarib {
    constructor() {
        super(...arguments);
        this.view = new app_2.MiaView(this);
        this.routes = routes_1.routes;
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
    static create(appNode, dialogNode) {
        return new Mia(appNode, dialogNode);
    }
    /**
     * logout the user from the application.
     *
     * TODO: better
     */
    logout() {
        return confirm('Do you want to logout now?') ?
            this.agent
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
}
exports.Mia = Mia;
//# sourceMappingURL=index.js.map