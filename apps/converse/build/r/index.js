"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.template = exports.invitesCtrl = exports.eventCtrl = exports.userCtrl = exports.commentsCtrl = exports.postsCtrl = exports.UserController = void 0;
const dotdot = require("..");
const devcaribServerLibFiltersCheck = require("@devcarib/server/lib/filters/check");
const converseChecks = require("@converse/checks");
const devcaribCommonLibError = require("@devcarib/common/lib/error");
const devcaribServerLibFiltersBody = require("@devcarib/server/lib/filters/body");
const devcaribServerLibFiltersAudit = require("@devcarib/server/lib/filters/audit");
const devcaribServerLibFiltersQuery = require("@devcarib/server/lib/filters/query");
const converseFilterPolicies = require("@converse/filter-policies");
const converseFields = require("@converse/fields");
//@ts-ignore: 6133
const _json = require("@quenk/noni/lib/data/jsonx");
//@ts-ignore: 6133
const module_1 = require("@quenk/tendril/lib/app/module");
const response_1 = require("@quenk/tendril/lib/app/api/response");
const api_1 = require("@devcarib/server/lib/controllers/api");
const post_1 = require("@converse/models/lib/post");
const comment_1 = require("@converse/models/lib/comment");
const event_1 = require("@converse/models/lib/event");
const invite_1 = require("@converse/models/lib/invite");
const user_1 = require("@converse/models/lib/user");
/**
 * UserController provides the API endpoint for the current user.
 */
class UserController extends api_1.ApiController {
    get(req) {
        let muser = req.session.get('user');
        if (muser.isNothing())
            return (0, response_1.notFound)();
        return (0, response_1.ok)({ data: muser.get() });
    }
    update(req) {
        let muser = req.session.get('user');
        if (muser.isNothing())
            return (0, response_1.notFound)();
        req.params.id = String(muser.get().id);
        return super.update(req);
    }
}
exports.UserController = UserController;
exports.postsCtrl = new api_1.ApiController(post_1.PostModel.getInstance);
exports.commentsCtrl = new api_1.ApiController(comment_1.CommentModel.getInstance);
exports.userCtrl = new UserController(user_1.UserModel.getInstance);
exports.eventCtrl = new api_1.ApiController(event_1.EventModel.getInstance);
exports.invitesCtrl = new api_1.ApiController(invite_1.InviteModel.getInstance);
//@ts-ignore: 6133
const template = ($app) => ({ 'id': `r`,
    'app': { 'dirs': { 'self': `/apps/converse/build/r` },
        'filters': [dotdot.ensureAuthXHR, devcaribServerLibFiltersCheck.checkBody(converseChecks.checksAvailable, converseChecks.partialChecksAvailable, devcaribCommonLibError.templates), devcaribServerLibFiltersBody.fromParams, devcaribServerLibFiltersAudit.ensureOwner, devcaribServerLibFiltersQuery.compile({ 'policies': converseFilterPolicies.policiesEnabled,
                'fields': converseFields.fields }), devcaribServerLibFiltersAudit.auditWrite(`user`)],
        'routes': //@ts-ignore: 6133
        ($module) => {
            let $routes = [];
            $routes.push({
                method: 'get',
                path: '/me',
                filters: [exports.userCtrl.get.bind(exports.userCtrl)], tags: {}
            });
            $routes.push({
                method: 'patch',
                path: '/me',
                filters: [exports.userCtrl.update.bind(exports.userCtrl)], tags: { model: `user` }
            });
            $routes.push({
                method: 'post',
                path: '/posts',
                filters: [exports.postsCtrl.create.bind(exports.postsCtrl)], tags: { model: `post` }
            });
            $routes.push({
                method: 'get',
                path: '/posts',
                filters: [exports.postsCtrl.search.bind(exports.postsCtrl)], tags: { search: `post` }
            });
            $routes.push({
                method: 'get',
                path: '/posts/:id',
                filters: [
                    ($request) => {
                        // @ts-ignore: 6133
                        let $params = $request.params || {};
                        // @ts-ignore: 6133
                        let $query = $request.query || {};
                        //@ts-ignore: 6133
                        let $body = _json.Value = $request.body;
                        return exports.postsCtrl.increment.apply(exports.postsCtrl, [$request, `web-views`]);
                    }, exports.postsCtrl.get.bind(exports.postsCtrl)
                ], tags: { get: `post` }
            });
            $routes.push({
                method: 'patch',
                path: '/posts/:id',
                filters: [exports.postsCtrl.update.bind(exports.postsCtrl)], tags: { model: `post`,
                    owned: true }
            });
            $routes.push({
                method: 'delete',
                path: '/posts/:id',
                filters: [exports.postsCtrl.remove.bind(exports.postsCtrl)], tags: { model: `post`,
                    owned: true }
            });
            $routes.push({
                method: 'post',
                path: '/posts/:post/comments',
                filters: [exports.commentsCtrl.create.bind(exports.commentsCtrl)], tags: { model: `comment`,
                    nparams: `post` }
            });
            $routes.push({
                method: 'get',
                path: '/posts/:post/comments',
                filters: [exports.commentsCtrl.search.bind(exports.commentsCtrl)], tags: { search: `comment`,
                    query: `post:{params.post}` }
            });
            $routes.push({
                method: 'post',
                path: '/posts/:post/comments',
                filters: [exports.commentsCtrl.create.bind(exports.commentsCtrl)], tags: { model: `comment`,
                    params: `post` }
            });
            $routes.push({
                method: 'patch',
                path: '/comments/:id',
                filters: [exports.commentsCtrl.update.bind(exports.commentsCtrl)], tags: { model: `comment`,
                    owned: true }
            });
            $routes.push({
                method: 'get',
                path: '/events',
                filters: [exports.eventCtrl.search.bind(exports.eventCtrl)], tags: { search: `event` }
            });
            $routes.push({
                method: 'post',
                path: '/invites',
                filters: [exports.invitesCtrl.create.bind(exports.invitesCtrl)], tags: { model: `invite` }
            });
            return $routes;
        } },
    'create': 
    //@ts-ignore: 6133 
    (s) => new module_1.Module(s) });
exports.template = template;
//# sourceMappingURL=index.js.map