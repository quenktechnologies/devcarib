"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Converse = void 0;
const api = require("./api");
const future_1 = require("@quenk/noni/lib/control/monad/future");
const app_1 = require("@devcarib/frontend/lib/app");
const invite_1 = require("./dialogs/invite");
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
        this.user = {};
        this.values = {
            header: {
                links: {},
                invite: () => this.spawn({
                    id: 'invite',
                    trap: routes_1.trap,
                    create: () => new invite_1.CreateInviteDialog(this, this.services.display)
                }),
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
    run() {
        let that = this;
        let runSuper = () => super.run();
        (0, future_1.doFuture)(function* () {
            let res = yield that.agent.get(api.me.get);
            if (res.code === 200) {
                that.user = res.body.data;
                runSuper();
            }
            else {
                window.location.replace('/converse/login');
            }
            return future_1.voidPure;
        }).fork();
    }
}
exports.Converse = Converse;
//# sourceMappingURL=index.js.map