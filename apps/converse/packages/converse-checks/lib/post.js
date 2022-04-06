"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPartial = exports.check = exports.partialChecks = exports.checks = void 0;
//@ts-ignore: 6133
var async_1 = require("@quenk/preconditions/lib/async");
//@ts-ignore: 6133
var record_1 = require("@quenk/preconditions/lib/async/record");
var post_1 = require("@converse/validators/lib/post");
var checks_1 = require("@devcarib/server/lib/data/checks");
//@ts-ignore: 6133
var _title = 'Post';
//@ts-ignore: 6133
var _collection = 'posts';
/**
 * checks for Post provided as a map.
 */
exports.checks = {
    'id': (0, async_1.every)((0, checks_1.unique)('jobs', 'id')),
    'title': async_1.identity,
    'body': async_1.identity,
    'body_html': async_1.identity,
    'created_by': async_1.identity,
    'created_on': async_1.identity,
    'last_updated_on': async_1.identity,
    'last_updated_by': async_1.identity
};
/**
 * partialChecks for Post provided as a map.
 */
exports.partialChecks = {
    'id': async_1.identity,
    'title': async_1.identity,
    'body': async_1.identity,
    'body_html': async_1.identity,
    'created_by': async_1.identity,
    'created_on': async_1.identity,
    'last_updated_on': async_1.identity,
    'last_updated_by': async_1.identity
};
/**
 * check a Post value.
 */
exports.check = (0, async_1.and)((0, async_1.and)((0, async_1.async)(post_1.validate), (0, record_1.restrict)(exports.checks)), (0, async_1.every)((0, checks_1.parseMarkdown)('body', 'body_html'), (0, checks_1.inc)('posts')));
/**
 * checkPartial a partial Post value.
 */
exports.checkPartial = (0, async_1.and)((0, async_1.and)((0, async_1.async)(post_1.validatePartial), (0, record_1.intersect)(exports.partialChecks)), (0, async_1.every)((0, checks_1.parseMarkdown)('body', 'body_html'), (0, checks_1.inc)('posts')));
//# sourceMappingURL=post.js.map