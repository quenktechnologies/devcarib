"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.template = void 0;
const dotR = require("./r");
const dotHandlers = require("./handlers");
//@ts-ignore: 6133
const module_1 = require("@quenk/tendril/lib/app/module");
//@ts-ignore: 6133
exports.template = ($app) => ({ 'id': `admin`, 'app': { 'dirs': { 'self': `/build/app/admin` },
        'modules': { 'r': dotR.template }, 'routes': //@ts-ignore: 6133
        ($module) => {
            let $routes = [];
            let adminCtl = dotHandlers.adminCtl;
            $routes.push({
                method: 'get',
                path: '/',
                filters: [adminCtl.showIndex.bind(adminCtl)]
            });
            $routes.push({
                method: 'get',
                path: '/login',
                filters: [adminCtl.showLoginForm.bind(adminCtl)]
            });
            $routes.push({
                method: 'post',
                path: '/login',
                filters: [adminCtl.authenticate.bind(adminCtl)]
            });
            $routes.push({
                method: 'post',
                path: '/logout',
                filters: [adminCtl.logout.bind(adminCtl)]
            });
            return $routes;
        } },
    'create': 
    //@ts-ignore: 6133 
    (s) => new module_1.Module(s) });
//# sourceMappingURL=index.js.map