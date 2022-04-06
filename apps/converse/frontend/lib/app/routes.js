"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const array_1 = require("@quenk/noni/lib/data/array");
const template_1 = require("@quenk/potoo/lib/actor/template");
const dashboard_1 = require("./dashboard");
let ignoredErrors = ['ClientError', 'ServerError'];
const trap = (e) => (0, array_1.contains)(ignoredErrors, e.message) ?
    template_1.ACTION_IGNORE : template_1.ACTION_RAISE;
exports.routes = {
    '/': {
        id: 'dashboard',
        trap,
        create: (s, _, r) => new dashboard_1.Dashboard(s, r)
    }
};
//# sourceMappingURL=routes.js.map