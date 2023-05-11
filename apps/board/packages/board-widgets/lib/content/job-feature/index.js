"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobFeature = void 0;
const wml_1 = require("@quenk/wml");
const views_1 = require("./views");
/**
 * JobFeature is used to display a feature of a job such as the job type.
 */
class JobFeature extends wml_1.Component {
    constructor() {
        super(...arguments);
        this.view = new views_1.JobFeatureView(this);
        this.className = 'devcarib-job-feature';
        this.text = this.attrs.text;
    }
}
exports.JobFeature = JobFeature;
//# sourceMappingURL=index.js.map