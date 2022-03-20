import * as quenkTendrilConnectionMongodb from '@quenk/tendril-connection-mongodb'; 
import * as quenkTendrilSessionMongodb from '@quenk/tendril-session-mongodb'; 
import * as quenkTendrilShowNunjucks from '@quenk/tendril-show-nunjucks'; 
import * as dotFilters from './filters'; 
import * as dotdotAppsMiaBuild from '../apps/mia/build'; 
import * as dotdotAppsConverseBuild from '../apps/converse/build'; 
import * as dotServices from './services'; 
import * as dotTasks from './tasks'; 
import * as dotEvents from './events'; 
import * as dotSetup from './setup'; 
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
 {'id': `/`,
'app': {'dirs': {'self': `/build`,
'public': [`public`,`../packages/board-views/public`,`../frontends/board-form-post/public`]},
'session': {'enable': true,
'options': {'secret': (<string>process.env['SESSION_SECRET']),
'name': `bscid`},
'store': {'provider': quenkTendrilSessionMongodb.provider,
'options': {'uri': (<string>process.env['MONGO_URL'])}}},
'csrf': {'token': {'enable': true,
'send_cookie': true}},
'views': {'provider': quenkTendrilShowNunjucks.show,
'options': [{'path': `packages/extras/board-views/views`,
'filters': {'timestamp': dotFilters.timestamp,
'timefromnow': dotFilters.timefromnow}}]},
'log': {'enable': true,
'format': (<string>process.env['LOG_FORMAT'])},
'parsers': {'body': {'json': {'enable': true}}},
'middleware': {'available': {},
'enabled': []},
'modules': {'mia': dotdotAppsMiaBuild.template,
'converse': dotdotAppsConverseBuild.template},
'on': {'connected': [dotEvents.connected,dotSetup.run],
'started': dotEvents.started},
'routes': //@ts-ignore: 6133
($module:Module) => {

let $routes:$RouteConf[] = [];

$routes.push({
method:'get',
path:'/',
filters:[dotHandlers.showJobs]});

$routes.push({
method:'get',
path:'/jobs/post',
filters:[dotHandlers.showJobJobPage]});

$routes.push({
method:'post',
path:'/jobs/post',
filters:[dotHandlers.createJob]});

$routes.push({
method:'get',
path:'/jobs/:id',
filters:[dotHandlers.showJob]});
return $routes;
}},
'create': 
//@ts-ignore: 6133 
(s:System) => new Module(<App>s),
'server': {'port': (<string>process.env['PORT']),
'host': `0.0.0.0`},
'connections': {'main': {'connector': quenkTendrilConnectionMongodb.connector,
'options': [(<string>process.env['MONGO_URL']),{'useNewUrlParser': true}]}},
'children': {'clock': dotServices.clock,
'log': dotServices.log,
'mail': dotServices.mail,
'clearExpiredJobs': dotTasks.clearExpiredJobs}})