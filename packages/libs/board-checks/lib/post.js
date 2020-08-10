"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminCheckPatch = exports.checkPatch = exports.check = void 0;
var async_1 = require("@quenk/preconditions/lib/async");
var record_1 = require("@quenk/preconditions/lib/async/record");
var post_1 = require("@board/validation/lib/post");
var _1 = require("./");
/**
 * check function for new Post types.
 */
exports.check = async_1.and(async_1.async(post_1.validate), record_1.restrict({
    id: _1.inc('posts'),
    title: async_1.identity,
    description: async_1.identity,
    company: async_1.identity,
    company_email: async_1.identity,
    company_logo: async_1.identity,
    apply_url: async_1.identity,
    created_on: _1.timestamp,
    last_modified_on: _1.timestamp
}));
/**
 * checkPatch function for existing Post types.
 */
exports.checkPatch = async_1.and(async_1.async(post_1.validatePatch), record_1.intersect({
    title: async_1.identity,
    description: async_1.identity,
    company: async_1.identity,
    company_email: async_1.identity,
    company_logo: async_1.identity,
    apply_url: async_1.identity,
    last_modified_on: _1.timestamp
}));
/**
 * checkPatch function for existing Post types.
 */
exports.adminCheckPatch = async_1.and(async_1.async(post_1.adminValidatePatch), record_1.intersect({
    title: async_1.identity,
    description: async_1.identity,
    company: async_1.identity,
    company_email: async_1.identity,
    company_logo: async_1.identity,
    apply_url: async_1.identity,
    approved: async_1.identity,
    last_modified_on: _1.timestamp
}));
//# sourceMappingURL=post.js.map