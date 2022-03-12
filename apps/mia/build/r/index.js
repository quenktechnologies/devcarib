"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.template = exports.UsersController = exports.JobsController = exports.AdminsController = exports.BaseController = void 0;
//@ts-ignore: 6133
const module_1 = require("@quenk/tendril/lib/app/module");
const prs = require("@quenk/tendril/lib/app/api/storage/prs");
const session = require("@quenk/tendril/lib/app/api/storage/session");
const adminChecks = require("@mia/checks/lib/admin");
const usersChecks = require("@mia/checks/lib/user");
const type_1 = require("@quenk/noni/lib/data/type");
const regex_1 = require("@quenk/noni/lib/data/string/regex");
const future_1 = require("@quenk/noni/lib/control/monad/future");
const response_1 = require("@quenk/tendril/lib/app/api/response");
const api_1 = require("@quenk/tendril/lib/app/api");
const control_1 = require("@quenk/tendril/lib/app/api/control");
const dback_resource_mongodb_1 = require("@quenk/dback-resource-mongodb");
const admin_1 = require("@mia/models/lib/admin");
const job_1 = require("@mia/models/lib/job");
const user_1 = require("@mia/models/lib/user");
const job_2 = require("@mia/checks/lib/job");
const messages = {
    minLength: '{$key} must be {target} or more characters!',
    maxLength: '{$key} must be less than {target} characters!',
    notNull: '{$key} is required!'
};
/**
 * BaseController for admin routes.
 */
class BaseController extends dback_resource_mongodb_1.BaseResource {
    /**
     * before ensures the client has permission to access this api.
     */
    before(r) {
        return (0, api_1.doAction)(function* () {
            let madmin = yield session.get('admin');
            if (madmin.isNothing()) {
                yield (0, response_1.forbidden)();
                yield (0, control_1.abort)();
            }
            return (0, control_1.value)(r);
        });
    }
    /**
     * beforeCreate validates the request body before updating.
     */
    beforeCreate(r) {
        let that = this;
        return (0, api_1.doAction)(function* () {
            let eBody = yield (0, control_1.fork)(that.checkCreate(r.body));
            if (eBody.isLeft()) {
                let errors = eBody.takeLeft().explain(that.messages);
                yield (0, response_1.conflict)({ errors });
                yield (0, control_1.abort)();
            }
            else {
                r.body = yield (0, control_1.fork)(that.afterCreateChecked(eBody.takeRight()));
            }
            return (0, control_1.value)(r);
        });
    }
    /**
     * afterCreateChecked is a hook that allows the validated and check data
     * to be modified one last time before it used to create a new record.
     */
    afterCreateChecked(data) {
        return (0, future_1.pure)(data);
    }
    /**
     * beforeUpdate validates the request body before updating.
     */
    beforeUpdate(r) {
        let that = this;
        return (0, api_1.doAction)(function* () {
            let eBody = yield (0, control_1.fork)(that.checkUpdate(r.body));
            if (eBody.isLeft()) {
                let errors = eBody.takeLeft().explain(that.messages);
                yield (0, response_1.conflict)({ errors });
                yield (0, control_1.abort)();
            }
            r.body = eBody.takeRight();
            return (0, control_1.value)(r);
        });
    }
}
exports.BaseController = BaseController;
/**
 * AdminsController provides the handlers for the /admin/r/admins routes.
 */
class AdminsController extends BaseController {
    constructor() {
        super(...arguments);
        this.messages = messages;
        this.checkCreate = adminChecks.check;
        this.checkUpdate = adminChecks.checkPartial;
    }
    getModel(db) {
        return admin_1.AdminModel.getInstance(db);
    }
    ;
    beforeSearch(r) {
        return (0, api_1.doAction)(function* () {
            let qry = {};
            if ((0, type_1.isString)(r.query.q)) {
                let filter = { $regex: (0, regex_1.escape)(r.query.q), $options: 'i' };
                qry = { email: filter };
            }
            yield prs.set(`${dback_resource_mongodb_1.KEY_SEARCH_PARAMS}.query`, qry);
            return (0, control_1.value)(r);
        });
    }
}
exports.AdminsController = AdminsController;
/**
 * JobsController provides the handlers for the /admin/r/jobs routes.
 */
