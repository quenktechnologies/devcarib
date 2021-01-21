import * as dotR from './r'; 
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
 {'id': `admin`,
'app': {'dirs': {'self': `/build/app/admin`},
'modules': {'r': dotR.template},
'routes': //@ts-ignore: 6133
($module:Module) => {

let $routes:$RouteConf[] = [];
let adminCtl = dotHandlers.adminCtl;

$routes.push({
method:'get',
path:'/',
filters:[adminCtl.showIndex.bind(adminCtl)]});

$routes.push({
method:'get',
path:'/login',
filters:[adminCtl.showLoginForm.bind(adminCtl)]});

$routes.push({
method:'post',
path:'/login',
filters:[adminCtl.authenticate.bind(adminCtl)]});

$routes.push({
method:'post',
path:'/logout',
filters:[adminCtl.logout.bind(adminCtl)]});
return $routes;
}},
'create': 
//@ts-ignore: 6133 
(s:System) => new Module(<App>s)})