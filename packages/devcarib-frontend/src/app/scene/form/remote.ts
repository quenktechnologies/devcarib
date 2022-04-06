import { Object } from '@quenk/noni/lib/data/jsonx';
import { doFuture, Future, voidPure } from '@quenk/noni/lib/control/monad/future';

import { FormErrors, SaveFailed, SaveOk } from '@quenk/jouvert/lib/app/scene/form';
import { RemoteModel } from '@quenk/jouvert/lib/app/remote/model';
import { OnSaveFailed } from '@quenk/jouvert/lib/app/scene/remote/handlers';
import { Close } from '@quenk/jouvert/lib/app/service/display';

import { DevCaribForm } from '.';

export const REMOTE_FORM_MODE_CREATE = 'create';
export const REMOTE_FORM_MODE_UPDATE = 'update';

/**
 * RemoteForm is an actor that serves as the form controller for forms that
 * submit data to the backend.
 *
 * These actors are based around jouvert [[RemoteModel]]s and use them to
 * submit new data or updates.
 */
export abstract class RemoteForm<T extends Object, M>
    extends
    DevCaribForm<T, M> {

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
    abstract values: { errors?: FormErrors };

    /**
     * mode indicates the save mode for the form data (create or update).
     */
    mode = REMOTE_FORM_MODE_CREATE;

    /**
     * getModel produces the model to use to submit data.
     *
     * A handler is installed by default to handle the 409 "Conflict" response.
     */
    getModel(resource: string): RemoteModel<T> {

        return <RemoteModel<T>>this.app.getModel(resource,
            new OnSaveFailed(this));

    }

    /**
     * onSaveFailed handles errors from a 409 "Conflict" response, indicating
     * a problem with the data specified.
     *
     * By default it sets the values.errors property. Note that this is only
     * called if the [[OnSaveFailed]] handler is installed.
     */
    onSaveFailed(failure: SaveFailed) {

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

    /**
     * doCreate a new record on the remote server using the values collected
     * by the form so far.
     */
    doCreate(): Future<void> {

        let that = this;

        return doFuture(function*() {

            yield that.model.create(that.getValues());

            that.tell(that.self(), new SaveOk());

            return voidPure;

        });

    }

    /**
     * doUpdate a record on the remote server by id using the id stored in
     * the current form value.
     */
    doUpdate(): Future<void> {

        let that = this;

        return doFuture(function*() {

            yield that.model.update(
                <number>that.value.id,
                that.getModifiedValues()
            );

            that.tell(that.self(), new SaveOk());

            return voidPure;

        });

    }

    save() {

        this.wait((this.mode === REMOTE_FORM_MODE_UPDATE) ?
            this.doUpdate() :
            this.doCreate());

    }

}
