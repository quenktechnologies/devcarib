"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePartial = exports.validate = exports.partialValidators = exports.validators = void 0;
//@ts-ignore: 6133
var preconditions_1 = require("@quenk/preconditions");
//@ts-ignore: 6133
var record_1 = require("@quenk/preconditions/lib/record");
//@ts-ignore: 6133
var string_1 = require("@quenk/preconditions/lib/string");
//@ts-ignore: 6133
var _string = (0, preconditions_1.and)(string_1.isString, string_1.trim);
/**
 * validators for Login provided as a map.
 */
exports.validators = {
    'email': (0, preconditions_1.and)(preconditions_1.notNull, _string),
    'password': (0, preconditions_1.and)(preconditions_1.notNull, _string)
};
/**
 * partialValidators for Login provided as a map.
 */
exports.partialValidators = {
    'email': (0, preconditions_1.and)(preconditions_1.notNull, _string),
    'password': (0, preconditions_1.and)(preconditions_1.notNull, _string)
};
/**
 * validate a single Value against the rules for Login.
 */
exports.validate = (0, preconditions_1.and)(record_1.isRecord, (0, record_1.restrict)(exports.validators));
/**
 * validate a single Value against the rules for a partial Login.
 */
exports.validatePartial = (0, preconditions_1.and)(record_1.isRecord, (0, record_1.intersect)(exports.partialValidators));
//# sourceMappingURL=login.js.map