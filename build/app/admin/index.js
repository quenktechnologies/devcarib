"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.template = void 0;
const r = require("./r");
const handlers_1 = require("./handlers");
const module_1 = require("@quenk/tendril/lib/app/module");
exports.template = (_app) => ({ 'id': `admin`, 'app': { 'dirs': { 'self': `/Users/genora/board/build/app/admin` },
        'modules': { 'r': r.template }, 'routes': (_m) => {
            return [{ method: 'get', path: '/', filters: [handlers_1.adminCtl.showIndex] },
                { method: 'get', path: '/login', filters: [handlers_1.adminCtl.showLoginForm] },
                { method: 'post', path: '/login', filters: [handlers_1.adminCtl.authenticate] },
                { method: 'post', path: '/logout', filters: [handlers_1.adminCtl.logout] }
            ];
        } },
    'create': 
    //@ts-ignore: 6133 
    (_app) => new module_1.Module(_app) });
//# sourceMappingURL=index.js.map