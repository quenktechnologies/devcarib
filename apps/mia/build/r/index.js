"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.template = exports.usersCtrl = exports.jobsCtrl = exports.adminsCtrl = void 0;
const devcaribServerLibFiltersCheck = require("@devcarib/server/lib/filters/check");
const miaChecks = require("@mia/checks");
const devcaribCommonLibError = require("@devcarib/common/lib/error");
const devcaribServerLibFiltersQuery = require("@devcarib/server/lib/filters/query");
const miaFilterPolicies = require("@mia/filter-policies");
const miaFields = require("@mia/fields");
//@ts-ignore: 6133
const module_1 = require("@quenk/tendril/lib/app/module");
const admin_1 = require("@mia/models/lib/admin");
const job_1 = require("@mia/models/lib/job");
const user_1 = require("@mia/models/lib/user");
const api_1 = require("@devcarib/server/lib/controllers/api");
exports.adminsCtrl = new api_1.ApiController(admin_1.AdminModel.getInstance);
exports.jobsCtrl = new api_1.ApiController(job_1.JobModel.getInstance);
exports.usersCtrl = new api_1.ApiController(user_1.UserModel.getInstance);
//@ts-ignore: 6133
const template = ($app) => ({ 'id': `r`,
    'app': { 'dirs': { 'self': `/apps/mia/build/r` },
        'filters': [devcaribServerLibFiltersCheck.checkBody(miaChecks.checksAvailable, miaChecks.partialChecksAvailable, devcaribCommonLibError.templates), devcaribServerLibFiltersQuery.compile({ 'policies': miaFilterPolicies.policiesEnabled,
                'fields': miaFields.fields })],
        'routes': //@ts-ignore: 6133
        ($module) => {
            let $routes = [];
            $routes.push({
                method: 'post',
                path: '/admins',
                filters: [exports.adminsCtrl.create.bind(exports.adminsCtrl)], tags: { model: `admin` }
            });
            $routes.push({
                method: 'get',
                path: '/admins',
                filters: [exports.adminsCtrl.search.bind(exports.adminsCtrl)], tags: { policy: `admin` }
            });
            $routes.push({
                method: 'get',
                path: '/admins/:id',
                filters: [exports.adminsCtrl.get.bind(exports.adminsCtrl)], tags: {}
            });
            $routes.push({
                method: 'patch',
                path: '/admins/:id',
                filters: [exports.adminsCtrl.update.bind(exports.adminsCtrl)], tags: { model: `admin` }
            });
            $routes.push({
                method: 'delete',
                path: '/admins/:id',
                filters: [exports.adminsCtrl.remove.bind(exports.adminsCtrl)], tags: {}
            });
            $routes.push({
                method: 'post',
                path: '/jobs',
                filters: [exports.jobsCtrl.create.bind(exports.jobsCtrl)], tags: { model: `job` }
            });
            $routes.push({
                method: 'get',
                path: '/jobs',
                filters: [exports.jobsCtrl.search.bind(exports.jobsCtrl)], tags: { policy: `job` }
            });
            $routes.push({
                method: 'patch',
                path: '/jobs/:id',
                filters: [exports.jobsCtrl.update.bind(exports.jobsCtrl)], tags: { model: `job` }
            });
            $routes.push({
                method: 'get',
                path: '/jobs/:id',
                filters: [exports.jobsCtrl.get.bind(exports.jobsCtrl)], tags: {}
            });
            $routes.push({
                method: 'delete',
                path: '/jobs/:id',
                filters: [exports.jobsCtrl.remove.bind(exports.jobsCtrl)], tags: {}
            });
            $routes.push({
                method: 'post',
                path: '/users',
                filters: [exports.usersCtrl.create.bind(exports.usersCtrl)], tags: { model: `user` }
            });
            $routes.push({
                method: 'get',
                path: '/users',
                filters: [exports.usersCtrl.search.bind(exports.usersCtrl)], tags: { policy: `user` }
            });
            $routes.push({
                method: 'patch',
                path: '/users/:id',
                filters: [exports.usersCtrl.update.bind(exports.usersCtrl)], tags: { model: `user` }
            });
            $routes.push({
                method: 'get',
                path: '/users/:id',
                filters: [exports.usersCtrl.get.bind(exports.usersCtrl)], tags: {}
            });
            $routes.push({
                method: 'delete',
                path: '/users/:id',
                filters: [exports.usersCtrl.remove.bind(exports.usersCtrl)], tags: {}
            });
            return $routes;
        } },
    'create': 
    //@ts-ignore: 6133 
    (s) => new module_1.Module(s) });
exports.template = template;
//# sourceMappingURL=index.js.map