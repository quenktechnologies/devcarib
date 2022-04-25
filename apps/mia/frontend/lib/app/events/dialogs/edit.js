"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditEventDialog = void 0;
const remote_1 = require("@devcarib/frontend/lib/app/scene/form/remote");
const add_1 = require("./add");
/**
 * EditEventDialog provides a form embedded in a dialog for editing existing users.
 */
class EditEventDialog extends add_1.AddEventDialog {
    constructor() {
        super(...arguments);
        this.name = 'Edit';
        this.mode = remote_1.REMOTE_FORM_MODE_UPDATE;
    }
}
exports.EditEventDialog = EditEventDialog;
//# sourceMappingURL=edit.js.map