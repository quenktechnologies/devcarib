"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevCaribDialogRemoteForm = void 0;
const display_1 = require("@quenk/jouvert/lib/app/service/display");
const views_1 = require("./views");
const _1 = require("./");
/**
 * DevCaribDialogRemoteForm is meant for forms that need to be rendered in a
 * dialog.
 *
 * It provides overrides for showing and closing the dialog as well as wraps
 * the view in a boilerplate modal view.
 */
class DevCaribDialogRemoteForm extends _1.DevCaribRemoteForm {
    onSaveOk() {
        this.close();
    }
    /**
     * close the dialog.
     */
    close() {
        this.tell(this.app.services.dialogs, new display_1.Close(this.self()));
        this.abort();
    }
    /**
     * show is overriden here to always send content to the dialog service as
     * this actor is intended for a dialog.
     */
    show() {
        this.tell(this.app.services.dialogs, new display_1.Show(this.name, new views_1.DevCaribDialogRemoteFormView(this), this.self()));
    }
}
exports.DevCaribDialogRemoteForm = DevCaribDialogRemoteForm;
//# sourceMappingURL=dialog.js.map