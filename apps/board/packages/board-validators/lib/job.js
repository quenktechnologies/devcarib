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
var number_1 = require("@quenk/preconditions/lib/number");
//@ts-ignore: 6133
var string_1 = require("@quenk/preconditions/lib/string");
var validators_1 = require("./validators");
//@ts-ignore: 6133
var _string = (0, preconditions_1.and)(string_1.isString, string_1.trim);
/**
 * validators for Job provided as a map.
 */
exports.validators = {
    'title': (0, preconditions_1.and)(preconditions_1.notNull, (0, preconditions_1.and)(_string, (0, preconditions_1.every)(validators_1.textsmall, (0, validators_1.minLength)(3)))),
    'type': (0, preconditions_1.and)(preconditions_1.notNull, (0, preconditions_1.and)(_string, (0, preconditions_1.every)(validators_1.textsmall))),
    'location': (0, preconditions_1.and)(preconditions_1.notNull, (0, preconditions_1.and)(_string, (0, preconditions_1.every)(validators_1.textsmall))),
    'remote': (0, preconditions_1.optional)(boolean_1.isBoolean),
    'description': (0, preconditions_1.and)(preconditions_1.notNull, (0, preconditions_1.and)(_string, (0, preconditions_1.every)(validators_1.textlarge, (0, validators_1.minLength)(3), (0, validators_1.maxLength)(6000)))),
    'company': (0, preconditions_1.and)(preconditions_1.notNull, (0, preconditions_1.and)(_string, (0, preconditions_1.every)(validators_1.name))),
    'company_email': (0, preconditions_1.and)(preconditions_1.notNull, (0, preconditions_1.and)(_string, (0, preconditions_1.every)(validators_1.email))),
    'company_logo': (0, preconditions_1.optional)((0, preconditions_1.and)(_string, (0, preconditions_1.every)(validators_1.url))),
    'apply_url': (0, preconditions_1.optional)((0, preconditions_1.and)(_string, (0, preconditions_1.every)(validators_1.url))),
    'approved': (0, preconditions_1.optional)(boolean_1.isBoolean),
    'payment_currency': (0, preconditions_1.optional)((0, preconditions_1.and)(_string, (0, preconditions_1.every)(validators_1.currency))),
    'payment_amount': (0, preconditions_1.optional)(number_1.toNumber),
    'payment_frequency': (0, preconditions_1.optional)((0, preconditions_1.and)(_string, (0, preconditions_1.every)(validators_1.paymentFrequency))),
    'status': (0, preconditions_1.and)(preconditions_1.notNull, (0, preconditions_1.and)(_string, (0, preconditions_1.every)(validators_1.jobStatus))),
};
/**
 * partialValidators for Job provided as a map.
 */
exports.partialValidators = {
    'title': (0, preconditions_1.and)(preconditions_1.notNull, (0, preconditions_1.and)(_string, (0, preconditions_1.every)(validators_1.textsmall, (0, validators_1.minLength)(3)))),
    'type': (0, preconditions_1.and)(preconditions_1.notNull, (0, preconditions_1.and)(_string, (0, preconditions_1.every)(validators_1.textsmall))),
    'location': (0, preconditions_1.and)(preconditions_1.notNull, (0, preconditions_1.and)(_string, (0, preconditions_1.every)(validators_1.textsmall))),
    'remote': (0, preconditions_1.optional)(boolean_1.isBoolean),
    'description': (0, preconditions_1.and)(preconditions_1.notNull, (0, preconditions_1.and)(_string, (0, preconditions_1.every)(validators_1.textlarge, (0, validators_1.minLength)(3), (0, validators_1.maxLength)(6000)))),
    'company': (0, preconditions_1.and)(preconditions_1.notNull, (0, preconditions_1.and)(_string, (0, preconditions_1.every)(validators_1.name))),
    'company_email': (0, preconditions_1.and)(preconditions_1.notNull, (0, preconditions_1.and)(_string, (0, preconditions_1.every)(validators_1.email))),
    'company_logo': (0, preconditions_1.optional)((0, preconditions_1.and)(_string, (0, preconditions_1.every)(validators_1.url))),
    'apply_url': (0, preconditions_1.optional)((0, preconditions_1.and)(_string, (0, preconditions_1.every)(validators_1.url))),
    'approved': (0, preconditions_1.optional)(boolean_1.isBoolean),
    'payment_currency': (0, preconditions_1.optional)((0, preconditions_1.and)(_string, (0, preconditions_1.every)(validators_1.currency))),
    'payment_amount': (0, preconditions_1.optional)(number_1.toNumber),
    'payment_frequency': (0, preconditions_1.optional)((0, preconditions_1.and)(_string, (0, preconditions_1.every)(validators_1.paymentFrequency))),
    'status': (0, preconditions_1.and)(preconditions_1.notNull, (0, preconditions_1.and)(_string, (0, preconditions_1.every)(validators_1.jobStatus))),
};
/**
 * validate a single Value against the rules for Job.
 */
exports.validate = (0, preconditions_1.and)(record_1.isRecord, (0, record_1.restrict)(exports.validators));
/**
 * validate a single Value against the rules for a partial Job.
 */
exports.validatePartial = (0, preconditions_1.and)(record_1.isRecord, (0, record_1.intersect)(exports.partialValidators));
//# sourceMappingURL=job.js.map