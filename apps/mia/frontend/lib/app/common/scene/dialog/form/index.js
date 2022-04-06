"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiaFormDialog = void 0;
const display_1 = require("@quenk/jouvert/lib/app/service/display");
const remote_1 = require("@devcarib/frontend/lib/app/scene/form/remote");
const views_1 = require("./views");
/**
 * MiaFormDialog is a FormScene meant to be displayed in a dialog.
 */
class MiaFormDialog extends remote_1.RemoteForm {
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
}
exports.MiaFormDialog = MiaFormDialog;
//# sourceMappingURL=index.js.map