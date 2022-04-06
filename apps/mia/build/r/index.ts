import * as devcaribServerLibFiltersCheck from '@devcarib/server/lib/filters/check'; 
import * as miaChecks from '@mia/checks'; 
import * as devcaribCommonLibError from '@devcarib/common/lib/error'; 
import * as devcaribServerLibFiltersQuery from '@devcarib/server/lib/filters/query'; 
import * as miaFilterPolicies from '@mia/filter-policies'; 
import * as miaFields from '@mia/fields'; 
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




/* @ts-ignore: 2300 */
import { Request } from '@quenk/tendril/lib/app/api/request';

import { AdminModel } from '@mia/models/lib/admin';
import { JobModel } from '@mia/models/lib/job';
import { UserModel } from '@mia/models/lib/user';

import {ApiController} from '@devcarib/server/lib/controllers/api';

 export const adminsCtrl = new ApiController(AdminModel.getInstance)
export const jobsCtrl = new ApiController(JobModel.getInstance)
export const usersCtrl = new ApiController(UserModel.getInstance)

//@ts-ignore: 6133
export const template = ($app: App): Template => (
 {'id': `r`,
'app': {'dirs': {'self': `/apps/mia/build/r`},
'filters': [devcaribServerLibFiltersCheck.checkBody(miaChecks.checksAvailable,miaChecks.partialChecksAvailable,devcaribCommonLibError.templates),devcaribServerLibFiltersQuery.compile({'policies': miaFilterPolicies.policiesEnabled,
'fields': miaFields.fields})],
'routes': //@ts-ignore: 6133
($module:Module) => {

let $routes:$RouteConf[] = [];

$routes.push({
method:'post',
path:'/admins',
filters:[adminsCtrl.create.bind(adminsCtrl)],tags:{model: `admin` }});

$routes.push({
method:'get',
path:'/admins',
filters:[adminsCtrl.search.bind(adminsCtrl)],tags:{policy: `admin` }});

$routes.push({
method:'get',
path:'/admins/:id',
filters:[adminsCtrl.get.bind(adminsCtrl)],tags:{}});

$routes.push({
method:'patch',
path:'/admins/:id',
filters:[adminsCtrl.update.bind(adminsCtrl)],tags:{model: `admin` }});

$routes.push({
method:'delete',
path:'/admins/:id',
filters:[adminsCtrl.remove.bind(adminsCtrl)],tags:{}});

$routes.push({
method:'post',
path:'/jobs',
filters:[jobsCtrl.create.bind(jobsCtrl)],tags:{model: `job` }});

$routes.push({
method:'get',
path:'/jobs',
filters:[jobsCtrl.search.bind(jobsCtrl)],tags:{policy: `job` }});

$routes.push({
method:'patch',
path:'/jobs/:id',
filters:[jobsCtrl.update.bind(jobsCtrl)],tags:{model: `job` }});

$routes.push({
method:'get',
path:'/jobs/:id',
filters:[jobsCtrl.get.bind(jobsCtrl)],tags:{}});

$routes.push({
method:'delete',
path:'/jobs/:id',
filters:[jobsCtrl.remove.bind(jobsCtrl)],tags:{}});

$routes.push({
method:'post',
path:'/users',
filters:[usersCtrl.create.bind(usersCtrl)],tags:{model: `user` }});

$routes.push({
method:'get',
path:'/users',
filters:[usersCtrl.search.bind(usersCtrl)],tags:{policy: `user` }});

$routes.push({
method:'patch',
path:'/users/:id',
filters:[usersCtrl.update.bind(usersCtrl)],tags:{model: `user` }});

$routes.push({
method:'get',
path:'/users/:id',
filters:[usersCtrl.get.bind(usersCtrl)],tags:{}});

$routes.push({
method:'delete',
path:'/users/:id',
filters:[usersCtrl.remove.bind(usersCtrl)],tags:{}});
return $routes;
}},
'create': 
//@ts-ignore: 6133 
(s:System) => new Module(<App>s)})
