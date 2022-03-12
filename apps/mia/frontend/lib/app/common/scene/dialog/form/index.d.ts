import { Object } from '@quenk/noni/lib/data/jsonx';
import { Future } from '@quenk/noni/lib/control/monad/future';
import { FormErrors, SaveFailed } from '@quenk/jouvert/lib/app/scene/form';
import { RemoteModel } from '@quenk/jouvert/lib/app/remote/model';
import { Address } from '@quenk/potoo/lib/actor/address';
import { MiaFormScene } from '../../../../common/scene/form';
export declare const MIA_FORM_MODE_CREATE = "create";
export declare const MIA_FORM_MODE_UPDATE = "update";
/**
 * MiaFormDialog is a FormScene meant to be displayed in a dialog.
 */
export declare abstract class MiaFormDialog<T extends Object, M> extends MiaFormScene<T, M> {
    /**
     * model used to save the form data.
     */
    abstract model: RemoteModel<T>;
    /**
     * values for the FormScene's view.
     *
     * The errors property will be populated with failed data.
     */
    abstract values: {
        errors?: FormErrors;
    };
    /**
     * mode indicates the save mode for the form data (create or update).
     */
    mode: string;
    /**
     * getModel produces a model for the resource endpoint using the default
     * handlers for this actor.
     */
    getModel(addr: Address): RemoteModel<T>;
    /**
     * onSaveFailed calls the setErrors() method and re-renders the view.
     */
    onSaveFailed(failure: SaveFailed): void;
    /**
     * onSaveOk closes the dialog by default.
     */
    onSaveOk(): void;
    /**
     * close the dialog.
     */
    close(): void;
    /**
     * show is overriden here to always send content to the dialog service as
     * this actor is intended for a modal.
     */
    show(): void;
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
