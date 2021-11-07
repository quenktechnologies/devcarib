import { Job } from '@board/types/lib/job';
import { Value } from '@quenk/noni/lib/data/jsonx';
import { ConfirmDialog } from '@quenk/jouvert/lib/app/service/dialog/confirm';
import { DialogEventTarget } from '@quenk/jouvert/lib/app/service/dialog';
import { Event } from '@quenk/wml-widgets/lib/control';
import { Mia } from '../../';
import { JobPreviewDialogView } from './views/preview';
export declare class JobPreviewDialog extends ConfirmDialog<void> {
    app: Mia;
    job: Job;
    target: DialogEventTarget;
    constructor(app: Mia, job: Job, target?: DialogEventTarget);
    name: string;
    view: JobPreviewDialogView;
    jobModel: import("@quenk/jouvert/lib/app/remote/model").RemoteModel<import("@quenk/noni/lib/data/jsonx").Object>;
    values: {
        job: Job;
        changes: Partial<Job>;
        frame: {
            id: string;
            className: string;
            content: string;
        };
        onChange: (e: Event<Value>) => void;
        save: () => void;
        close: () => void;
    };
}
