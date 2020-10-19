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
 * validators for CandidatePost provided as a map.
 */
exports.validators = {
    'title': preconditions_1.and(_string, preconditions_1.every(_1.textsmall)),
    'description': preconditions_1.and(_string, preconditions_1.every(_1.textlarge)),
    'company': preconditions_1.and(_string, preconditions_1.every(_1.name)),
    'company_email': preconditions_1.and(_string, preconditions_1.every(_1.email)),
    'company_logo': preconditions_1.optional(preconditions_1.and(_string, preconditions_1.every(_1.url))),
    'apply_url': preconditions_1.optional(preconditions_1.and(_string, preconditions_1.every(_1.url))),
    'approved': boolean_1.isBoolean
};
/**
 * partialValidators for CandidatePost provided as a map.
 */
exports.partialValidators = {
    'title': preconditions_1.and(_string, preconditions_1.every(_1.textsmall)),
    'description': preconditions_1.and(_string, preconditions_1.every(_1.textlarge)),
    'company': preconditions_1.and(_string, preconditions_1.every(_1.name)),
    'company_email': preconditions_1.and(_string, preconditions_1.every(_1.email)),
    'company_logo': preconditions_1.optional(preconditions_1.and(_string, preconditions_1.every(_1.url))),
    'apply_url': preconditions_1.optional(preconditions_1.and(_string, preconditions_1.every(_1.url))),
    'approved': boolean_1.isBoolean
};
/**
 * validate a single Value against the rules for CandidatePost.
 */
exports.validate = preconditions_1.and(record_1.isRecord, record_1.restrict(exports.validators));
/**
 * validate a single Value against the rules for a partial CandidatePost.
 */
exports.validatePartial = preconditions_1.and(record_1.isRecord, record_1.intersect(exports.partialValidators));
//# sourceMappingURL=candidatepost.js.map