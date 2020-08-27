"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.template = void 0;
const handlers_1 = require("./handlers");
const module_1 = require("@quenk/tendril/lib/app/module");
exports.template = (_app) => ({ 'id': `admin`, 'app': { 'dirs': { 'self': `/build/app/admin` },
        'csrf': { 'token': { 'enable': true } }, 'routes': (_m) => {
            return [{ method: 'get', path: '/', filters: [handlers_1.adminCtl.showIndex] },
                { method: 'get', path: '/login', filters: [handlers_1.adminCtl.showLoginForm] },
                { method: 'post', path: '/login', filters: [handlers_1.adminCtl.authenticate] },
                { method: 'get', path: '/logout', filters: [handlers_1.adminCtl.logout] },
                { method: 'get', path: '/r/posts', filters: [handlers_1.postsCtl.runSearch] },
                { method: 'patch', path: '/r/posts/:id', filters: [handlers_1.postsCtl.runUpdate] },
                { method: 'get', path: '/r/posts/:id', filters: [handlers_1.postsCtl.get] },
                { method: 'delete', path: '/r/posts/:id', filters: [handlers_1.postsCtl.remove] }
            ];
        } },
    'create': 
    //@ts-ignore: 6133 
    (_app) => new module_1.Module(_app) });
//# sourceMappingURL=index.js.map