"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditJobDialog = void 0;
const api = require("../../../api");
const payment_1 = require("@devcarib/common/lib/data/payment");
const form_1 = require("../../../common/scene/dialog/form");
const edit_1 = require("./views/edit");
/**
 * EditJobDialog provides an editor for a job in a dialog.
 */
class EditJobDialog extends form_1.MiaFormDialog {
    constructor() {
        super(...arguments);
        this.name = 'Job Edit Dialog';
        this.view = new edit_1.EditJobDialogView(this);
        this.model = this.app.getModel(api.JOB);
        this.mode = form_1.MIA_FORM_MODE_UPDATE;
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