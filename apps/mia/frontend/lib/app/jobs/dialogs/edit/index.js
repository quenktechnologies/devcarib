"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditJobDialog = void 0;
const payment_1 = require("@devcarib/common/lib/data/payment");
const remote_1 = require("@devcarib/frontend/lib/app/scene/form/remote");
const dialog_1 = require("@devcarib/frontend/lib/app/scene/form/remote/dialog");
const models_1 = require("../../../remote/models");
const edit_1 = require("./views/edit");
/**
 * EditJobDialog provides an editor for a job in a dialog.
 */
class EditJobDialog extends dialog_1.DevCaribDialogRemoteForm {
    constructor() {
        super(...arguments);
        this.name = 'Job Edit Dialog';
        this.view = new edit_1.EditJobDialogView(this);
        this.model = models_1.RemoteModels.create('job', this.app.services['remote.background'], this);
        this.mode = remote_1.REMOTE_FORM_MODE_UPDATE;
        this.values = {
            data: this.value,
            errors: {},
            type: {
                options: [
                    { label: 'Full-Time', value: 'Full-Time' },
                    { label: 'Part-Time', value: 'Part-Time' },
                    { label: 'Contractor', value: 'Contractor' },
                    { label: 'Co-Founder', value: 'Co-Founder' },
                    { label: 'Contributor', value: 'Contributor' },
                    { label: 'Volunteer', value: 'Volunteer' },
                ]
            },
            payment_frequency: {
                options: payment_1.supportedPaymentFrequencies.map(value => ({ label: value, value }))
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
exports.EditJobDialog = EditJobDialog;
//# sourceMappingURL=index.js.map