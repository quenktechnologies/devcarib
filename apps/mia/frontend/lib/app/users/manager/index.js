"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersManager = exports.TIME_SEARCH_DEBOUNCE = void 0;
const api = require("../../api");
const timer_1 = require("@quenk/noni/lib/control/timer");
const columns_1 = require("../../common/columns");
const columns_2 = require("../columns");
const manager_1 = require("../../common/scene/manager");
const add_1 = require("../dialogs/add");
const edit_1 = require("../dialogs/edit");
const users_1 = require("./views/users");
exports.TIME_SEARCH_DEBOUNCE = 500;
/**
 * UsersManager provides the screen for managing users.
 */
class UsersManager extends manager_1.MiaManager {
    constructor() {
        super(...arguments);
        this.name = 'users';
        this.view = new users_1.UsersManagerView(this);
        this.values = {
            search: {
                onChange: (0, timer_1.debounce)((e) => {
                    let qry = e.value === '' ? {} : { q: e.value };
                    this.search(qry);
                }, exports.TIME_SEARCH_DEBOUNCE)
            },
            table: {
                id: 'table',
                title: 'Users',
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
                    new columns_2.UsernameColumn(),
                    new columns_1.ActionColumn([
                        {
                            text: 'Edit',
                            onClick: (usr) => this.edit(usr)
                        }
                    ])
                ],
                add: () => this.add()
            }
        };
        this.model = this.app.getModel(api.USERS, (0, manager_1.defaultHandlers)(this));
    }
    /**
     * add brings up the form for adding a new user.
     */
    add() {
        this.spawn(() => new add_1.AddUserDialog(this.app, this.self()));
    }
    /**
     * edit brings up the form for editing an existing user profile.
     */
    edit(usr) {
        this.spawn(() => new edit_1.EditUserDialog(this.app, this.self(), usr));
    }
}
exports.UsersManager = UsersManager;
//# sourceMappingURL=index.js.map