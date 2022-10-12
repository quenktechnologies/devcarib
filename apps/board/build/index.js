"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.template = void 0;
const dotR = require("./r");
const dotHandlers = require("./handlers");
//@ts-ignore: 6133
const module_1 = require("@quenk/tendril/lib/app/module");
//@ts-ignore: 6133
const template = ($app) => ({ 'id': `build`,
    'app': { 'dirs': { 'self': `/apps/board/build` },
        'modules': { 'r': dotR.template },
        'routes': //@ts-ignore: 6133
        ($module) => {
            let $routes = [];
            $routes.push({
                method: 'get',
                path: '/',
                filters: [dotHandlers.showJobs], tags: {}
            });
            $routes.push({
                method: 'get',
                path: '/jobs/post',
                filters: [dotHandlers.showJobJobPage], tags: {}
            });
            $routes.push({
                method: 'post',
                path: '/jobs/post',
                filters: [dotHandlers.createJob], tags: {}
            });
            $routes.push({
                method: 'get',
                path: '/jobs/:id',
                filters: [dotHandlers.showJob], tags: {}
            });
            return $routes;
        } },
    'create': 
    //@ts-ignore: 6133 
    (s) => new module_1.Module(s) });
exports.template = template;
//# sourceMappingURL=index.js.map