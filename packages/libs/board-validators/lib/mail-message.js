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
var _string = preconditions_1.and(string_1.isString, string_1.trim);
/**
 * validators for MailMessage provided as a map.
 */
exports.validators = {
    'to': preconditions_1.and(preconditions_1.notNull, _string),
    'from': preconditions_1.and(preconditions_1.notNull, _string),
    'body': preconditions_1.and(preconditions_1.notNull, _string)
};
/**
 * partialValidators for MailMessage provided as a map.
 */
exports.partialValidators = {
    'to': preconditions_1.and(preconditions_1.notNull, _string),
    'from': preconditions_1.and(preconditions_1.notNull, _string),
    'body': preconditions_1.and(preconditions_1.notNull, _string)
};
/**
 * validate a single Value against the rules for MailMessage.
 */
exports.validate = preconditions_1.and(record_1.isRecord, record_1.restrict(exports.validators));
/**
 * validate a single Value against the rules for a partial MailMessage.
 */
exports.validatePartial = preconditions_1.and(record_1.isRecord, record_1.intersect(exports.partialValidators));
//# sourceMappingURL=mail-message.js.map