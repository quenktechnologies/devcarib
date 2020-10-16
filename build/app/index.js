"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.template = void 0;
const tendrilConnectionMongodb = require("@quenk/tendril-connection-mongodb");
const tendrilSessionMongodb = require("@quenk/tendril-session-mongodb");
const tendrilShowNunjucks = require("@quenk/tendril-show-nunjucks");
const admin = require("./admin");
const events = require("../events");
const setup = require("../setup");
const handlers_1 = require("./handlers");
const module_1 = require("@quenk/tendril/lib/app/module");
exports.template = (_app) => ({ 'id': `/`, 'app': { 'dirs': { 'self': `/Users/genora/board/build/app`,
            'public': [`public`, `../../packages/extras/board-views/public`, `../../packages/apps/board-form-post/public`, `../../packages/apps/board-admin/public`] }, 'session': { 'enable': true, 'options': { 'secret': process.env['SESSION_SECRET'], 'name': `bscid` },
            'store': { 'provider': tendrilSessionMongodb.provider, 'options': { 'uri': process.env['MONGO_URL'] } } }, 'csrf': { 'token': { 'enable': true,
                'send_cookie': true } },
        'views': { 'provider': tendrilShowNunjucks.show,
            'options': [{ 'path': `packages/extras/board-views/views` }] }, 'log': { 'enable': true, 'format': process.env['LOG_FORMAT'] }, 'parsers': { 'body': { 'json': { 'enable': true } } },
        'middleware': { 'available': {},
            'enabled': [] },
        'modules': { 'admin': admin.template },
        'on': { 'connected': [events.connected, setup.run],
            'started': events.started }, 'routes': (_m) => {
            return [{ method: 'get', path: '/', filters: [handlers_1.showPosts] },
                { method: 'get', path: '/post', filters: [handlers_1.showPostJobPage] },
                { method: 'post', path: '/post', filters: [handlers_1.createPost] },
                { method: 'get', path: '/posts/:id', filters: [handlers_1.showPost] }
            ];
        } },
    'create': 
    //@ts-ignore: 6133 
    (_app) => new module_1.Module(_app),
    'server': { 'port': process.env['PORT'], 'host': `0.0.0.0` },
    'connections': { 'main': { 'connector': tendrilConnectionMongodb.connector, 'options': [process.env['MONGO_URL'], { 'useNewUrlParser': true }] } } });
//# sourceMappingURL=index.js.map