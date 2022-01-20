import * as api from '../../../api';

import { ConfirmDialog } from '@quenk/jouvert/lib/app/scene/dialog/confirm';

import { Job } from '@board/types/lib/job';

import { Mia } from '../../../';
import { JobPreviewDialogView } from './views/preview';

/**
 * JobPreviewDialog displays a light version of a post in a dialog.
 */
export class JobPreviewDialog extends ConfirmDialog<void> {

    constructor(
        public app: Mia,
        public job: Job,
        public onEdit: (job: Job) => void) {

        super(app, app.services.dialogs, '?');

    }

    name = 'Job Preview Dialog';

    view = new JobPreviewDialogView(this);

    jobModel = this.app.getModel(api.JOB);

    values = {

        data: this.job,

        frame: {

            id: 'iframe',

            className: 'mia-preview-frame',

            content: getPreview(this.job)

        },

        edit: () => {

            this.close();

            this.onEdit(this.job);

        },

        close: () => this.close()

    };

}

const getPreview = ({ description_html, title }: Job) => `
<!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="/assets/css/site.css">
            <title>${title}</title>
        </head>
        <body style="background:#fff">
            <div class="ww-grid-layout board-job-body">
                ${description_html}
            </div>
        </body>
    </html>
`;
