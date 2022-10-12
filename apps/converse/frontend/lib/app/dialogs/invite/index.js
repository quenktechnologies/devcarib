"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateInviteDialog = void 0;
const dialog_1 = require("@devcarib/frontend/lib/app/scene/form/remote/dialog");
const remote_1 = require("@devcarib/frontend/lib/app/scene/form/remote");
const models_1 = require("../../remote/models");
const views_1 = require("./views");
/**
 * CreateInviteDialog is used to create a new invite on the user's behalf.
 */
class CreateInviteDialog extends dialog_1.DevCaribDialogRemoteForm {
    constructor() {
        super(...arguments);
        this.name = 'Invite A Friend';
        this.view = new views_1.CreateInviteDialogView(this);
        this.model = models_1.RemoteModels.create('invite', this.app.services['remote.background'], this);
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