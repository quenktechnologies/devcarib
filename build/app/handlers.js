"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showJob = exports.createJob = exports.showJobJobPage = exports.showJobs = exports.ERROR_AUTH_FAILED = void 0;
const jobStatus = require("@board/common/lib/data/job");
const collection_1 = require("@quenk/noni-mongodb/lib/database/collection");
const response_1 = require("@quenk/tendril/lib/app/api/response");
const control_1 = require("@quenk/tendril/lib/app/api/control");
const pool_1 = require("@quenk/tendril/lib/app/api/pool");
const actor_1 = require("@quenk/tendril/lib/app/api/control/actor");
const api_1 = require("@quenk/tendril/lib/app/api");
const tendril_show_wml_1 = require("@quenk/tendril-show-wml");
const job_1 = require("@board/checks/lib/job");
const _404_1 = require("@board/views/lib/error/404");
const job_form_1 = require("@board/views/lib/job-form");
const job_2 = require("@board/views/lib/job");
const views_1 = require("@board/views");
const server_1 = require("@board/server/lib/actors/mail/server");
exports.ERROR_AUTH_FAILED = 'Invalid Email or password! Try again.';
/**
 * showJobs currently approved.
 *
 * This only shows the most recent 50 jobs. In future we will refactor if
 * needed to show more.
 */
const showJobs = (_) => api_1.doAction(function* () {
    let db = yield getMain();
    let collection = db.collection('jobs');
    let qry = { status: jobStatus.JOB_STATUS_ACTIVE };
    let jobs = yield control_1.fork(collection_1.find(collection, qry, { sort: { created_on: -1 }, limit: 50 }));
    return tendril_show_wml_1.render(new views_1.IndexView({ jobs }));
});
exports.showJobs = showJobs;
/**
 * showJobJobPage displays the form for creating new jobs on a new
 * page.
 */
const showJobJobPage = (_) => tendril_show_wml_1.render(new job_form_1.JobFormView({}));
exports.showJobJobPage = showJobJobPage;
/**
 * createJob saves the submitted job data in the database for approval later.
 */
const createJob = (r) => api_1.doAction(function* () {
    let eResult = yield control_1.fork(job_1.check(r.body));
    if (eResult.isRight()) {
        let data = eResult.takeRight();
        let db = yield getMain();
        let collection = db.collection('jobs');
        // XXX: This is important to prevent the user from being able to
        // set the status. In the future we should split out the
        // validation for job again.
        data.status = jobStatus.JOB_STATUS_NEW;
        data.created_on = new Date();
        yield control_1.fork(collection_1.insertOne(collection, data));
        if (process.env.ADMIN_EMAIL)
            yield actor_1.tell('/mail', new server_1.OutgoingMessage(process.env.ADMIN_EMAIL, 'New job', 'Someone jobed *a new job* to board!'));
        return response_1.created({ id: data.id });
    }
    else {
        return response_1.conflict({ errors: eResult.takeLeft().explain() });
    }
});
exports.createJob = createJob;
/**
 * showJob displays a page for a single approved job.
 */
const showJob = (r) => api_1.doAction(function* () {
    let id = Number(r.params.id); //XXX: this could be done with a check.
    let db = yield getMain();
    let collection = db.collection('jobs');
    let qry = { id, status: jobStatus.JOB_STATUS_ACTIVE };
    let mResult = yield control_1.fork(collection_1.findOne(collection, qry));
    if (mResult.isNothing()) {
        return tendril_show_wml_1.render(new _404_1.NotFoundErrorView({}), 404);
    }
    else {
        let job = mResult.get();
        return tendril_show_wml_1.render(new job_2.JobView({
            job,
            // TODO: Move this to a library function
            meta: [
                {
                    property: 'og:site_name',
                    content: 'Caribbean Developers'
                },
                { property: 'og:type', content: 'article' },
                { property: 'og:image', content: "https://jobs.caribbeandevelopers.org/ogimg.png" },
                { property: 'og:title', content: job.title },
                { property: 'og:description', content: job.type }
            ]
        }));
    }
});
exports.showJob = showJob;
//retrieves the main connection from the tendril pool.
const getMain = () => pool_1.checkout('main');
//# sourceMappingURL=handlers.js.map