"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.schema = void 0;
var preconditions_1 = require("@quenk/preconditions");
var record_1 = require("@quenk/preconditions/lib/record");
var string_1 = require("@quenk/preconditions/lib/string");
/**
 * schema implementation
 */
exports.schema = {
    title: preconditions_1.and(preconditions_1.notNull, preconditions_1.every(string_1.isString, string_1.trim, string_1.minLength(3), string_1.maxLength(140))),
    description: preconditions_1.and(preconditions_1.notNull, preconditions_1.every(string_1.isString, string_1.trim, string_1.minLength(1), string_1.maxLength(8000))),
    company: preconditions_1.and(preconditions_1.notNull, preconditions_1.every(string_1.isString, string_1.trim, string_1.minLength(3), string_1.maxLength(80))),
    company_email: preconditions_1.and(preconditions_1.notNull, preconditions_1.every(string_1.isString, string_1.trim, string_1.minLength(3), string_1.maxLength(80))),
    company_logo: preconditions_1.optional(preconditions_1.every(string_1.isString, string_1.trim, string_1.minLength(3), string_1.maxLength(3000))),
    apply_url: preconditions_1.optional(preconditions_1.every(string_1.isString, string_1.trim, string_1.minLength(3), string_1.maxLength(3000)))
};
/**
 * validate a JSON value as a Post.
 */
exports.validate = preconditions_1.and(record_1.isRecord, record_1.restrict(exports.schema));
//# sourceMappingURL=post.js.map