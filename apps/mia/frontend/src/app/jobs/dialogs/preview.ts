import * as api from '../../api';
import * as httpStatus from '@quenk/jhr/lib/status';

import { Job } from '@board/types/lib/job';

import { Value } from '@quenk/noni/lib/data/jsonx';

import { ConfirmDialog } from '@quenk/jouvert/lib/app/service/dialog/confirm';
import { DialogEventTarget } from '@quenk/jouvert/lib/app/service/dialog';

import { Event } from '@quenk/wml-widgets/lib/control';

import { ExecOnComplete } from '@quenk/dfront/lib/app/scene/remote/handlers';

import { Mia } from '../../';
import { JobPreviewDialogView } from './views/preview';

export class JobPreviewDialog extends ConfirmDialog<void> {

    constructor(
        public app: Mia,
        public job: Job,
        public target: DialogEventTarget = '?') {

        super(app, app.services.dialogs, target);

    }

    name = 'Job Preview Dialog';

    view = new JobPreviewDialogView(this);

    jobModel = this.app.getModel(api.JOB,
        new ExecOnComplete(httpStatus.OK, () => {

            this.close();

        }));

    values = {

        job: this.job,

        changes: <Partial<Job>>{},

        frame: {

            id: 'iframe',

            className: 'mia-preview-frame',

            content: getPreview(this.job)

        },

        onChange: (e: Event<Value>) => {

            this.values.changes[e.name] = e.value;

        },

        save: () => {

            this
                .jobModel
                .update(<number>this.job.id, this.values.changes)
                .map(() => { this.confirm(); })
                .fork();

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
        <body>
            <div class="ww-grid-layout board-job-body">
                ${description_html}
            </div>
        </body>
    </html>
`;
