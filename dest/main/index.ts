import * as express from 'express'; 
import * as tendrilMiddlewareMorgan from '@quenk/tendril-middleware-morgan'; 
import * as bodyParser from 'body-parser'; 
import * as events from '../app/events'; 
import { index } from './handlers';
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
'app': {'middleware': {'available': { public: { provider: express.static,
options: [`${__dirname}/public`,{ maxAge: 0 }] },
log: { provider: tendrilMiddlewareMorgan.log,
options: [(<string>process.env['MORGAN_LOG_FORMAT'])] },
json: { provider: bodyParser.json },
urlencoded: { provider: bodyParser.urlencoded } },
'enabled': [`log`,`public`,`json`,`urlencoded`]},
'on': {'connected': events.connected,
'started': events.started},
'routes': (_m:Module) => {

return [{ method: 'get',path: '/',filters: [index  ]}
]
}}})