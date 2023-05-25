import { Object } from '@quenk/noni/lib/data/jsonx';

import {
    FormErrors,
} from '@quenk/jouvert/lib/app/scene/form';
import { Close } from '@quenk/jouvert/lib/app/service/display';

import { DevCaribForm } from '../';

export const REMOTE_FORM_MODE_CREATE = 'create';
export const REMOTE_FORM_MODE_UPDATE = 'update';

/**
 * DevCaribRemoteForm is an actor that serves as the form controller for forms
 * that submit data to the back-end.
 *
 * These actors are based around jouvert [[RemoteModel]]s and use them to
 * submit new data or updates.
 */
export abstract class DevCaribRemoteForm<T extends Object, M>
    extends
    DevCaribForm<T, M> {

    /**
     * values for the FormScene's view.
     *
     * This is declared so the error responses can populate the errors
     * property.
     */
    abstract values: { errors?: FormErrors };

    /**
     * mode indicates the save mode for the form data (create or update).
     */
    mode = REMOTE_FORM_MODE_CREATE;

    /**
     * onSaveFailed handles errors from a 409 "Conflict" response, indicating
     * a problem with the data specified.
     *
     * By default it sets the values.errors property. Note that this is only
     * called if the [[OnSaveFailed]] handler is installed.
     */
    onSaveFailed(failure: any) {

        this.values.errors = failure.errors;

        this.show();

    }

    /**
     * onSaveOk handles successful submission of data.
     *
     * Terminates the form by default.
     */
    onSaveOk() {

        this.tell(this.target, new Close(this.self()));

    }

}
