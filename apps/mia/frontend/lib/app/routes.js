"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
var array_1 = require("@quenk/noni/lib/data/array");
var template_1 = require("@quenk/potoo/lib/actor/template");
var manager_1 = require("./jobs/manager");
var ignoredErrors = ['ClientError', 'ServerError'];
var trap = function (e) { return (0, array_1.contains)(ignoredErrors, e.message) ?
    template_1.ACTION_IGNORE : template_1.ACTION_RAISE; };
exports.routes = {
    '/': {
        id: 'dashboard',
        trap: trap,
        create: function (s, _, r) { return new manager_1.JobsManager(s, r); }
    }
};
//# sourceMappingURL=routes.js.map