import { Value } from '@quenk/noni/lib/data/jsonx';
import { Record } from '@quenk/noni/lib/data/record';
import { Event } from '@quenk/wml-widgets/lib/control';
import { Job } from '@board/types/lib/job';
import { MiaFormScene } from '../../../common/scene/form';
import { JobEditDialogView } from './views/edit';
/**
 * JobEditDialog provides an editor for a job in a dialog.
 */
export declare class JobEditDialog extends MiaFormScene<Job, void> {
    name: string;
    view: JobEditDialogView;
    jobModel: import("@quenk/jouvert/lib/app/remote/model").RemoteModel<import("@quenk/noni/lib/data/jsonx").Object>;
    values: {
        data: Partial<Job>;
        errors: Record<string>;
        type: {
            options: {
                label: string;
                value: string;
            }[];
        };
        payment_frequency: {
            options: {
                label: string;
                value: string;
            }[];
        };
        onSelect: (e: Event<Value>) => void;
        onChange: (e: Event<Value>) => void;
        close: () => void;
        save: () => void;
    };
    onSaveOk(): void;
    close(): void;
    save(): import("@quenk/noni/lib/control/monad/future").Aborter;
    /**
     * show is overriden here to always send content to the dialog service as
     * this actor is intended for a modal.
     */
    show(): void;
}
