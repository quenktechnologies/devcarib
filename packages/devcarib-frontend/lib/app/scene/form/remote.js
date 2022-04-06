"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoteForm = exports.REMOTE_FORM_MODE_UPDATE = exports.REMOTE_FORM_MODE_CREATE = void 0;
const future_1 = require("@quenk/noni/lib/control/monad/future");
const form_1 = require("@quenk/jouvert/lib/app/scene/form");
const handlers_1 = require("@quenk/jouvert/lib/app/scene/remote/handlers");
const display_1 = require("@quenk/jouvert/lib/app/service/display");
const _1 = require(".");
exports.REMOTE_FORM_MODE_CREATE = 'create';
exports.REMOTE_FORM_MODE_UPDATE = 'update';
/**
 * RemoteForm is an actor that serves as the form controller for forms that
 * submit data to the backend.
 *
 * These actors are based around jouvert [[RemoteModel]]s and use them to
 * submit new data or updates.
 */
class RemoteForm extends _1.DevCaribForm {
    constructor() {
        super(...arguments);
        /**
         * mode indicates the save mode for the form data (create or update).
         */
        this.mode = exports.REMOTE_FORM_MODE_CREATE;
    }
    /**
     * getModel produces the model to use to submit data.
     *
     * A handler is installed by default to handle the 409 "Conflict" response.
     */
    getModel(resource) {
        return this.app.getModel(resource, new handlers_1.OnSaveFailed(this));
    }
    /**
     * onSaveFailed handles errors from a 409 "Conflict" response, indicating
     * a problem with the data specified.
     *
     * By default it sets the values.errors property. Note that this is only
     * called if the [[OnSaveFailed]] handler is installed.
     */
    onSaveFailed(failure) {
        this.values.errors = failure.errors;
        this.show();
    }
    /**
     * onSaveOk handles successful submission of data.
     *
     * Terminates the form by default.
     */
    onSaveOk() {
        this.tell(this.target, new display_1.Close(this.self()));
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
        this.wait((this.mode === exports.REMOTE_FORM_MODE_UPDATE) ?
            this.doUpdate() :
            this.doCreate());
    }
}
exports.RemoteForm = RemoteForm;
//# sourceMappingURL=remote.js.map