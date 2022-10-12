"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPartial = exports.check = exports.partialChecks = exports.checks = void 0;
//@ts-ignore: 6133
const async_1 = require("@quenk/preconditions/lib/async");
//@ts-ignore: 6133
const record_1 = require("@quenk/preconditions/lib/async/record");
const comment_1 = require("@converse/validators/lib/comment");
const checks_1 = require("@devcarib/server/lib/data/checks");
//@ts-ignore: 6133
const _title = 'Comment';
//@ts-ignore: 6133
const _collection = 'comments';
/**
 * checks for Comment provided as a map.
 */
exports.checks = {
    'id': (0, async_1.every)((0, checks_1.unique)('comments', 'id')),
    'post': (0, async_1.every)((0, checks_1.unique)('posts', 'id')),
    'body': async_1.identity,
    'body_html': async_1.identity,
    'created_by': async_1.identity,
    'created_on': async_1.identity,
    'last_updated_on': async_1.identity,
    'last_updated_by': async_1.identity
};
/**
 * partialChecks for Comment provided as a map.
 */
exports.partialChecks = {
    'id': async_1.identity,
    'post': async_1.identity,
    'body': async_1.identity,
    'body_html': async_1.identity,
    'created_by': async_1.identity,
    'created_on': async_1.identity,
    'last_updated_on': async_1.identity,
    'last_updated_by': async_1.identity
};
/**
 * check a Comment value.
 */
exports.check = (0, async_1.and)((0, async_1.and)((0, async_1.async)(comment_1.validate), (0, record_1.restrict)(exports.checks)), (0, async_1.every)((0, checks_1.parseMarkdown)('body', 'body_html'), (0, checks_1.inc)('comments')));
/**
 * checkPartial a partial Comment value.
 */
exports.checkPartial = (0, async_1.and)((0, async_1.and)((0, async_1.async)(comment_1.validatePartial), (0, record_1.intersect)(exports.partialChecks)), (0, async_1.every)((0, checks_1.parseMarkdown)('body', 'body_html')));
//# sourceMappingURL=comment.js.map