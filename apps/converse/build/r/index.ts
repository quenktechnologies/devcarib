import * as dotdot from '..'; 
import * as devcaribServerLibFiltersCheck from '@devcarib/server/lib/filters/check'; 
import * as converseChecks from '@converse/checks'; 
import * as devcaribCommonLibError from '@devcarib/common/lib/error'; 
import * as devcaribServerLibFiltersBody from '@devcarib/server/lib/filters/body'; 
import * as devcaribServerLibFiltersAudit from '@devcarib/server/lib/filters/audit'; 
import * as devcaribServerLibFiltersQuery from '@devcarib/server/lib/filters/query'; 
import * as converseFilterPolicies from '@converse/filter-policies'; 
import * as converseFields from '@converse/fields'; 
//@ts-ignore: 6133
import {System} from '@quenk/potoo/lib/actor/system';
//@ts-ignore: 6133
import * as _json from '@quenk/noni/lib/data/jsonx';
//@ts-ignore: 6133
import {Template} from '@quenk/tendril/lib/app/module/template';
//@ts-ignore: 6133
import {Module} from '@quenk/tendril/lib/app/module';
//@ts-ignore: 6133
import {Request} from '@quenk/tendril/lib/app/api/request;'
//@ts-ignore: 6133
import {RouteConf as $RouteConf} from '@quenk/tendril/lib/app/module';
import {App as App} from '@quenk/tendril/lib/app';




// @ts-ignore: 2300
import { Request } from '@quenk/tendril/lib/app/api/request';
import { notFound, ok } from '@quenk/tendril/lib/app/api/response';
import { Action } from '@quenk/tendril/lib/app/api';

import { ApiController } from '@devcarib/server/lib/controllers/api';

import { PostModel } from '@converse/models/lib/post';
import { CommentModel } from '@converse/models/lib/comment';
import { EventModel } from '@converse/models/lib/event';

/**
 * UserController provides the api endpoint for the current user.
 */
export class UserController {

    get(req: Request): Action<void> {

        let muser = req.session.get('user');

        if (muser.isNothing()) return notFound();

        return ok({ data: muser.get() });

    }

}

export const postsCtrl = new ApiController(PostModel.getInstance);

export const commentsCtrl = new ApiController(CommentModel.getInstance);

export const userCtrl = new UserController();

export const eventCtrl = new ApiController(EventModel.getInstance);

//@ts-ignore: 6133
export const template = ($app: App): Template => (
 {'id': `r`,
'app': {'dirs': {'self': `/apps/converse/build/r`},
'filters': [dotdot.checkAuth(true),devcaribServerLibFiltersCheck.checkBody(converseChecks.checksAvailable,converseChecks.partialChecksAvailable,devcaribCommonLibError.templates),devcaribServerLibFiltersBody.fromParams,devcaribServerLibFiltersAudit.ensureOwner,devcaribServerLibFiltersQuery.compile({'policies': converseFilterPolicies.policiesEnabled,
'fields': converseFields.fields}),devcaribServerLibFiltersAudit.auditWrite(`user`)],
'routes': //@ts-ignore: 6133
($module:Module) => {

let $routes:$RouteConf[] = [];

$routes.push({
method:'get',
path:'/me',
filters:[userCtrl.get.bind(userCtrl)],tags:{}});

$routes.push({
method:'post',
path:'/posts',
filters:[postsCtrl.create.bind(postsCtrl)],tags:{model: `post` }});

$routes.push({
method:'get',
path:'/posts',
filters:[postsCtrl.search.bind(postsCtrl)],tags:{search: `post` }});

$routes.push({
method:'get',
path:'/posts/:id',
filters:[postsCtrl.get.bind(postsCtrl)],tags:{get: `post` }});

$routes.push({
method:'patch',
path:'/posts/:id',
filters:[postsCtrl.update.bind(postsCtrl)],tags:{model: `post` ,
owned: true }});

$routes.push({
method:'delete',
path:'/posts/:id',
filters:[postsCtrl.remove.bind(postsCtrl)],tags:{model: `post` ,
owned: true }});

$routes.push({
method:'post',
path:'/posts/:post/comments',
filters:[commentsCtrl.create.bind(commentsCtrl)],tags:{model: `comment` ,
nparams: `post` }});

$routes.push({
method:'get',
path:'/posts/:post/comments',
filters:[commentsCtrl.search.bind(commentsCtrl)],tags:{search: `comment` ,
query: `post:{params.post}` }});

$routes.push({
method:'patch',
path:'/comments/:id',
filters:[commentsCtrl.update.bind(commentsCtrl)],tags:{model: `comment` ,
owned: true }});

$routes.push({
method:'get',
path:'/events',
filters:[eventCtrl.search.bind(eventCtrl)],tags:{search: `event` }});
return $routes;
}},
'create': 
//@ts-ignore: 6133 
(s:System) => new Module(<App>s)})
