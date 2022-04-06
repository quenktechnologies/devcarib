"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Converse = void 0;
const future_1 = require("@quenk/noni/lib/control/monad/future");
const app_1 = require("@devcarib/frontend/lib/app");
const app_2 = require("./views/app");
const routes_1 = require("./routes");
/**
 * Converse application frontend main class.
 */
class Converse extends app_1.DevCarib {
    constructor() {
        super(...arguments);
        this.view = new app_2.ConverseView(this);
        this.routes = routes_1.routes;
        this.values = {
            header: {
                links: {},
                logout: () => this.logout().fork()
            },
        };
    }
    static create(appNode, dialogNode) {
        return new Converse(appNode, dialogNode);
    }
    logout() {
        return confirm('Do you want to logout now?') ?
            this.agent
                .post('/converse/logout', {})
                .chain(() => {
                window.location.href = '/admin';
                return (0, future_1.pure)(undefined);
            }) :
            (0, future_1.pure)(undefined);
    }
}
exports.Converse = Converse;
//# sourceMappingURL=index.js.map