"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordChangeDialog = void 0;
const dialog_1 = require("@devcarib/frontend/lib/app/scene/form/remote/dialog");
const remote_1 = require("@devcarib/frontend/lib/app/scene/form/remote");
const models_1 = require("../../remote/models");
const views_1 = require("./views");
/**
 * PasswordChangeDialog allows the user to quickly change their current password.
 */
class PasswordChangeDialog extends dialog_1.DevCaribDialogRemoteForm {
    constructor() {
        super(...arguments);
        this.name = 'Change Password';
        this.view = new views_1.PasswordChangeDialogView(this);
        this.model = models_1.RemoteModels.create('user', this.app.services['remote.background'], this);
        this.mode = remote_1.REMOTE_FORM_MODE_UPDATE;
        this.values = {
            data: this.value,
            errors: {},
            onChange: (e) => {
                this.tell(this.self(), e);
            }
        };
    }
}
exports.PasswordChangeDialog = PasswordChangeDialog;
//# sourceMappingURL=index.js.map