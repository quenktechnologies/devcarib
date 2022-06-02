"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateInviteDialog = void 0;
const api = require("../../api");
const dialog_1 = require("@devcarib/frontend/lib/app/scene/form/remote/dialog");
const remote_1 = require("@devcarib/frontend/lib/app/scene/form/remote");
const views_1 = require("./views");
/**
 * CreateInviteDialog is used to create a new invite on the user's behalf.
 */
class CreateInviteDialog extends dialog_1.DevCaribDialogRemoteForm {
    constructor() {
        super(...arguments);
        this.name = 'Invite A Friend';
        this.view = new views_1.CreateInviteDialogView(this);
        this.model = this.app.getModel(api.invites);
        this.mode = remote_1.REMOTE_FORM_MODE_CREATE;
        this.values = {
            data: this.value,
            errors: {},
            onChange: (e) => {
                this.tell(this.self(), e);
            }
        };
    }
}
exports.CreateInviteDialog = CreateInviteDialog;
//# sourceMappingURL=index.js.map