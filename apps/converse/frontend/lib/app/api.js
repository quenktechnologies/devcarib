"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comments = exports.posts = exports.me = void 0;
exports.me = {
    get: '/converse/r/me'
};
exports.posts = {
    create: '/converse/r/posts',
    search: '/converse/r/posts',
    update: '/converse/r/posts/{id}',
    get: '/converse/r/posts/{id}',
    remove: '/converse/r/posts/{id}',
};
exports.comments = {
    create: '/converse/r/posts/{id}/comments',
    search: '/converse/r/posts/{id}/comments',
    update: '/converse/r/comments/{id}',
    get: '/converse/r/comments/{id}',
    remove: '/converse/r/comments/{id}',
};
//# sourceMappingURL=api.js.map