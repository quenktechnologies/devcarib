"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.template = exports.board = exports.BoardController = exports.ERROR_AUTH_FAILED = void 0;
const dotR = require("./r");
//@ts-ignore: 6133
const module_1 = require("@quenk/tendril/lib/app/module");
const jobStatus = require("@devcarib/common/lib/data/job");
const collection_1 = require("@quenk/noni-mongodb/lib/database/collection");
const response_1 = require("@quenk/tendril/lib/app/api/response");
const control_1 = require("@quenk/tendril/lib/app/api/control");
const pool_1 = require("@quenk/tendril/lib/app/api/pool");
const actor_1 = require("@quenk/tendril/lib/app/api/control/actor");
const api_1 = require("@quenk/tendril/lib/app/api");
const tendril_show_wml_1 = require("@quenk/tendril-show-wml");
const server_1 = require("@devcarib/server/lib/actors/mail/server");
const job_1 = require("@board/checks/lib/job");
const _404_1 = require("./views/error/404");
const post_1 = require("./views/job/form/post");
const job_2 = require("./views/job");
const views_1 = require("./views");
exports.ERROR_AUTH_FAILED = 'Invalid Email or password! Try again.';
class BoardController {
    /**
     * showJobs currently approved.
     *
     * This only shows the most recent 50 jobs. In future we will refactor if
     * needed to show more.
     */
    onIndex(_) {
        return (0, api_1.doAction)(function* () {
            let db = yield getMain();
            let collection = db.collection('jobs');
            let qry = { status: jobStatus.JOB_STATUS_ACTIVE };
            let jobs = yield (0, control_1.fork)((0, collection_1.find)(collection, qry, { sort: { created_on: -1 }, limit: 50 }));
            return (0, tendril_show_wml_1.render)(new views_1.IndexView({ jobs }));
        });
    }
    /**
     * onPostJobPage displays the form for creating new jobs on a new
     * page.
     */
    onPostJobPage(_) {
        return (0, tendril_show_wml_1.render)(new post_1.PostJobFormView({}));
    }
    /**
     * onPostJob saves the submitted job data in the database for approval later.
     */
    onPostJob(r) {
        return (0, api_1.doAction)(function* () {
            let eResult = yield (0, control_1.fork)((0, job_1.check)(r.body));
            if (eResult.isRight()) {
                let data = eResult.takeRight();
                let db = yield getMain();
                let collection = db.collection('jobs');
                // XXX: This is important to prevent the user from being able to
                // set the status. In the future we should split out the
                // validation for job again.
                data.status = jobStatus.JOB_STATUS_NEW;
                data.created_on = new Date();
                yield (0, control_1.fork)((0, collection_1.insertOne)(collection, data));
                if (process.env.ADMIN_EMAIL)
                    yield (0, actor_1.tell)('/mail', new server_1.OutgoingMessage(process.env.ADMIN_EMAIL, 'New job', 'Someone jobed *a new job* to board!'));
                return (0, response_1.created)({ id: data.id });
            }
            else {
                return (0, response_1.conflict)({ errors: eResult.takeLeft().explain() });
            }
        });
    }
    /**
     * showJob displays a page for a single approved job.
     */
    onJob(r) {
        return (0, api_1.doAction)(function* () {
            let id = Number(r.params.id); //XXX: this could be done with a check.
            let db = yield getMain();
            let collection = db.collection('jobs');
            let qry = { id, status: jobStatus.JOB_STATUS_ACTIVE };
            let mResult = yield (0, control_1.fork)((0, collection_1.findOne)(collection, qry));
            if (mResult.isNothing()) {
                return (0, tendril_show_wml_1.render)(new _404_1.NotFoundErrorView({}), 404);
            }
            else {
                let job = mResult.get();
                return (0, tendril_show_wml_1.render)(new job_2.JobView({
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
    }
}
exports.BoardController = BoardController;
//retrieves the main connection from the tendril pool.
const getMain = () => (0, pool_1.checkout)('main');
exports.board = new BoardController();
//@ts-ignore: 6133
const template = ($app) => ({ 'id': `build`,
    'app': { 'dirs': { 'self': `/apps/board/build`,
            'public': [`../public`] },
        'path': `/jobs`,
        'modules': { 'r': dotR.template },
        'routes': //@ts-ignore: 6133
        ($module) => {
            let $routes = [];
            $routes.push({
                method: 'get',
                path: '/',
                filters: [exports.board.onIndex.bind(exports.board)], tags: {}
            });
            $routes.push({
                method: 'get',
                path: '/post',
                filters: [exports.board.onPostJobPage.bind(exports.board)], tags: {}
            });
            $routes.push({
                method: 'post',
                path: '/post',
                filters: [exports.board.onPostJob.bind(exports.board)], tags: {}
            });
            $routes.push({
                method: 'get',
                path: '/:id',
                filters: [exports.board.onJob.bind(exports.board)], tags: {}
            });
            return $routes;
        } },
    'create': 
    //@ts-ignore: 6133 
    (s) => new module_1.Module(s) });
exports.template = template;
//# sourceMappingURL=index.js.map