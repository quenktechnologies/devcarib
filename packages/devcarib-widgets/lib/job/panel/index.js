"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobPanel = void 0;
const wml_1 = require("@quenk/wml");
const panel_1 = require("./panel");
/**
 * JobPanel displays detailed information about a job on the job's profile
 * page or preview.
 */
class JobPanel extends wml_1.Component {
    constructor() {
        super(...arguments);
        this.view = new panel_1.JobPanelView(this);
        this.className = 'devcarib-job-panel';
        this.data = this.attrs.job;
        this.raw = this.attrs.raw;
        this.contentClassName = 'devcarib-job-panel-content';
        this.timestampClassName = 'devcarib-job-panel-timestamp';
        this.paymentClassName = 'devcarib-job-panel-payment';
        this.body = {
            id: 'body',
            className: 'board-job-html'
        };
    }
    /**
     * setContent allows the content displayed in the JobPanel to be displayed.
     */
    setContent(html) {
        let mcontent = this.view.findById(this.body.id);
        if (mcontent.isJust())
            mcontent.get().innerHTML = html;
    }
}
exports.JobPanel = JobPanel;
//# sourceMappingURL=index.js.map