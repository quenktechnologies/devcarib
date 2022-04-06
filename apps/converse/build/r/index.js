"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.template = exports.postsCtrl = void 0;
const dotdot = require("..");
const devcaribServerLibFiltersCheck = require("@devcarib/server/lib/filters/check");
const converseChecks = require("@converse/checks");
const devcaribCommonLibError = require("@devcarib/common/lib/error");
const devcaribServerLibFiltersQuery = require("@devcarib/server/lib/filters/query");
const converseFilterPolicies = require("@converse/filter-policies");
const converseFields = require("@converse/fields");
const devcaribServerLibFiltersAudit = require("@devcarib/server/lib/filters/audit");
//@ts-ignore: 6133
const module_1 = require("@quenk/tendril/lib/app/module");
const api_1 = require("@devcarib/server/lib/controllers/api");
const post_1 = require("@converse/models/lib/post");
exports.postsCtrl = new api_1.ApiController(post_1.PostModel.getInstance);
//@ts-ignore: 6133
const template = ($app) => ({ 'id': `r`,
    'app': { 'dirs': { 'self': `/apps/converse/build/r` },
        'filters': [dotdot.checkAuth(true), devcaribServerLibFiltersCheck.checkBody(converseChecks.checksAvailable, converseChecks.partialChecksAvailable, devcaribCommonLibError.templates), devcaribServerLibFiltersQuery.compile({ 'policies': converseFilterPolicies.policiesEnabled,
                'fields': converseFields.fields }), devcaribServerLibFiltersAudit.auditWrite(`user`)],
        'routes': //@ts-ignore: 6133
        ($module) => {
            let $routes = [];
            $routes.push({
                method: 'post',
                path: '/posts',
                filters: [exports.postsCtrl.create.bind(exports.postsCtrl)], tags: { model: `post` }
            });
            $routes.push({
                method: 'get',
                path: '/posts',
                filters: [exports.postsCtrl.search.bind(exports.postsCtrl)], tags: { policy: `post` }
            });
            $routes.push({
                method: 'get',
                path: '/posts/:id',
                filters: [exports.postsCtrl.get.bind(exports.postsCtrl)], tags: {}
            });
            $routes.push({
                method: 'patch',
                path: '/posts/:id',
                filters: [exports.postsCtrl.update.bind(exports.postsCtrl)], tags: { model: `post` }
            });
            $routes.push({
                method: 'delete',
                path: '/posts/:id',
                filters: [exports.postsCtrl.remove.bind(exports.postsCtrl)], tags: {}
            });
            return $routes;
        } },
    'create': 
    //@ts-ignore: 6133 
    (s) => new module_1.Module(s) });
exports.template = template;
//# sourceMappingURL=index.js.map