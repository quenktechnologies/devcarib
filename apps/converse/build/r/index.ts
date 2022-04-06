import * as dotdot from '..'; 
import * as devcaribServerLibFiltersCheck from '@devcarib/server/lib/filters/check'; 
import * as converseChecks from '@converse/checks'; 
import * as devcaribCommonLibError from '@devcarib/common/lib/error'; 
import * as devcaribServerLibFiltersQuery from '@devcarib/server/lib/filters/query'; 
import * as converseFilterPolicies from '@converse/filter-policies'; 
import * as converseFields from '@converse/fields'; 
import * as devcaribServerLibFiltersAudit from '@devcarib/server/lib/filters/audit'; 
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



import { ApiController } from '@devcarib/server/lib/controllers/api';

import { PostModel } from '@converse/models/lib/post';

export const postsCtrl = new ApiController(PostModel.getInstance);
//@ts-ignore: 6133
export const template = ($app: App): Template => (
 {'id': `r`,
'app': {'dirs': {'self': `/apps/converse/build/r`},
'filters': [dotdot.checkAuth(true),devcaribServerLibFiltersCheck.checkBody(converseChecks.checksAvailable,converseChecks.partialChecksAvailable,devcaribCommonLibError.templates),devcaribServerLibFiltersQuery.compile({'policies': converseFilterPolicies.policiesEnabled,
'fields': converseFields.fields}),devcaribServerLibFiltersAudit.auditWrite(`user`)],
'routes': //@ts-ignore: 6133
($module:Module) => {

let $routes:$RouteConf[] = [];

$routes.push({
method:'post',
path:'/posts',
filters:[postsCtrl.create.bind(postsCtrl)],tags:{model: `post` }});

$routes.push({
method:'get',
path:'/posts',
filters:[postsCtrl.search.bind(postsCtrl)],tags:{policy: `post` }});

$routes.push({
method:'get',
path:'/posts/:id',
filters:[postsCtrl.get.bind(postsCtrl)],tags:{}});

$routes.push({
method:'patch',
path:'/posts/:id',
filters:[postsCtrl.update.bind(postsCtrl)],tags:{model: `post` }});

$routes.push({
method:'delete',
path:'/posts/:id',
filters:[postsCtrl.remove.bind(postsCtrl)],tags:{}});
return $routes;
}},
'create': 
//@ts-ignore: 6133 
(s:System) => new Module(<App>s)})
