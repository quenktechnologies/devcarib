"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionColumn = exports.StatusColumn = exports.CompanyColumn = exports.TitleColumn = void 0;
const views_1 = require("./views");
/**
 * TitleColumn displays the title of the job.
 */
class TitleColumn {
    constructor(action) {
        this.action = action;
        this.name = 'title';
        this.heading = 'Title';
        this.cellFragment = (c) => new views_1.TitleColumnView({
            job: c.datum,
            onClick: () => this.action(c.datum)
        });
    }
}
exports.TitleColumn = TitleColumn;
/**
 * CompanyColumn displays the company name.
 */
class CompanyColumn {
    constructor() {
        this.name = 'company';
        this.heading = 'Company';
    }
}
exports.CompanyColumn = CompanyColumn;
/**
 * StatusColumn displays the approval status of the job.
 */
class StatusColumn {
    constructor() {
        this.name = 'status';
        this.heading = 'Status';
    }
}
exports.StatusColumn = StatusColumn;
/**
 * ActionColumn displays a drop-down menu with actions that can be taken on a
 * single job.
 */
class ActionColumn {
    constructor(actions) {
        this.actions = actions;
        this.name = '';
        this.heading = 'Actions';
        this.cellFragment = (c) => new views_1.ActionColumnView({
            actions: this.actions,
            job: c.datum
        });
    }
}
exports.ActionColumn = ActionColumn;
//# sourceMappingURL=index.js.map