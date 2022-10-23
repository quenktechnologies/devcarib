"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePartial = exports.validate = exports.partialValidators = exports.validators = void 0;
//@ts-ignore: 6133
const preconditions_1 = require("@quenk/preconditions");
//@ts-ignore: 6133
const record_1 = require("@quenk/preconditions/lib/record");
//@ts-ignore: 6133
const number_1 = require("@quenk/preconditions/lib/number");
//@ts-ignore: 6133
const string_1 = require("@quenk/preconditions/lib/string");
const validators_1 = require("@devcarib/common/lib/data/validators");
//@ts-ignore: 6133
const _string = (0, preconditions_1.and)(string_1.isString, string_1.trim);
/**
 * validators for User provided as a map.
 */
exports.validators = {
    'name': (0, preconditions_1.and)(preconditions_1.notNull, (0, preconditions_1.and)(_string, (0, preconditions_1.every)(validators_1.name))),
    'username': (0, preconditions_1.and)(preconditions_1.notNull, (0, preconditions_1.and)(_string, (0, preconditions_1.every)(validators_1.username))),
    'password': (0, preconditions_1.and)(preconditions_1.notNull, (0, preconditions_1.and)(_string, (0, preconditions_1.every)(validators_1.password))),
    'status': (0, preconditions_1.and)(preconditions_1.notNull, number_1.toNumber),
};
/**
 * partialValidators for User provided as a map.
 */
exports.partialValidators = {
    'name': (0, preconditions_1.and)(preconditions_1.notNull, (0, preconditions_1.and)(_string, (0, preconditions_1.every)(validators_1.name))),
    'username': (0, preconditions_1.and)(preconditions_1.notNull, (0, preconditions_1.and)(_string, (0, preconditions_1.every)(validators_1.username))),
    'password': (0, preconditions_1.and)(preconditions_1.notNull, (0, preconditions_1.and)(_string, (0, preconditions_1.every)(validators_1.password))),
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