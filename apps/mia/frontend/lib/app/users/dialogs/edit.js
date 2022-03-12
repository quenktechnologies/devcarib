"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditUserDialog = void 0;
const api = require("../../api");
const form_1 = require("../../common/scene/dialog/form");
const add_1 = require("./add");
/**
 * EditUserDialog provides a form embeded in a dialog for editing existing users.
 */
class EditUserDialog extends add_1.AddUserDialog {
    constructor() {
        super(...arguments);
        this.name = 'Edit';
        this.mode = form_1.MIA_FORM_MODE_UPDATE;
        this.model = this.app.getModel(api.USER);
    }
}
exports.EditUserDialog = EditUserDialog;
//# sourceMappingURL=edit.js.map