import { ConfirmDialog } from '@quenk/jouvert/lib/app/scene/dialog/confirm';
import { Job } from '@board/types/lib/job';
import { Mia } from '../../../';
import { JobPreviewDialogView } from './views/preview';
/**
 * JobPreviewDialog displays a light version of a post in a dialog.
 */
export declare class JobPreviewDialog extends ConfirmDialog<void> {
    app: Mia;
    job: Job;
    onEdit: (job: Job) => void;
    constructor(app: Mia, job: Job, onEdit: (job: Job) => void);
    name: string;
    view: JobPreviewDialogView;
    jobModel: import("@quenk/jouvert/lib/app/remote/model").RemoteModel<import("@quenk/noni/lib/data/jsonx").Object>;
    values: {
        data: Job;
        frame: {
            id: string;
            className: string;
            content: string;
        };
        edit: () => void;
        close: () => void;
    };
}
