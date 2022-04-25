"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.template = exports.jobsCtrl = void 0;
const dotdotDotdotDotdotConverseBuild = require("../../../converse/build");
const devcaribServerLibFiltersCheck = require("@devcarib/server/lib/filters/check");
const boardChecks = require("@board/checks");
const devcaribCommonLibError = require("@devcarib/common/lib/error");
const devcaribServerLibFiltersBody = require("@devcarib/server/lib/filters/body");
const devcaribServerLibFiltersAudit = require("@devcarib/server/lib/filters/audit");
const devcaribServerLibFiltersQuery = require("@devcarib/server/lib/filters/query");
const boardFilterPolicies = require("@board/filter-policies");
const boardFields = require("@board/fields");
//@ts-ignore: 6133
const module_1 = require("@quenk/tendril/lib/app/module");
const api_1 = require("@devcarib/server/lib/controllers/api");
const job_1 = require("@board/models/lib/job");
exports.jobsCtrl = new api_1.ApiController(job_1.JobModel.getInstance);
//@ts-ignore: 6133
const template = ($app) => ({ 'id': `r`,
    'app': { 'dirs': { 'self': `/apps/board/build/r` },
        'filters': [dotdotDotdotDotdotConverseBuild.checkAuth(true), devcaribServerLibFiltersCheck.checkBody(boardChecks.checksAvailable, boardChecks.partialChecksAvailable, devcaribCommonLibError.templates), devcaribServerLibFiltersBody.fromParams, devcaribServerLibFiltersAudit.ensureOwner, devcaribServerLibFiltersQuery.compile({ 'policies': boardFilterPolicies.policiesEnabled,
                'fields': boardFields.fields }), devcaribServerLibFiltersAudit.auditWrite(`user`)],
        'routes': //@ts-ignore: 6133
        ($module) => {
            let $routes = [];
            $routes.push({
                method: 'get',
                path: '/jobs',
                filters: [exports.jobsCtrl.search.bind(exports.jobsCtrl)], tags: { search: `job` }
            });
            return $routes;
        } },
    'create': 
    //@ts-ignore: 6133 
    (s) => new module_1.Module(s) });
exports.template = template;
//# sourceMappingURL=index.js.map