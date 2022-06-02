import { Object } from '@quenk/noni/lib/data/jsonx';

import { Close, Show } from '@quenk/jouvert/lib/app/service/display';

import { DevCaribDialogRemoteFormView } from './views';
import { DevCaribRemoteForm } from './';

/**
 * DevCaribDialogRemoteForm is meant for forms that need to be rendered in a
 * dialog.
 *
 * It provides overrides for showing and closing the dialog as well as wraps
 * the view in a boilerplate modal view.
 */
export abstract class DevCaribDialogRemoteForm<T extends Object, M>
    extends
    DevCaribRemoteForm<T, M> {

    onSaveOk() {

        this.close();

    }

    /**
     * close the dialog.
     */
    close() {

        this.tell(this.app.services.dialogs, new Close(this.self()));
        this.abort();

    }

    /**
     * show is overriden here to always send content to the dialog service as
     * this actor is intended for a dialog.
     */
    show() {

        this.tell(this.app.services.dialogs, new Show(this.name,
            new DevCaribDialogRemoteFormView(this), this.self()));

    }

}
