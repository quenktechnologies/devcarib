import { Value } from '@quenk/noni/lib/data/jsonx';
import { Record } from '@quenk/noni/lib/data/record';
import { Event } from '@quenk/wml-widgets/lib/control';
import { Job } from '@board/types/lib/job';
import { DevCaribDialogRemoteForm } from '@devcarib/frontend/lib/app/scene/form/remote/dialog';
import { EditJobDialogView } from './views/edit';
/**
 * EditJobDialog provides an editor for a job in a dialog.
 */
export declare class EditJobDialog extends DevCaribDialogRemoteForm<Job, void> {
    name: string;
    view: EditJobDialogView;
    model: import("@quenk/jouvert/lib/app/remote/model").RemoteModel<import("@quenk/noni/lib/data/jsonx").Object>;
    mode: string;
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
}
