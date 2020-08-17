import * as tendrilConnectionMongodb from '@quenk/tendril-connection-mongodb'; 
import * as tendrilSessionMongodb from '@quenk/tendril-session-mongodb'; 
import * as tendrilShowNunjucks from '@quenk/tendril-show-nunjucks'; 
import * as admin from './admin'; 
import * as events from '../events'; 
import * as setup from '../setup'; 
import { showPosts,showPost,showPostJobPage,createPost } from './handlers';
import {Template} from '@quenk/tendril/lib/app/module/template';
import {Module} from '@quenk/tendril/lib/app/module';
import {App as App} from '@quenk/tendril/lib/app';



export const template = (_app:App) : Template<App> =>(
 {'id': `/`,
'app': {'dirs': {'self': `/home/master/Code/development/products/board/build/app`,
'public': [`public`,`../../packages/extras/board-views/public`,`../../packages/apps/board-form-post/public`,`../../packages/apps/board-admin/public`]},
'session': {'enable': true,
'options': {'secret': (<string>process.env['SESSION_SECRET']),
'name': `bscid`},
'store': {'provider': tendrilSessionMongodb.provider,
'options': {'uri': (<string>process.env['MONGO_URL'])}}},
'views': {'provider': tendrilShowNunjucks.show,
'options': [{'path': `packages/extras/board-views/views`}]},
'log': {'enable': true,
'format': (<string>process.env['LOG_FORMAT'])},
'parsers': {'body': {'json': {'enable': true}}},
'middleware': {'available': {},
'enabled': []},
'modules': {'admin': admin.template},
'on': {'connected': [events.connected,setup.run],
'started': events.started},
'routes': (_m:Module) => {

return [{ method: 'get',path: '/',filters: [showPosts  ]}
,{ method: 'get',path: '/post',filters: [showPostJobPage  ]}
,{ method: 'post',path: '/post',filters: [createPost  ]}
,{ method: 'get',path: '/posts/:id',filters: [showPost  ]}
]
}},
'create': 
//@ts-ignore: 6133 
(_app:App) => new Module(_app),
'server': {'port': (<string>process.env['PORT']),
'host': `0.0.0.0`},
'connections': {'main': {'connector': tendrilConnectionMongodb.connector,
'options': [(<string>process.env['MONGO_URL']),{'useNewUrlParser': true}]}}})