import { Object } from '@quenk/noni/lib/data/jsonx';
import { doFuture, voidPure } from '@quenk/noni/lib/control/monad/future';

import { FormErrors, SaveFailed, SaveOk } from '@quenk/jouvert/lib/app/scene/form';
import { Close, Show } from '@quenk/jouvert/lib/app/service/display';
import { RemoteModel } from '@quenk/jouvert/lib/app/remote/model';
import { OnSaveFailed } from '@quenk/jouvert/lib/app/scene/remote/handlers';

import { Address } from '@quenk/potoo/lib/actor/address';

import { MiaFormScene } from '../../../../common/scene/form';
import { MiaFormDialogView } from './views';

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

}

/**
 * AddFormDialog for saving new data.
 */
export abstract class AddFormDialog<T extends Object, M>
    extends
    MiaFormDialog<T, M> {

    save() {

        let that = this;

        this.wait(doFuture(function*() {

            yield that.model.create(that.getValues());

            that.tell(that.self(), new SaveOk());

            return voidPure;

        }));

    }

}

/**
 * EditFormDialog for saving changes to data.
 */
export abstract class EditFormDialog<T extends Object, M>
    extends
    MiaFormDialog<T, M> {

    save() {

        let that = this;

        this.wait(doFuture(function*() {

            yield that.model.update(
                <number>that.value.id,
                that.getModifiedValues()
            );

            that.tell(that.self(), new SaveOk());

            return voidPure;

        }));

    }

}
