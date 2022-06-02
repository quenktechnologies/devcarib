"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invites = exports.events = exports.jobs = exports.comments = exports.posts = exports.me = void 0;
exports.me = {
    get: '/converse/r/me'
};
exports.posts = {
    create: '/converse/r/posts',
    search: '/converse/r/posts',
    update: '/converse/r/posts/{id}',
    get: '/converse/r/posts/{id}',
    remove: '/converse/r/posts/{id}'
};
exports.comments = {
    create: '/converse/r/posts/{id}/comments',
    search: '/converse/r/posts/{id}/comments',
    update: '/converse/r/comments/{id}',
    get: '/converse/r/comments/{id}',
    remove: '/converse/r/comments/{id}'
};
exports.jobs = {
    create: '/r/jobs',
    search: '/r/jobs',
    update: '/jobs/{id}',
    get: '/r/jobs/{id}',
    remove: '/r/jobs/{id}'
};
exports.events = {
    create: '/converse/r/events',
    search: '/converse/r/events',
    update: '/converse/events/{id}',
    get: '/converse/r/events/{id}',
    remove: '/converse/r/events/{id}'
};
exports.invites = {
    create: '/converse/r/invites',
    search: '/converse/r/invites',
    update: '/converse/invites/{id}',
    get: '/converse/r/invites/{id}',
    remove: '/converse/r/invites/{id}'
};
//# sourceMappingURL=api.js.map