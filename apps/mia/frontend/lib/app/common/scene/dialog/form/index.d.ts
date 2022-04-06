import { Object } from '@quenk/noni/lib/data/jsonx';
import { RemoteForm } from '@devcarib/frontend/lib/app/scene/form/remote';
/**
 * MiaFormDialog is a FormScene meant to be displayed in a dialog.
 */
export declare abstract class MiaFormDialog<T extends Object, M> extends RemoteForm<T, M> {
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
}
