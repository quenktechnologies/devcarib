import * as dotHandlers from './handlers'; 
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



//@ts-ignore: 6133
export const template = ($app: App): Template => (
 {'id': `r`,
'app': {'dirs': {'self': `/build/app/admin/r`},
'routes': //@ts-ignore: 6133
($module:Module) => {

let $routes:$RouteConf[] = [];
let adminsCtrl = dotHandlers.adminsCtrl;
let jobCtrl = dotHandlers.jobCtrl;

$routes.push({
method:'post',
path:'/admins',
filters:[adminsCtrl.create.bind(adminsCtrl)]});

$routes.push({
method:'get',
path:'/admins',
filters:[adminsCtrl.search.bind(adminsCtrl)]});

$routes.push({
method:'get',
path:'/admins/:id',
filters:[adminsCtrl.get.bind(adminsCtrl)]});

$routes.push({
method:'patch',
path:'/admins/:id',
filters:[adminsCtrl.update.bind(adminsCtrl)]});

$routes.push({
method:'delete',
path:'/admins/:id',
filters:[adminsCtrl.remove.bind(adminsCtrl)]});

$routes.push({
method:'post',
path:'/jobs',
filters:[jobCtrl.create.bind(jobCtrl)]});

$routes.push({
method:'get',
path:'/jobs',
filters:[jobCtrl.search.bind(jobCtrl)]});

$routes.push({
method:'patch',
path:'/jobs/:id',
filters:[jobCtrl.update.bind(jobCtrl)]});

$routes.push({
method:'get',
path:'/jobs/:id',
filters:[jobCtrl.get.bind(jobCtrl)]});

$routes.push({
method:'delete',
path:'/jobs/:id',
filters:[jobCtrl.remove.bind(jobCtrl)]});
return $routes;
}},
'create': 
//@ts-ignore: 6133 
(s:System) => new Module(<App>s)})