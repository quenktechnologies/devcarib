"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.template = void 0;
const handlers_1 = require("./handlers");
const module_1 = require("@quenk/tendril/lib/app/module");
exports.template = (_app) => ({ 'create': 
    //@ts-ignore: 6133 
    (_app) => new module_1.Module(_app), 'id': `admin`, 'app': { 'routes': (_m) => {
            return [{ method: 'get', path: '/r/posts', filters: [handlers_1.postAPI.setQuery, handlers_1.postAPI.search] },
                { method: 'patch', path: '/r/posts', filters: [handlers_1.postAPI.update] },
                { method: 'get', path: '/r/posts/:id', filters: [handlers_1.postAPI.get] },
                { method: 'delete', path: '/r/posts/:id', filters: [handlers_1.postAPI.remove] }
            ];
        } } });
//# sourceMappingURL=index.js.map