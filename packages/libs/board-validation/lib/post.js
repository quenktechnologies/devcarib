"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePartial = exports.validate = exports.partialValidators = exports.validators = void 0;
//@ts-ignore: 6133
var preconditions_1 = require("@quenk/preconditions");
//@ts-ignore: 6133
var record_1 = require("@quenk/preconditions/lib/record");
//@ts-ignore: 6133
var boolean_1 = require("@quenk/preconditions/lib/boolean");
//@ts-ignore: 6133
var string_1 = require("@quenk/preconditions/lib/string");
var _1 = require("./");
var _string = preconditions_1.and(string_1.isString, string_1.trim);
/**
 * validators for Post provided as a map.
 */
exports.validators = {
    'approved': preconditions_1.optional(boolean_1.isBoolean),
    'title': preconditions_1.and(preconditions_1.notNull, preconditions_1.and(_string, preconditions_1.every(_1.textsmall, _1.minLength(3)))),
    'description': preconditions_1.and(preconditions_1.notNull, preconditions_1.and(_string, preconditions_1.every(_1.textlarge, _1.minLength(3)))),
    'company': preconditions_1.and(preconditions_1.notNull, preconditions_1.and(_string, preconditions_1.every(_1.name))),
    'company_email': preconditions_1.and(preconditions_1.notNull, preconditions_1.and(_string, preconditions_1.every(_1.email))),
    'company_logo': preconditions_1.optional(preconditions_1.and(_string, preconditions_1.every(_1.url))),
    'apply_url': preconditions_1.optional(preconditions_1.and(_string, preconditions_1.every(_1.url)))
};
/**
 * partialValidators for Post provided as a map.
 */
exports.partialValidators = {
    'approved': preconditions_1.optional(boolean_1.isBoolean),
    'title': preconditions_1.and(preconditions_1.notNull, preconditions_1.and(_string, preconditions_1.every(_1.textsmall, _1.minLength(3)))),
    'description': preconditions_1.and(preconditions_1.notNull, preconditions_1.and(_string, preconditions_1.every(_1.textlarge, _1.minLength(3)))),
    'company': preconditions_1.and(preconditions_1.notNull, preconditions_1.and(_string, preconditions_1.every(_1.name))),
    'company_email': preconditions_1.and(preconditions_1.notNull, preconditions_1.and(_string, preconditions_1.every(_1.email))),
    'company_logo': preconditions_1.optional(preconditions_1.and(_string, preconditions_1.every(_1.url))),
    'apply_url': preconditions_1.optional(preconditions_1.and(_string, preconditions_1.every(_1.url)))
};
/**
 * validate a single Value against the rules for Post.
 */
exports.validate = preconditions_1.and(record_1.isRecord, record_1.restrict(exports.validators));
/**
 * validate a single Value against the rules for a partial Post.
 */
exports.validatePartial = preconditions_1.and(record_1.isRecord, record_1.intersect(exports.partialValidators));
//# sourceMappingURL=post.js.map