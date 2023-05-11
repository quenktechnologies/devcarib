"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostJobFormCompanyPanel = exports.PostJobFormPanel = void 0;
const wml_1 = require("@quenk/wml");
const job_1 = require("./views/job");
const company_1 = require("./views/company");
/**
 * PostJobFormPanel displays the job details part of a form for creating
 * a new job.
 */
class PostJobFormPanel extends wml_1.Component {
    constructor() {
        super(...arguments);
        this.view = new job_1.PostJobFormPanelView(this);
        this.typeOptions = [
            { label: 'Full-Time', value: 'Full-Time' },
            { label: 'Part-Time', value: 'Part-Time' },
            { label: 'Contractor', value: 'Contractor' },
            { label: 'Co-Founder', value: 'Co-Founder' },
            { label: 'Contributor', value: 'Contributor' },
            { label: 'Volunteer', value: 'Volunteer' },
        ];
    }
}
exports.PostJobFormPanel = PostJobFormPanel;
/**
 * PostJobFormCompanyPanel displays the company fields in a panel on the post
 * job form.
 */
class PostJobFormCompanyPanel extends wml_1.Component {
    constructor() {
        super(...arguments);
        this.view = new company_1.PostJobFormCompanyPanelView(this);
    }
}
exports.PostJobFormCompanyPanel = PostJobFormCompanyPanel;
//# sourceMappingURL=index.js.map