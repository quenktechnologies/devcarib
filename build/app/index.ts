import * as quenkTendrilConnectionMongodb from '@quenk/tendril-connection-mongodb'; 
import * as quenkTendrilSessionMongodb from '@quenk/tendril-session-mongodb'; 
import * as quenkTendrilShowNunjucks from '@quenk/tendril-show-nunjucks'; 
import * as dotdotFilters from '../filters'; 
import * as dotAdmin from './admin'; 
import * as dotdotServices from '../services'; 
import * as dotdotTasks from '../tasks'; 
import * as dotdotEvents from '../events'; 
import * as dotdotSetup from '../setup'; 
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
'app': {'dirs': {'self': `/build/app`,
'public': [`public`,`../../packages/libs/board-views/public`,`../../packages/frontends/board-form-post/public`,`../../packages/frontends/board-admin/public`]},
'session': {'enable': true,
'options': {'secret': (<string>process.env['SESSION_SECRET']),
'name': `bscid`},
'store': {'provider': quenkTendrilSessionMongodb.provider,
'options': {'uri': (<string>process.env['MONGO_URL'])}}},
'csrf': {'token': {'enable': true,
'send_cookie': true}},
'views': {'provider': quenkTendrilShowNunjucks.show,
'options': [{'path': `packages/extras/board-views/views`,
'filters': {'timestamp': dotdotFilters.timestamp,
'timefromnow': dotdotFilters.timefromnow}}]},
'log': {'enable': true,
'format': (<string>process.env['LOG_FORMAT'])},
'parsers': {'body': {'json': {'enable': true}}},
'middleware': {'available': {},
'enabled': []},
'modules': {'admin': dotAdmin.template},
'on': {'connected': [dotdotEvents.connected,dotdotSetup.run],
'started': dotdotEvents.started},
'routes': //@ts-ignore: 6133
($module:Module) => {

let $routes:$RouteConf[] = [];

$routes.push({
method:'get',
path:'/',
filters:[dotHandlers.showPosts]});

$routes.push({
method:'get',
path:'/post',
filters:[dotHandlers.showPostJobPage]});

$routes.push({
method:'post',
path:'/post',
filters:[dotHandlers.createPost]});

$routes.push({
method:'get',
path:'/posts/:id',
filters:[dotHandlers.showPost]});
return $routes;
}},
'create': 
//@ts-ignore: 6133 
(s:System) => new Module(<App>s),
'server': {'port': (<string>process.env['PORT']),
'host': `0.0.0.0`},
'connections': {'main': {'connector': quenkTendrilConnectionMongodb.connector,
'options': [(<string>process.env['MONGO_URL']),{'useNewUrlParser': true}]}},
'children': {'clock': dotdotServices.clock,
'log': dotdotServices.log,
'mail': dotdotServices.mail,
'clearExpiredJobs': dotdotTasks.clearExpiredJobs}})