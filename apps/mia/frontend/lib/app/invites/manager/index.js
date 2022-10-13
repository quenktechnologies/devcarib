"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvitesManager = exports.TIME_SEARCH_DEBOUNCE = void 0;
const timer_1 = require("@quenk/noni/lib/control/timer");
const future_1 = require("@quenk/noni/lib/control/monad/future");
const columns_1 = require("../../common/columns");
const columns_2 = require("../columns");
const manager_1 = require("../../common/scene/manager");
const invites_1 = require("./views/invites");
exports.TIME_SEARCH_DEBOUNCE = 500;
/**
 * InvitesManager provides the screen for invite management.
 */
class InvitesManager extends manager_1.MiaManager {
    constructor() {
        super(...arguments);
        this.name = 'users';
        this.view = new invites_1.InviteManagerView(this);
        this.values = {
            search: {
                onChange: (0, timer_1.debounce)((e) => {
                    let qry = e.value === '' ? {} : { q: e.value };
                    this.search(qry);
                }, exports.TIME_SEARCH_DEBOUNCE)
            },
            table: {
                id: 'table',
                title: 'Invites',
                data: [],
                pagination: {
                    current: {
                        count: 0,
                        page: 1,
                        limit: 50
                    },
                    total: {
                        count: 0,
                        pages: 0
                    }
                },
                columns: [
                    new columns_2.EmailColumn(),
                    new columns_2.UrlColumn(),
                    new columns_2.CreatedByColumn(),
                    new columns_1.ActionColumn([
                        {
                            text: 'Remove',
                            onClick: (usr) => this.remove(usr.id)
                        }
                    ])
                ],
            }
        };
        this.model = this.models.create('invite', (0, manager_1.defaultHandlers)(this));
    }
    remove(id) {
        let that = this;
        this.wait((0, future_1.doFuture)(function* () {
            yield that.model.remove(id);
            that.reload();
            return future_1.voidPure;
        }));
    }
}
exports.InvitesManager = InvitesManager;
//# sourceMappingURL=index.js.map