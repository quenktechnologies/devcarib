"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.template = void 0;
const quenkTendrilConnectionMongodb = require("@quenk/tendril-connection-mongodb");
const quenkTendrilSessionMongodb = require("@quenk/tendril-session-mongodb");
const quenkTendrilShowNunjucks = require("@quenk/tendril-show-nunjucks");
const dotdotFilters = require("../filters");
const dotAdmin = require("./admin");
const dotdotEvents = require("../events");
const dotdotSetup = require("../setup");
const dotHandlers = require("./handlers");
//@ts-ignore: 6133
const module_1 = require("@quenk/tendril/lib/app/module");
//@ts-ignore: 6133
exports.template = ($app) => ({ 'id': `/`, 'app': { 'dirs': { 'self': `/build/app`,
            'public': [`public`, `../../packages/extras/board-views/public`, `../../packages/frontend/board-form-post/public`, `../../packages/frontend/board-admin/public`] }, 'session': { 'enable': true, 'options': { 'secret': process.env['SESSION_SECRET'], 'name': `bscid` },
            'store': { 'provider': quenkTendrilSessionMongodb.provider, 'options': { 'uri': process.env['MONGO_URL'] } } }, 'csrf': { 'token': { 'enable': true,
                'send_cookie': true } },
        'views': { 'provider': quenkTendrilShowNunjucks.show,
            'options': [{ 'path': `packages/extras/board-views/views`,
                    'filters': { 'timestamp': dotdotFilters.timestamp,
                        'timefromnow': dotdotFilters.timefromnow } }] }, 'log': { 'enable': true, 'format': process.env['LOG_FORMAT'] }, 'parsers': { 'body': { 'json': { 'enable': true } } },
        'middleware': { 'available': {},
            'enabled': [] },
        'modules': { 'admin': dotAdmin.template },
        'on': { 'connected': [dotdotEvents.connected, dotdotSetup.run],
            'started': dotdotEvents.started }, 'routes': //@ts-ignore: 6133
        ($module) => {
            let $routes = [];
            $routes.push({
                method: 'get',
                path: '/',
                filters: [dotHandlers.showPosts]
            });
            $routes.push({
                method: 'get',
                path: '/post',
                filters: [dotHandlers.showPostJobPage]
            });
            $routes.push({
                method: 'post',
                path: '/post',
                filters: [dotHandlers.createPost]
            });
            $routes.push({
                method: 'get',
                path: '/posts/:id',
                filters: [dotHandlers.showPost]
            });
            return $routes;
        } },
    'create': 
    //@ts-ignore: 6133 
    (s) => new module_1.Module(s),
    'server': { 'port': process.env['PORT'], 'host': `0.0.0.0` },
    'connections': { 'main': { 'connector': quenkTendrilConnectionMongodb.connector, 'options': [process.env['MONGO_URL'], { 'useNewUrlParser': true }] } } });
//# sourceMappingURL=index.js.map