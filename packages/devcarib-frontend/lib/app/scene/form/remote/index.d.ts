import { Object } from '@quenk/noni/lib/data/jsonx';
import { Future } from '@quenk/noni/lib/control/monad/future';
import { FormErrors, SaveFailed } from '@quenk/jouvert/lib/app/scene/form';
import { Paths, RemoteModel } from '@quenk/jouvert/lib/app/remote/model';
import { DevCaribForm } from '../';
export declare const REMOTE_FORM_MODE_CREATE = "create";
export declare const REMOTE_FORM_MODE_UPDATE = "update";
/**
 * DevCaribRemoteForm is an actor that serves as the form controller for forms
 * that submit data to the back-end.
 *
 * These actors are based around jouvert [[RemoteModel]]s and use them to
 * submit new data or updates.
 */
export declare abstract class DevCaribRemoteForm<T extends Object, M> extends DevCaribForm<T, M> {
    /**
     * model used to save the form data.
     *
     * Use getModel() when instantiating.
     */
    abstract model: RemoteModel<T>;
    /**
     * values for the FormScene's view.
     *
     * This is declared so the error responses can populate the errors
     * property.
     */
    abstract values: {
        errors?: FormErrors;
    };
    /**
     * mode indicates the save mode for the form data (create or update).
     */
    mode: string;
    /**
     * getModel produces the model to use to submit data.
     *
     * A handler is installed by default to handle the 409 "Conflict" response.
     */
    getModel(paths: Paths): RemoteModel<T>;
    /**
     * onSaveFailed handles errors from a 409 "Conflict" response, indicating
     * a problem with the data specified.
     *
     * By default it sets the values.errors property. Note that this is only
     * called if the [[OnSaveFailed]] handler is installed.
     */
    onSaveFailed(failure: SaveFailed): void;
    /**
     * onSaveOk handles successful submission of data.
     *
     * Terminates the form by default.
     */
    onSaveOk(): void;
    /**
     * doCreate a new record on the remote server using the values collected
     * by the form so far.
     */
    doCreate(): Future<void>;
    /**
     * doUpdate a record on the remote server by id using the id stored in
     * the current form value.
     */
    doUpdate(): Future<void>;
    save(): void;
}
