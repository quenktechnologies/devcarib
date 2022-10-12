"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Converse = void 0;
const future_1 = require("@quenk/noni/lib/control/monad/future");
const handlers_1 = require("@quenk/jouvert/lib/app/scene/remote/handlers");
const app_1 = require("@devcarib/frontend/lib/app");
const invite_1 = require("./dialogs/invite");
const models_1 = require("./remote/models");
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
        let that = this;
        return (0, future_1.doFuture)(function* () {
            if (confirm('Do you want to logout now?')) {
                yield that.agent.post('/logout', {});
                window.location.href = '/';
            }
            return (0, future_1.pure)(undefined);
        });
    }
    run() {
        //XXX: For debugging;
        this.vm.conf.log.level = 1000;
        let that = this;
        let init = () => super.init();
        return (0, future_1.doFuture)(function* () {
            init();
            yield models_1.RemoteModels.create('user', that.services['remote.background'], that, [
                new handlers_1.AfterGetSetData(data => {
                    that.user = data;
                    that.router.start();
                    setTimeout(() => that.router.handleEvent(new Event('hashchanged')), 100);
                }),
                new handlers_1.OnNotFound(() => window.location.replace('login'))
            ]).get('');
            return future_1.voidPure;
        });
    }
}
exports.Converse = Converse;
//# sourceMappingURL=index.js.map