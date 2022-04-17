"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = exports.jobs = void 0;
/**
 * This module holds constants for the XHR endpoints of board-admin.
 */
exports.jobs = {
    create: '/mia/r/jobs',
    search: '/mia/r/jobs',
    update: '/mia/r/jobs/{id}',
    get: '/mia/r/jobs/{id}',
    remove: '/mia/r/jobs/{id}',
};
exports.users = {
    create: '/mia/r/users',
    search: '/mia/r/users',
    update: '/mia/r/users/{id}',
    get: '/mia/r/users/{id}',
    remove: '/mia/r/users/{id}',
};
//# sourceMappingURL=api.js.map