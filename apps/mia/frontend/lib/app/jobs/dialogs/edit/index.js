"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobEditDialog = void 0;
const api = require("../../../api");
const future_1 = require("@quenk/noni/lib/control/monad/future");
const form_1 = require("@quenk/jouvert/lib/app/scene/form");
const display_1 = require("@quenk/jouvert/lib/app/service/display");
const payment_1 = require("@board/common/lib/data/payment");
const form_2 = require("../../../common/scene/form");
const edit_1 = require("./views/edit");
/**
 * JobEditDialog provides an editor for a job in a dialog.
 */
class JobEditDialog extends form_2.MiaFormScene {
    constructor() {
        super(...arguments);
        this.name = 'Job Edit Dialog';
        this.view = new edit_1.JobEditDialogView(this);
        this.jobModel = this.app.getModel(api.JOB);
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
    onSaveOk() {
        this.close();
    }
    close() {
        this.tell(this.app.services.dialogs, new display_1.Close(this.self()));
    }
    save() {
        let that = this;
        return (0, future_1.doFuture)(function* () {
            yield that.jobModel.update(that.value.id, that.getModifiedValues());
            that.tell(that.self(), new form_1.SaveOk());
            return future_1.voidPure;
        }).fork();
    }
    /**
     * show is overriden here to always send content to the dialog service as
     * this actor is intended for a modal.
     */
    show() {
        this.tell(this.app.services.dialogs, new display_1.Show(this.name, this.view, this.self()));
    }
}
exports.JobEditDialog = JobEditDialog;
//# sourceMappingURL=index.js.map