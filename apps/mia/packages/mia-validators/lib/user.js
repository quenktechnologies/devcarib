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
//@ts-ignore: 6133
var _string = (0, preconditions_1.and)(string_1.isString, string_1.trim);
/**
 * validators for User provided as a map.
 */
exports.validators = {
    'name': (0, preconditions_1.and)(preconditions_1.notNull, _string),
    'username': (0, preconditions_1.and)(preconditions_1.notNull, _string),
    'password': (0, preconditions_1.and)(preconditions_1.notNull, _string),
    'status': (0, preconditions_1.and)(preconditions_1.notNull, number_1.toNumber),
};
/**
 * partialValidators for User provided as a map.
 */
exports.partialValidators = {
    'name': (0, preconditions_1.and)(preconditions_1.notNull, _string),
    'username': (0, preconditions_1.and)(preconditions_1.notNull, _string),
    'password': (0, preconditions_1.and)(preconditions_1.notNull, _string),
    'status': (0, preconditions_1.and)(preconditions_1.notNull, number_1.toNumber),
};
/**
 * validate a single Value against the rules for User.
 */
exports.validate = (0, preconditions_1.and)(record_1.isRecord, (0, record_1.restrict)(exports.validators));
/**
 * validate a single Value against the rules for a partial User.
 */
exports.validatePartial = (0, preconditions_1.and)(record_1.isRecord, (0, record_1.intersect)(exports.partialValidators));
//# sourceMappingURL=user.js.map