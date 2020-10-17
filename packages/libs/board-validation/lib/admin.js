"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePartial = exports.validate = exports.partialValidators = exports.validators = void 0;
//@ts-ignore: 6133
var preconditions_1 = require("@quenk/preconditions");
//@ts-ignore: 6133
var record_1 = require("@quenk/preconditions/lib/record");
//@ts-ignore: 6133
var number_1 = require("@quenk/preconditions/lib/number");
//@ts-ignore: 6133
var string_1 = require("@quenk/preconditions/lib/string");
/**
 * validators for Admin provided as a map.
 */
exports.validators = {
    'id': number_1.toNumber,
    'name': string_1.isString,
    'email': string_1.isString,
    'password': string_1.isString
};
/**
 * partialValidators for Admin provided as a map.
 */
exports.partialValidators = {
    'id': number_1.toNumber,
    'name': string_1.isString,
    'email': string_1.isString,
    'password': string_1.isString
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