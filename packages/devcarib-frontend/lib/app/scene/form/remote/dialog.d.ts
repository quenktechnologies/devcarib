import { Object } from '@quenk/noni/lib/data/jsonx';
import { DevCaribRemoteForm } from './';
/**
 * DevCaribDialogRemoteForm is meant for forms that need to be rendered in a
 * dialog.
 *
 * It provides overrides for showing and closing the dialog as well as wraps
 * the view in a boilerplate modal view.
 */
export declare abstract class DevCaribDialogRemoteForm<T extends Object, M> extends DevCaribRemoteForm<T, M> {
    onSaveOk(): void;
    /**
     * close the dialog.
     */
    close(): void;
    /**
     * show is overriden here to always send content to the dialog service as
     * this actor is intended for a dialog.
     */
    show(): void;
}
