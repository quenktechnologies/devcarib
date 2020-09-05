"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.template = void 0;
const handlers_1 = require("./handlers");
const module_1 = require("@quenk/tendril/lib/app/module");
exports.template = (_app) => ({ 'id': `r`, 'app': { 'dirs': { 'self': `/build/app/admin/r` }, 'routes': (_m) => {
            return [{ method: 'post', path: '/admins', filters: [handlers_1.adminsCtrl.create] },
                { method: 'get', path: '/admins', filters: [handlers_1.adminsCtrl.search] },
                { method: 'get', path: '/admins/:id', filters: [handlers_1.adminsCtrl.get] },
                { method: 'patch', path: '/admins/:id', filters: [handlers_1.adminsCtrl.update] },
                { method: 'delete', path: '/admins/:id', filters: [handlers_1.adminsCtrl.remove] },
                { method: 'post', path: '/posts', filters: [handlers_1.postsCtl.create] },
                { method: 'get', path: '/posts', filters: [handlers_1.postsCtl.search] },
                { method: 'patch', path: '/posts/:id', filters: [handlers_1.postsCtl.update] },
                { method: 'get', path: '/posts/:id', filters: [handlers_1.postsCtl.get] },
                { method: 'delete', path: '/posts/:id', filters: [handlers_1.postsCtl.remove] }
            ];
        } },
    'create': 
    //@ts-ignore: 6133 
    (_app) => new module_1.Module(_app) });
//# sourceMappingURL=index.js.map