class JobsController extends BaseController {
    constructor() {
        super(...arguments);
        this.messages = messages;
        this.checkCreate = job_2.check;
        this.checkUpdate = job_2.checkPartial;
    }
    getModel(db) {
        return job_1.JobModel.getInstance(db);
    }
    beforeSearch(r) {
        return (0, api_1.doAction)(function* () {
            let qry = {};
            if ((0, type_1.isString)(r.query.q)) {
                let filter = { $regex: (0, regex_1.escape)(r.query.q), $options: 'i' };
                qry = { $or: [{ title: filter }, { company: filter }] };
            }
            yield prs.set(`${dback_resource_mongodb_1.KEY_SEARCH_PARAMS}.query`, qry);
            return (0, control_1.value)(r);
        });
    }
}
exports.JobsController = JobsController;
/**
 * UsersController for the users endpoint.
 */
class UsersController extends BaseController {
    constructor() {
        super(...arguments);
        this.messages = messages;
        this.checkCreate = usersChecks.check;
        this.checkUpdate = usersChecks.checkPartial;
    }
    getModel(db) {
        return user_1.UserModel.getInstance(db);
    }
    beforeSearch(r) {
        return (0, api_1.doAction)(function* () {
            let qry = {};
            if ((0, type_1.isString)(r.query.q)) {
                let filter = { $regex: (0, regex_1.escape)(r.query.q), $options: 'i' };
                qry = { username: filter };
            }
            yield prs.set(`${dback_resource_mongodb_1.KEY_SEARCH_PARAMS}.query`, qry);
            return (0, control_1.value)(r);
        });
    }
}
exports.UsersController = UsersController;
//@ts-ignore: 6133
const template = ($app) => ({ 'id': `r`,
    'app': { 'dirs': { 'self': `/apps/mia/build/r` },
        'routes': //@ts-ignore: 6133
        ($module) => {
            let $routes = [];
            let adminsCtrl = new AdminsController();
            let jobsCtrl = new JobsController();
            let usersCtrl = new UsersController();
            $routes.push({
                method: 'post',
                path: '/admins',
                filters: [adminsCtrl.create.bind(adminsCtrl)]
            });
            $routes.push({
                method: 'get',
                path: '/admins',
                filters: [adminsCtrl.search.bind(adminsCtrl)]
            });
            $routes.push({
                method: 'get',
                path: '/admins/:id',
                filters: [adminsCtrl.get.bind(adminsCtrl)]
            });
            $routes.push({
                method: 'patch',
                path: '/admins/:id',
                filters: [adminsCtrl.update.bind(adminsCtrl)]
            });
            $routes.push({
                method: 'delete',
                path: '/admins/:id',
                filters: [adminsCtrl.remove.bind(adminsCtrl)]
            });
            $routes.push({
                method: 'post',
                path: '/jobs',
                filters: [jobsCtrl.create.bind(jobsCtrl)]
            });
            $routes.push({
                method: 'get',
                path: '/jobs',
                filters: [jobsCtrl.search.bind(jobsCtrl)]
            });
            $routes.push({
                method: 'patch',
                path: '/jobs/:id',
                filters: [jobsCtrl.update.bind(jobsCtrl)]
            });
            $routes.push({
                method: 'get',
                path: '/jobs/:id',
                filters: [jobsCtrl.get.bind(jobsCtrl)]
            });
            $routes.push({
                method: 'delete',
                path: '/jobs/:id',
                filters: [jobsCtrl.remove.bind(jobsCtrl)]
            });
            $routes.push({
                method: 'post',
                path: '/users',
                filters: [usersCtrl.create.bind(usersCtrl)]
            });
            $routes.push({
                method: 'get',
                path: '/users',
                filters: [usersCtrl.search.bind(usersCtrl)]
            });
            $routes.push({
                method: 'patch',
                path: '/users/:id',
                filters: [usersCtrl.update.bind(usersCtrl)]
            });
            $routes.push({
                method: 'get',
                path: '/users/:id',
                filters: [usersCtrl.get.bind(usersCtrl)]
            });
            $routes.push({
                method: 'delete',
                path: '/users/:id',
                filters: [usersCtrl.remove.bind(usersCtrl)]
            });
            return $routes;
        } },
    'create': 
    //@ts-ignore: 6133 
    (s) => new module_1.Module(s) });
exports.template = template;
//# sourceMappingURL=index.js.map