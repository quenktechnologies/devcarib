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
 {'id': `build`,
'app': {'dirs': {'self': `/apps/board/build`},
'modules': {'r': dotR.template},
'routes': //@ts-ignore: 6133
($module:Module) => {

let $routes:$RouteConf[] = [];

$routes.push({
method:'get',
path:'/',
filters:[dotHandlers.showJobs],tags:{}});

$routes.push({
method:'get',
path:'/jobs/post',
filters:[dotHandlers.showJobJobPage],tags:{}});

$routes.push({
method:'post',
path:'/jobs/post',
filters:[dotHandlers.createJob],tags:{}});

$routes.push({
method:'get',
path:'/jobs/:id',
filters:[dotHandlers.showJob],tags:{}});
return $routes;
}},
'create': 
//@ts-ignore: 6133 
(s:System) => new Module(<App>s)})