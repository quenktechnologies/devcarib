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
var validators_1 = require("./validators");
//@ts-ignore: 6133
var _string = preconditions_1.and(string_1.isString, string_1.trim);
/**
 * validators for CandidatePost provided as a map.
 */
exports.validators = {
    'title': preconditions_1.and(preconditions_1.notNull, preconditions_1.and(_string, preconditions_1.every(validators_1.textsmall, validators_1.minLength(3)))),
    'preview': preconditions_1.and(preconditions_1.notNull, preconditions_1.and(_string, preconditions_1.every(validators_1.minLength(1), validators_1.maxLength(240)))),
    'description': preconditions_1.and(preconditions_1.notNull, preconditions_1.and(_string, preconditions_1.every(validators_1.textlarge, validators_1.minLength(3)))),
    'company': preconditions_1.and(preconditions_1.notNull, preconditions_1.and(_string, preconditions_1.every(validators_1.name))),
    'company_email': preconditions_1.and(preconditions_1.notNull, preconditions_1.and(_string, preconditions_1.every(validators_1.email))),
    'company_logo': preconditions_1.optional(preconditions_1.and(_string, preconditions_1.every(validators_1.url))),
    'apply_url': preconditions_1.optional(preconditions_1.and(_string, preconditions_1.every(validators_1.url))),
    'approved': preconditions_1.optional(boolean_1.isBoolean)
};
/**
 * partialValidators for CandidatePost provided as a map.
 */
exports.partialValidators = {
    'title': preconditions_1.and(preconditions_1.notNull, preconditions_1.and(_string, preconditions_1.every(validators_1.textsmall, validators_1.minLength(3)))),
    'preview': preconditions_1.and(preconditions_1.notNull, preconditions_1.and(_string, preconditions_1.every(validators_1.minLength(1), validators_1.maxLength(240)))),
    'description': preconditions_1.and(preconditions_1.notNull, preconditions_1.and(_string, preconditions_1.every(validators_1.textlarge, validators_1.minLength(3)))),
    'company': preconditions_1.and(preconditions_1.notNull, preconditions_1.and(_string, preconditions_1.every(validators_1.name))),
    'company_email': preconditions_1.and(preconditions_1.notNull, preconditions_1.and(_string, preconditions_1.every(validators_1.email))),
    'company_logo': preconditions_1.optional(preconditions_1.and(_string, preconditions_1.every(validators_1.url))),
    'apply_url': preconditions_1.optional(preconditions_1.and(_string, preconditions_1.every(validators_1.url))),
    'approved': preconditions_1.optional(boolean_1.isBoolean)
};
/**
 * validate a single Value against the rules for CandidatePost.
 */
exports.validate = preconditions_1.and(record_1.isRecord, record_1.restrict(exports.validators));
/**
 * validate a single Value against the rules for a partial CandidatePost.
 */
exports.validatePartial = preconditions_1.and(record_1.isRecord, record_1.intersect(exports.partialValidators));
//# sourceMappingURL=candidate-post.js.map