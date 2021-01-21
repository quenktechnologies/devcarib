"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.template = void 0;
const dotHandlers = require("./handlers");
//@ts-ignore: 6133
const module_1 = require("@quenk/tendril/lib/app/module");
//@ts-ignore: 6133
exports.template = ($app) => ({ 'id': `r`, 'app': { 'dirs': { 'self': `/build/app/admin/r` }, 'routes': //@ts-ignore: 6133
        ($module) => {
            let $routes = [];
            let adminsCtrl = dotHandlers.adminsCtrl;
            let postsCtl = dotHandlers.postsCtl;
            $routes.push({
                method: 'post',
                path: '/admins',
                filters: [adminsCtrl.create.bind(adminsCtrl)]
            });
            $routes.push({
                method: 'get',
                path: '/admins',
                filters: [adminsCtrl.search.bind(adminsCtrl)]
            });
            $routes.push({
                method: 'get',
                path: '/admins/:id',
                filters: [adminsCtrl.get.bind(adminsCtrl)]
            });
            $routes.push({
                method: 'patch',
                path: '/admins/:id',
                filters: [adminsCtrl.update.bind(adminsCtrl)]
            });
            $routes.push({
                method: 'delete',
                path: '/admins/:id',
                filters: [adminsCtrl.remove.bind(adminsCtrl)]
            });
            $routes.push({
                method: 'post',
                path: '/posts',
                filters: [postsCtl.create.bind(postsCtl)]
            });
            $routes.push({
                method: 'get',
                path: '/posts',
                filters: [postsCtl.search.bind(postsCtl)]
            });
            $routes.push({
                method: 'patch',
                path: '/posts/:id',
                filters: [postsCtl.update.bind(postsCtl)]
            });
            $routes.push({
                method: 'get',
                path: '/posts/:id',
                filters: [postsCtl.get.bind(postsCtl)]
            });
            $routes.push({
                method: 'delete',
                path: '/posts/:id',
                filters: [postsCtl.remove.bind(postsCtl)]
            });
            return $routes;
        } },
    'create': 
    //@ts-ignore: 6133 
    (s) => new module_1.Module(s) });
//# sourceMappingURL=index.js.map