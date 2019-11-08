"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tendrilConnectionMongodb = require("@quenk/tendril-connection-mongodb");
const tendrilShowNunjucks = require("@quenk/tendril-show-nunjucks");
const express = require("express");
const tendrilMiddlewareMorgan = require("@quenk/tendril-middleware-morgan");
const bodyParser = require("body-parser");
const events = require("../app/events");
const handlers_1 = require("./handlers");
const module_1 = require("@quenk/tendril/lib/app/module");
exports.template = (_app) => ({ 'create': 
    //@ts-ignore: 6133 
    (_app) => new module_1.Module(_app),
    'id': `/`,
    'server': { 'port': process.env['PORT'],
        'host': `0.0.0.0` },
    'connections': { main: { connector: tendrilConnectionMongodb.connector,
            options: [process.env['MONGO_URL'], { useNewUrlParser: true }] } },
    'app': { 'views': { provider: tendrilShowNunjucks.show,
            options: [{ path: `dest/main/views` }] },
        'middleware': { 'available': { public: { provider: express.static,
                    options: [`${__dirname}/../../public`, { maxAge: 0 }] },
                log: { provider: tendrilMiddlewareMorgan.log,
                    options: [process.env['MORGAN_LOG_FORMAT']] },
                json: { provider: bodyParser.json },
                urlencoded: { provider: bodyParser.urlencoded } },
            'enabled': [`log`, `public`, `json`, `urlencoded`] },
        'on': { 'connected': events.connected,
            'started': events.started },
        'routes': (_m) => {
            return [{ method: 'get', path: '/', filters: [handlers_1.showForm] },
                { method: 'post', path: '/', filters: [handlers_1.createEmployer] }
            ];
        } } });
//# sourceMappingURL=index.js.map