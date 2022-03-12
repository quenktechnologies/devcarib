"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiaFormDialog = exports.MIA_FORM_MODE_UPDATE = exports.MIA_FORM_MODE_CREATE = void 0;
const future_1 = require("@quenk/noni/lib/control/monad/future");
const form_1 = require("@quenk/jouvert/lib/app/scene/form");
const display_1 = require("@quenk/jouvert/lib/app/service/display");
const handlers_1 = require("@quenk/jouvert/lib/app/scene/remote/handlers");
const form_2 = require("../../../../common/scene/form");
const views_1 = require("./views");
exports.MIA_FORM_MODE_CREATE = 'create';
exports.MIA_FORM_MODE_UPDATE = 'update';
/**
 * MiaFormDialog is a FormScene meant to be displayed in a dialog.
 */
class MiaFormDialog extends form_2.MiaFormScene {
    constructor() {
        super(...arguments);
        /**
         * mode indicates the save mode for the form data (create or update).
         */
        this.mode = exports.MIA_FORM_MODE_CREATE;
    }
    /**
     * getModel produces a model for the resource endpoint using the default
     * handlers for this actor.
     */
    getModel(addr) {
        return this.app.getModel(addr, new handlers_1.OnSaveFailed(this));
    }
    /**
     * onSaveFailed calls the setErrors() method and re-renders the view.
     */
    onSaveFailed(failure) {
        this.values.errors = failure.errors;
        this.show();
    }
    /**
     * onSaveOk closes the dialog by default.
     */
    onSaveOk() {
        this.close();
    }
    /**
     * close the dialog.
     */
    close() {
        this.tell(this.app.services.dialogs, new display_1.Close(this.self()));
    }
    /**
     * show is overriden here to always send content to the dialog service as
     * this actor is intended for a modal.
     */
    show() {
        this.tell(this.app.services.dialogs, new display_1.Show(this.name, new views_1.MiaFormDialogView(this), this.self()));
    }
    /**
     * doCreate a new record on the remote server using the values collected
     * by the form so far.
     */
    doCreate() {
        let that = this;
        return (0, future_1.doFuture)(function* () {
            yield that.model.create(that.getValues());
            that.tell(that.self(), new form_1.SaveOk());
            return future_1.voidPure;
        });
    }
    /**
     * doUpdate a record on the remote server by id using the id stored in
     * the current form value.
     */
    doUpdate() {
        let that = this;
        return (0, future_1.doFuture)(function* () {
            yield that.model.update(that.value.id, that.getModifiedValues());
            that.tell(that.self(), new form_1.SaveOk());
            return future_1.voidPure;
        });
    }
    save() {
        this.wait((this.mode === exports.MIA_FORM_MODE_UPDATE) ?
            this.doUpdate() :
            this.doCreate());
    }
}
exports.MiaFormDialog = MiaFormDialog;
//# sourceMappingURL=index.js.map