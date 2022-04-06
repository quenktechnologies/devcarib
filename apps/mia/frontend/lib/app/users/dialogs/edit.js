"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditUserDialog = void 0;
const api = require("../../api");
const remote_1 = require("@devcarib/frontend/lib/app/scene/form/remote");
const add_1 = require("./add");
/**
 * EditUserDialog provides a form embedded in a dialog for editing existing users.
 */
class EditUserDialog extends add_1.AddUserDialog {
    constructor() {
        super(...arguments);
        this.name = 'Edit';
        this.mode = remote_1.REMOTE_FORM_MODE_UPDATE;
        this.model = this.app.getModel(api.USER);
    }
}
exports.EditUserDialog = EditUserDialog;
//# sourceMappingURL=edit.js.map