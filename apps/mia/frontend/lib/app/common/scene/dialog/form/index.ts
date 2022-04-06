import { Object } from '@quenk/noni/lib/data/jsonx';

import { Close, Show } from '@quenk/jouvert/lib/app/service/display';

import { RemoteForm } from '@devcarib/frontend/lib/app/scene/form/remote';

import { MiaFormDialogView } from './views';

/**
 * MiaFormDialog is a FormScene meant to be displayed in a dialog.
 */
export abstract class MiaFormDialog<T extends Object, M>
    extends
    RemoteForm<T, M> {

        onSaveOk() {

            this.close();

        }

    /**
     * close the dialog.
     */
    close() {

        this.tell(this.app.services.dialogs, new Close(this.self()));

    }

    /**
     * show is overriden here to always send content to the dialog service as
     * this actor is intended for a modal.
     */
    show() {

        this.tell(this.app.services.dialogs,
            new Show(this.name, new MiaFormDialogView(this), this.self()));

    }

}
