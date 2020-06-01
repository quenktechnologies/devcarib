"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.template = void 0;
const tendrilConnectionMongodb = require("@quenk/tendril-connection-mongodb");
const tendrilShowNunjucks = require("@quenk/tendril-show-nunjucks");
const express = require("express");
const tendrilMiddlewareMorgan = require("@quenk/tendril-middleware-morgan");
const bodyParser = require("body-parser");
const tendrilSessionMongodb = require("@quenk/tendril-session-mongodb");
const middleware = require("@csa/session/lib/middleware");
const events = require("../app/events");
const handlers_1 = require("./handlers");
const module_1 = require("@quenk/tendril/lib/app/module");
exports.template = (_app) => ({ 'create': 
    //@ts-ignore: 6133 
    (_app) => new module_1.Module(_app), 'id': `/`, 'server': { 'port': process.env['PORT'], 'host': `0.0.0.0` },
    'connections': { main: { connector: tendrilConnectionMongodb.connector, options: [process.env['MONGO_URL'], { useNewUrlParser: true }] } },
    'app': { 'views': { provider: tendrilShowNunjucks.show,
            options: [{ path: `packages/local/board-views/views` }] }, 'middleware': { 'available': { public: { provider: express.static,
                    options: [`${__dirname}/../../public`, { maxAge: 0 }] },
                viewsPublic: { provider: express.static,
                    options: [`${__dirname}/../../packages/local/board-views/public`, { maxAge: 0 }] }, log: { provider: tendrilMiddlewareMorgan.log, options: [process.env['MORGAN_LOG_FORMAT']] }, json: { provider: bodyParser.json },
                urlencoded: { provider: bodyParser.urlencoded },
                frontend: { provider: express.static,
                    options: [`${__dirname}/../../packages/board-frontend/public`, { maxAge: 0 }] }, session: { provider: tendrilSessionMongodb.session, options: [{ session: { secret: process.env['SESSION_SECRET'], key: `boardsesssioncookie`,
                                resave: false,
                                saveUninitialized: false },
                            store: { uri: process.env['MONGO_URL'] } }] }, rmExpired: { provider: middleware.removeExpired },
                decTTL: { provider: middleware.decrementTTL } }, 'enabled': [`log`, `public`, `viewsPublic`, `frontend`, `session`, `rmExpired`, `decTTL`, `json`, `urlencoded`] }, 'on': { 'connected': events.connected,
            'started': events.started }, 'routes': (_m) => {
            return [{ method: 'get', path: '/', filters: [handlers_1.showJobs] },
                { method: 'get', path: '/register', filters: [handlers_1.showRegistrationForm] },
                { method: 'post', path: '/register', filters: [handlers_1.createEmployer] },
                { method: 'get', path: '/login', filters: [handlers_1.showLoginForm] },
                { method: 'post', path: '/login', filters: [handlers_1.login] },
                { method: 'get', path: '/logout', filters: [handlers_1.logout] },
                { method: 'get', path: '/dashboard', filters: [handlers_1.showDashboard] },
                { method: 'post', path: '/api/jobs', filters: [handlers_1.createJob] },
                { method: 'get', path: '/jobs/:id', filters: [handlers_1.showProfile] }
            ];
        } } });
//# sourceMappingURL=index.js.map