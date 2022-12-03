"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobPage = void 0;
const wml_1 = require("@quenk/wml");
const views_1 = require("./views");
/**
 * JobPage renders the page for a job.
 *
 * This is used for the a job page as well as for previews.
 */
class JobPage extends wml_1.Component {
    constructor() {
        super(...arguments);
        this.view = new views_1.JobPageView(this);
        this.description = { id: 'description' };
    }
    /**
     * setContent sets the description part of the job page.
     */
    setContent(html) {
        this.view.findById(this.description.id)
            .get().innerHTML = html;
    }
}
exports.JobPage = JobPage;
//# sourceMappingURL=index.js.map