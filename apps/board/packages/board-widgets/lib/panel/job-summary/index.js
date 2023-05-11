"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobSummaryPanel = void 0;
const wml_1 = require("@quenk/wml");
const string_1 = require("@quenk/noni/lib/data/string");
const views_1 = require("./views");
const DEFAULT_URL = '/{id}';
/**
 * JobSummaryPanel is used to display details of a job posting usually in a list.
 */
class JobSummaryPanel extends wml_1.Component {
    constructor() {
        super(...arguments);
        this.view = new views_1.JobSummaryPanelView(this);
        this.values = {
            className: 'devcarib-job-summary-panel',
            job: this.attrs.job,
            url: (0, string_1.interpolate)(this.attrs.url || DEFAULT_URL, this.attrs.job),
            meta: {
                className: 'devcarib-job-summary-panel-meta'
            }
        };
    }
}
exports.JobSummaryPanel = JobSummaryPanel;
//# sourceMappingURL=index.js.map