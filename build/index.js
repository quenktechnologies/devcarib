"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.template = void 0;
const quenkTendrilConnectionMongodb = require("@quenk/tendril-connection-mongodb");
const quenkTendrilSessionMongodb = require("@quenk/tendril-session-mongodb");
const quenkTendrilShowNunjucks = require("@quenk/tendril-show-nunjucks");
const dotFilters = require("./filters");
const dotdotAppsMiaBuild = require("../apps/mia/build");
const dotdotAppsConverseBuild = require("../apps/converse/build");
const dotServices = require("./services");
const dotTasks = require("./tasks");
const dotEvents = require("./events");
const dotSetup = require("./setup");
const dotHandlers = require("./handlers");
//@ts-ignore: 6133
const module_1 = require("@quenk/tendril/lib/app/module");
//@ts-ignore: 6133
const template = ($app) => ({ 'id': `/`,
    'app': { 'dirs': { 'self': `/build`,
            'public': [`public`, `../packages/board-views/public`, `../frontends/board-form-post/public`] },
        'session': { 'enable': true,
            'options': { 'secret': process.env['SESSION_SECRET'],
                'name': `bscid` },
            'store': { 'provider': quenkTendrilSessionMongodb.provider,
                'options': { 'uri': process.env['MONGO_URL'] } } },
        'csrf': { 'token': { 'enable': true,
                'send_cookie': true } },
        'views': { 'provider': quenkTendrilShowNunjucks.show,
            'options': [{ 'path': `packages/extras/board-views/views`,
                    'filters': { 'timestamp': dotFilters.timestamp,
                        'timefromnow': dotFilters.timefromnow } }] },
        'log': { 'enable': true,
            'format': process.env['LOG_FORMAT'] },
        'parsers': { 'body': { 'json': { 'enable': true } } },
        'middleware': { 'available': {},
            'enabled': [] },
        'modules': { 'mia': dotdotAppsMiaBuild.template,
            'converse': dotdotAppsConverseBuild.template },
        'on': { 'connected': [dotEvents.connected, dotSetup.run],
            'started': dotEvents.started },
        'routes': //@ts-ignore: 6133
        ($module) => {
            let $routes = [];
            $routes.push({
                method: 'get',
                path: '/',
                filters: [dotHandlers.showJobs], tags: {}
            });
            $routes.push({
                method: 'get',
                path: '/jobs/post',
                filters: [dotHandlers.showJobJobPage], tags: {}
            });
            $routes.push({
                method: 'post',
                path: '/jobs/post',
                filters: [dotHandlers.createJob], tags: {}
            });
            $routes.push({
                method: 'get',
                path: '/jobs/:id',
                filters: [dotHandlers.showJob], tags: {}
            });
            return $routes;
        } },
    'create': 
    //@ts-ignore: 6133 
    (s) => new module_1.Module(s),
    'server': { 'port': process.env['PORT'],
        'host': `0.0.0.0` },
    'connections': { 'main': { 'connector': quenkTendrilConnectionMongodb.connector,
            'options': [process.env['MONGO_URL'], { 'useNewUrlParser': true }] } },
    'children': { 'clock': dotServices.clock,
        'log': dotServices.log,
        'mail': dotServices.mail,
        'clearExpiredJobs': dotTasks.clearExpiredJobs } });
exports.template = template;
//# sourceMappingURL=index.js.map