"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobRankPanel = void 0;
const wml_1 = require("@quenk/wml");
const views_1 = require("./views");
/**
 * JobRankPanel displays a listing of recent jobs.
 */
class JobRankPanel extends wml_1.Component {
    constructor() {
        super(...arguments);
        this.view = new views_1.JobRankPanelView(this);
        this.values = {
            jobs: this.attrs.data || []
        };
    }
    update(data) {
        this.values.jobs = data;
        this.view.invalidate();
    }
}
exports.JobRankPanel = JobRankPanel;
//# sourceMappingURL=index.js.map