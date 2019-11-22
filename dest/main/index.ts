import * as tendrilConnectionMongodb from '@quenk/tendril-connection-mongodb'; 
import * as tendrilShowNunjucks from '@quenk/tendril-show-nunjucks'; 
import * as express from 'express'; 
import * as tendrilMiddlewareMorgan from '@quenk/tendril-middleware-morgan'; 
import * as bodyParser from 'body-parser'; 
import * as tendrilSessionMongodb from '@quenk/tendril-session-mongodb'; 
import * as middleware from '@csa/session/lib/middleware'; 
import * as events from '../app/events'; 
import { showForm,showLoginForm,createEmployer } from './handlers';
import {Template} from '@quenk/tendril/lib/app/module/template';
import {Module} from '@quenk/tendril/lib/app/module';
import {App as App} from '@quenk/tendril/lib/app';



export const template = (_app:App) : Template<App> =>(
 {'create': 
//@ts-ignore: 6133 
(_app:App) => new Module(_app),
'id': `/`,
'server': {'port': (<string>process.env['PORT']),
'host': `0.0.0.0`},
'connections': { main: { connector: tendrilConnectionMongodb.connector,
options: [(<string>process.env['MONGO_URL']),{ useNewUrlParser: true }] } },
'app': {'views': { provider: tendrilShowNunjucks.show,
options: [{ path: `dest/main/views` }] },
'middleware': {'available': { public: { provider: express.static,
options: [`${__dirname}/../../public`,{ maxAge: 0 }] },
log: { provider: tendrilMiddlewareMorgan.log,
options: [(<string>process.env['MORGAN_LOG_FORMAT'])] },
json: { provider: bodyParser.json },
urlencoded: { provider: bodyParser.urlencoded },
<<<<<<< HEAD
frontend: { provider: express.static,
options: [`${__dirname}/../../packages/board-frontend/public`,{ maxAge: 0 }] },
=======
>>>>>>> 150600f633cffae97d9d4fe07c893a57ed67e3c8
session: { provider: tendrilSessionMongodb.session,
options: [{ session: { secret: (<string>process.env['SESSION_SECRET']),
key: `boardsesssioncookie`,
resave: false,
saveUninitialized: false },
store: { uri: (<string>process.env['MONGO_URL']) } }] },
rmExpired: { provider: middleware.removeExpired },
decTTL: { provider: middleware.decrementTTL } },
<<<<<<< HEAD
'enabled': [`log`,`public`,`frontend`,`session`,`rmExpired`,`decTTL`,`json`,`urlencoded`]},
=======
'enabled': [`log`,`public`,`session`,`rmExpired`,`decTTL`,`json`,`urlencoded`]},
>>>>>>> 150600f633cffae97d9d4fe07c893a57ed67e3c8
'on': {'connected': events.connected,
'started': events.started},
'routes': (_m:Module) => {

return [{ method: 'get',path: '/',filters: [showForm  ]}
,{ method: 'get',path: '/login',filters: [showLoginForm  ]}
,{ method: 'post',path: '/',filters: [createEmployer  ]}
]
}}})