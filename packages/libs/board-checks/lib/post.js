"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPartial = exports.check = exports.partialChecks = exports.checks = void 0;
//@ts-ignore: 6133
var async_1 = require("@quenk/preconditions/lib/async");
//@ts-ignore: 6133
var record_1 = require("@quenk/preconditions/lib/async/record");
var post_1 = require("@board/validators/lib/post");
var _1 = require("./");
//@ts-ignore: 6133
var _title = 'Post';
//@ts-ignore: 6133
var _collection = 'posts';
/**
 * checks for Post provided as a map.
 */
exports.checks = {
    'approved': async_1.identity,
    'created_by': async_1.identity,
    'created_on': async_1.identity,
    'last_updated_on': async_1.identity,
    'last_updated_by': async_1.identity,
    'id': async_1.every(_1.inc('counters.posts'), _1.unique('posts', 'id')),
    'title': async_1.identity,
    'description': async_1.identity,
    'description_html': async_1.identity,
    'company': async_1.identity,
    'company_email': async_1.identity,
    'company_logo': async_1.identity,
    'apply_url': async_1.identity
};
/**
 * partialChecks for Post provided as a map.
 */
exports.partialChecks = {
    'approved': async_1.identity,
    'created_by': async_1.identity,
    'created_on': async_1.identity,
    'last_updated_on': async_1.identity,
    'last_updated_by': async_1.identity,
    'id': async_1.identity,
    'title': async_1.identity,
    'description': async_1.identity,
    'description_html': async_1.identity,
    'company': async_1.identity,
    'company_email': async_1.identity,
    'company_logo': async_1.identity,
    'apply_url': async_1.identity
};
/**
 * check a Post value.
 */
exports.check = function () {
    return async_1.and(async_1.every(_1.parseMarkdown('description', 'description_html')), async_1.and(async_1.async(post_1.validate), record_1.restrict(exports.checks)));
};
/**
 * checkPartial a partial Post value.
 */
exports.checkPartial = function () {
    return async_1.and(async_1.every(_1.parseMarkdown('description', 'description_html')), async_1.and(async_1.async(post_1.validatePartial), record_1.intersect(exports.partialChecks)));
};
//# sourceMappingURL=post.js.map