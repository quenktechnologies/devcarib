"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const array_1 = require("@quenk/noni/lib/data/array");
const template_1 = require("@quenk/potoo/lib/actor/template");
const manager_1 = require("./jobs/manager");
const manager_2 = require("./users/manager");
const manager_3 = require("./events/manager");
let ignoredErrors = ['ClientError', 'ServerError'];
const trap = (e) => (0, array_1.contains)(ignoredErrors, e.message) ?
    template_1.ACTION_IGNORE : template_1.ACTION_RAISE;
exports.routes = {
    '/': {
        id: 'dashboard',
        trap,
        create: (s, _, r) => new manager_1.JobsManager(s, r)
    },
    '/jobs': {
        id: 'dashboard',
        trap,
        create: (s, _, r) => new manager_1.JobsManager(s, r)
    },
    '/users': {
        id: 'users',
        trap,
        create: (s, _, r) => new manager_2.UsersManager(s, r)
    },
    '/events': {
        id: 'events',
        trap,
        create: (s, _, r) => new manager_3.EventsManager(s, r)
    }
};
//# sourceMappingURL=routes.js.map