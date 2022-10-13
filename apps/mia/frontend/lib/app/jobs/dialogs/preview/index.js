"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobPreviewDialog = void 0;
const confirm_1 = require("@quenk/jouvert/lib/app/scene/dialog/confirm");
const models_1 = require("../../../remote/models");
const preview_1 = require("./views/preview");
/**
 * JobPreviewDialog displays a light version of a post in a dialog.
 */
class JobPreviewDialog extends confirm_1.ConfirmDialog {
    constructor(app, job, onEdit) {
        super(app, app.services.dialogs, '?');
        this.app = app;
        this.job = job;
        this.onEdit = onEdit;
        this.name = 'Job Preview Dialog';
        this.view = new preview_1.JobPreviewDialogView(this);
        this.jobModel = models_1.RemoteModels.create('job', this.app.services['remote.background'], this);
        this.values = {
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
}
exports.JobPreviewDialog = JobPreviewDialog;
const getPreview = ({ description_html, title }) => `
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
//# sourceMappingURL=index.js.map