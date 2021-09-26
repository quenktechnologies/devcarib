"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePartial = exports.validate = exports.partialValidators = exports.validators = void 0;
//@ts-ignore: 6133
var preconditions_1 = require("@quenk/preconditions");
//@ts-ignore: 6133
var record_1 = require("@quenk/preconditions/lib/record");
//@ts-ignore: 6133
var string_1 = require("@quenk/preconditions/lib/string");
var common_validators_1 = require("@devcarib/common-validators");
//@ts-ignore: 6133
var _string = preconditions_1.and(string_1.isString, string_1.trim);
/**
 * validators for Admin provided as a map.
 */
exports.validators = {
    'name': preconditions_1.and(preconditions_1.notNull, preconditions_1.and(_string, preconditions_1.every(common_validators_1.name))),
    'email': preconditions_1.and(preconditions_1.notNull, preconditions_1.and(_string, preconditions_1.every(common_validators_1.email))),
    'password': preconditions_1.and(preconditions_1.notNull, preconditions_1.and(_string, preconditions_1.every(common_validators_1.password)))
};
/**
 * partialValidators for Admin provided as a map.
 */
exports.partialValidators = {
    'name': preconditions_1.and(preconditions_1.notNull, preconditions_1.and(_string, preconditions_1.every(common_validators_1.name))),
    'email': preconditions_1.and(preconditions_1.notNull, preconditions_1.and(_string, preconditions_1.every(common_validators_1.email))),
    'password': preconditions_1.and(preconditions_1.notNull, preconditions_1.and(_string, preconditions_1.every(common_validators_1.password)))
};
/**
 * validate a single Value against the rules for Admin.
 */
exports.validate = preconditions_1.and(record_1.isRecord, record_1.restrict(exports.validators));
/**
 * validate a single Value against the rules for a partial Admin.
 */
exports.validatePartial = preconditions_1.and(record_1.isRecord, record_1.intersect(exports.partialValidators));
//# sourceMappingURL=admin.js.map