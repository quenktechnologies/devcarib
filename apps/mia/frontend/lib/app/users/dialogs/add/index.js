"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddUserDialog = void 0;
const api = require("../../../api");
const record_1 = require("@quenk/noni/lib/data/record");
const status_1 = require("@devcarib/server/lib/user/status");
const form_1 = require("../../../common/scene/dialog/form");
const add_1 = require("./views/add");
/**
 * AddUserDialog provides a form embeded in a dialog for adding new users.
 */
class AddUserDialog extends form_1.MiaFormDialog {
    constructor() {
        super(...arguments);
        this.name = 'Add User';
        this.view = new add_1.AddUserDialogView(this);
        this.model = this.getModel(api.users);
        this.value = (0, record_1.merge)({ status: status_1.USER_STATUS_ACTIVE }, this.value);
        this.values = {
            data: this.value,
            errors: {},
            status: {
                options: [
                    { text: 'Active', value: status_1.USER_STATUS_ACTIVE },
                    { text: 'Disabled', value: status_1.USER_STATUS_DISABLED },
                ]
            },
            onSelect: (e) => {
                this.tell(this.self(), e);
            },
            onChange: (e) => {
                this.tell(this.self(), e);
            },
            close: () => {
                this.close();
                this.abort();
            },
            save: () => {
                this.save();
            }
        };
    }
}
exports.AddUserDialog = AddUserDialog;
//# sourceMappingURL=index.js.map