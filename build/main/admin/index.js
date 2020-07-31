"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.template = void 0;
const handlers_1 = require("./handlers");
const module_1 = require("@quenk/tendril/lib/app/module");
exports.template = (_app) => ({ 'create': 
    //@ts-ignore: 6133 
    (_app) => new module_1.Module(_app), 'id': `admin`, 'app': { 'routes': (_m) => {
            return [{ method: 'get', path: '/', filters: [handlers_1.adminCtl.showIndex] },
                { method: 'get', path: '/r/posts', filters: [handlers_1.adminCtl.setQuery, handlers_1.adminCtl.search] },
                { method: 'patch', path: '/r/posts', filters: [handlers_1.adminCtl.update] },
                { method: 'get', path: '/r/posts/:id', filters: [handlers_1.adminCtl.get] },
                { method: 'delete', path: '/r/posts/:id', filters: [handlers_1.adminCtl.remove] }
            ];
        } } });
//# sourceMappingURL=index.js.map