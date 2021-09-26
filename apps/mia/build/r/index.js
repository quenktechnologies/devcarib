"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.template = void 0;
const dotHandlers = require("./handlers");
//@ts-ignore: 6133
const module_1 = require("@quenk/tendril/lib/app/module");
//@ts-ignore: 6133
const template = ($app) => ({ 'id': `r`, 'app': { 'dirs': { 'self': `/apps/mia/build/r` }, 'routes': //@ts-ignore: 6133
        ($module) => {
            let $routes = [];
            let adminsCtrl = dotHandlers.adminsCtrl;
            let jobCtrl = dotHandlers.jobCtrl;
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
                path: '/jobs',
                filters: [jobCtrl.create.bind(jobCtrl)]
            });
            $routes.push({
                method: 'get',
                path: '/jobs',
                filters: [jobCtrl.search.bind(jobCtrl)]
            });
            $routes.push({
                method: 'patch',
                path: '/jobs/:id',
                filters: [jobCtrl.update.bind(jobCtrl)]
            });
            $routes.push({
                method: 'get',
                path: '/jobs/:id',
                filters: [jobCtrl.get.bind(jobCtrl)]
            });
            $routes.push({
                method: 'delete',
                path: '/jobs/:id',
                filters: [jobCtrl.remove.bind(jobCtrl)]
            });
            return $routes;
        } },
    'create': 
    //@ts-ignore: 6133 
    (s) => new module_1.Module(s) });
exports.template = template;
//# sourceMappingURL=index.js.map