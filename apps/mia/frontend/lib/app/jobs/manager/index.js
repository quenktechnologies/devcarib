"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobsManager = exports.TIME_SEARCH_DEBOUNCE = void 0;
const jobStatus = require("@devcarib/common/lib/data/job");
const api = require("../../api");
const future_1 = require("@quenk/noni/lib/control/monad/future");
const timer_1 = require("@quenk/noni/lib/control/timer");
const handlers_1 = require("@quenk/jouvert/lib/app/scene/remote/handlers");
const columns_1 = require("../columns");
const preview_1 = require("../dialogs/preview");
const manager_1 = require("../../common/scene/manager");
const edit_1 = require("../dialogs/edit");
const jobs_1 = require("./views/jobs");
exports.TIME_SEARCH_DEBOUNCE = 500;
/**
 * JobsManager provides the screen for managing job posts.
 */
class JobsManager extends manager_1.MiaManager {
    constructor() {
        super(...arguments);
        this.name = 'jobs';
        this.view = new jobs_1.JobsManagerView(this);
        this.values = {
            search: {
                onChange: (0, timer_1.debounce)((e) => {
                    let qry = e.value === '' ? {} : { q: e.value };
                    this.search(qry);
                }, exports.TIME_SEARCH_DEBOUNCE)
            },
            table: {
                id: 'table',
                title: 'Jobs',
                add: () => { },
                data: [],
                pagination: {
                    current: {
                        count: 0,
                        page: 1,
                        limit: 50
                    },
                    total: {
                        count: 0,
                        pages: 0
                    }
                },
                columns: [
                    new columns_1.TitleColumn(job => this.showJob(job)),
                    new columns_1.CompanyColumn(),
                    new columns_1.StatusColumn(),
                    new columns_1.ActionColumn([
                        {
                            text: "View",
                            divider: false,
                            onClick: (data) => this.showJob(data)
                        },
                        {
                            text: "Approve",
                            divider: false,
                            onClick: (data) => this.wait(this.approveJob(data.id))
                        },
                        {
                            text: "Edit",
                            divider: false,
                            onClick: (data) => this.editJob(data)
                        },
                        {
                            text: "Remove",
                            divider: true,
                            onClick: (data) => this.wait(this.removeJob(data.id))
                        }
                    ])
                ]
            }
        };
        this.model = this.app.getModel(api.jobs, [
            new handlers_1.AfterSearchSetData(data => this.values.table.data = data),
            new handlers_1.AfterSearchSetPagination(this.values.table),
            new handlers_1.ShiftingOnComplete([
                new handlers_1.OnCompleteShowData(this),
                new handlers_1.AfterSearchUpdateWidget(this.view, this.values.table.id)
            ])
        ]);
    }
    /**
     * search for job postings that match the specified query criteria.
     *
     * The first time this method is called, results will populate and display
     * the view. Subsequent calls will only update the already displated table.
     */
    search(qry) {
        return this.model.search(qry);
    }
    /**
     * showJob displays a single Job in a dialog.
     */
    showJob(data) {
        this.spawn(() => new preview_1.JobPreviewDialog(this.app, data, job => this.editJob(job)));
    }
    /**
     * approveJob sets the approved flag on a job to true.
     *
     * Once this is done the job will show on the site.
     */
    approveJob(id) {
        let that = this;
        return (0, future_1.doFuture)(function* () {
            let change = { status: jobStatus.JOB_STATUS_ACTIVE };
            let r = yield that.model.update(id, change);
            if (r.code == 200) {
                alert('Job approved!');
                that.reload();
            }
            else {
                alert('Could not complete request!');
            }
            return (0, future_1.pure)(undefined);
        });
    }
    /**
     * editJob brings up the dialog editor to quickly edit the title and body
     * of a job.
     */
    editJob(job) {
        this.spawn(() => {
            window.x = new edit_1.EditJobDialog(this.app, this.self(), job);
            return window.x;
        });
    }
    /**
     * removeJob permenantly removes a job from the site.
     */
    removeJob(id) {
        let that = this;
        return (0, future_1.doFuture)(function* () {
            let r = yield that.model.remove(id);
            if (r.code == 200) {
                alert('Job removed!');
                that.reload();
            }
            else {
                alert('Could not complete request!');
            }
            return (0, future_1.pure)(undefined);
        });
    }
    run() {
        return this.search({});
    }
}
exports.JobsManager = JobsManager;
//# sourceMappingURL=index.js.map