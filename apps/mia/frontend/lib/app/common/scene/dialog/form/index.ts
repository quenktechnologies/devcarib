import { Object } from '@quenk/noni/lib/data/jsonx';
import { doFuture, Future, voidPure } from '@quenk/noni/lib/control/monad/future';

import { FormErrors, SaveFailed, SaveOk } from '@quenk/jouvert/lib/app/scene/form';
import { Close, Show } from '@quenk/jouvert/lib/app/service/display';
import { RemoteModel } from '@quenk/jouvert/lib/app/remote/model';
import { OnSaveFailed } from '@quenk/jouvert/lib/app/scene/remote/handlers';

import { Address } from '@quenk/potoo/lib/actor/address';

import { MiaFormScene } from '../../../../common/scene/form';
import { MiaFormDialogView } from './views';

export const MIA_FORM_MODE_CREATE = 'create';
export const MIA_FORM_MODE_UPDATE = 'update';

/**
 * MiaFormDialog is a FormScene meant to be displayed in a dialog.
 */
export abstract class MiaFormDialog<T extends Object, M>
    extends
    MiaFormScene<T, M> {

    /**
     * model used to save the form data.
     */
    abstract model: RemoteModel<T>;

    /**
     * values for the FormScene's view.
     *
     * The errors property will be populated with failed data.
     */
    abstract values: { errors?: FormErrors };

    /**
     * mode indicates the save mode for the form data (create or update).
     */
    mode = MIA_FORM_MODE_CREATE;

    /**
     * getModel produces a model for the resource endpoint using the default
     * handlers for this actor.
     */
    getModel(addr: Address): RemoteModel<T> {

        return <RemoteModel<T>>this.app.getModel(addr, new OnSaveFailed(this));

    }

    /**
     * onSaveFailed calls the setErrors() method and re-renders the view.
     */
    onSaveFailed(failure: SaveFailed) {

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

        this.wait((this.mode === MIA_FORM_MODE_UPDATE) ?
            this.doUpdate() :
            this.doCreate());

    }

}
