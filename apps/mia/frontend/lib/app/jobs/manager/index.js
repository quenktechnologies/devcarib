"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobsManager = exports.ShowEditor = exports.TIME_SEARCH_DEBOUNCE = exports.ACTION_SHOW = exports.ACTION_REMOVE = exports.ACTION_APPROVE = void 0;
const jobStatus = require("@board/common/lib/data/job");
const api = require("../../api");
const future_1 = require("@quenk/noni/lib/control/monad/future");
const string_1 = require("@quenk/noni/lib/data/string");
const function_1 = require("@quenk/noni/lib/data/function");
const timer_1 = require("@quenk/noni/lib/control/timer");
const browser_1 = require("@quenk/jhr/lib/browser");
const columns_1 = require("../columns");
const preview_1 = require("../dialogs/preview");
const manager_1 = require("../../common/scene/manager");
const jobs_1 = require("./views/jobs");
const edit_1 = require("../dialogs/edit");
exports.ACTION_APPROVE = 'approve';
exports.ACTION_REMOVE = 'remove';
exports.ACTION_SHOW = 'show';
exports.TIME_SEARCH_DEBOUNCE = 500;
const agent = (0, browser_1.createAgent)();
/**
 * ShowEditor instructs the Manager to display an editor for the target data.
 */
class ShowEditor {
    constructor(data) {
        this.data = data;
    }
}
exports.ShowEditor = ShowEditor;
/**
 * JobsManager provides the screen for managing job posts created within
 * the system.
 */
class JobsManager extends manager_1.MiaManager {
    constructor() {
        super(...arguments);
        this.name = 'jobs';
        this.view = new jobs_1.JobsManagerView(this);
        this.jobsModel = this.app.getModel(api.JOBS);
        this.values = {
            search: {
                onChange: (0, timer_1.debounce)((e) => {
                    let qry = e.value === '' ? {} : { q: e.value };
                    this.search(qry);
                }, exports.TIME_SEARCH_DEBOUNCE)
            },
            table: {
                id: 'table',
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
                            onClick: (data) => this.runFuture(this.approveJob(data.id))
                        },
                        {
                            text: "Edit",
                            divider: false,
                            onClick: (data) => this.editJob(data)
                        },
                        {
                            text: "Remove",
                            divider: true,
                            onClick: (data) => this.runFuture(this.removeJob(data.id))
                        }
                    ])
                ]
            }
        };
        this.onError = (e) => {
            console.error(e);
            alert('An error has occurred! Details have been logged to the console.');
        };
    }
    /**
     * search for job postings that match the specified query criteria.
     *
     * The first time this method is called, results will populate and display
     * the view. Subsequent calls will only update the already displated table.
     */
    search(qry) {
        let that = this;
        return (0, future_1.doFuture)(function* () {
            let jobs = yield that.jobsModel.search(qry);
            that.values.table.data = jobs;
            let mtable = that.view.findById(that.values.table.id);
            if (mtable.isJust())
                mtable.get().update(jobs);
            return future_1.voidPure;
        });
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
            let path = (0, string_1.interpolate)(api.JOB, { id });
            let change = { status: jobStatus.JOB_STATUS_ACTIVE };
            let r = yield agent.patch(path, change);
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
        this.spawn(() => new edit_1.JobEditDialog(this.app, this.self(), job));
    }
    /**
     * removeJob permenantly removes a job from the site.
     */
    removeJob(id) {
        let that = this;
        return (0, future_1.doFuture)(function* () {
            let path = (0, string_1.interpolate)(api.JOB, { id });
            let r = yield agent.delete(path);
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
    /**
     * runFuture is used to execute async work wrapped in the Future type.
     */
    runFuture(ft) {
        ft.fork(this.onError, function_1.noop);
    }
    run() {
        let that = this;
        return (0, future_1.doFuture)(function* () {
            yield that.search({});
            console.error('show trime');
            that.show();
            return future_1.voidPure;
        });
    }
}
exports.JobsManager = JobsManager;
//# sourceMappingURL=index.js.map