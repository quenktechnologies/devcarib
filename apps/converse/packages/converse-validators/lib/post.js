"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePartial = exports.validate = exports.partialValidators = exports.validators = void 0;
//@ts-ignore: 6133
var preconditions_1 = require("@quenk/preconditions");
//@ts-ignore: 6133
var record_1 = require("@quenk/preconditions/lib/record");
//@ts-ignore: 6133
var string_1 = require("@quenk/preconditions/lib/string");
var validators_1 = require("@devcarib/common/lib/data/validators");
//@ts-ignore: 6133
var _string = (0, preconditions_1.and)(string_1.isString, string_1.trim);
/**
 * validators for Post provided as a map.
 */
exports.validators = {
    'title': (0, preconditions_1.and)(preconditions_1.notNull, (0, preconditions_1.and)(_string, (0, preconditions_1.every)(validators_1.textsmall, (0, validators_1.minLength)(3), (0, validators_1.maxLength)(140)))),
    'body': (0, preconditions_1.optional)((0, preconditions_1.and)(_string, (0, preconditions_1.every)(validators_1.textlarge, (0, validators_1.minLength)(3), (0, validators_1.maxLength)(10000)))),
};
/**
 * partialValidators for Post provided as a map.
 */
exports.partialValidators = {
    'title': (0, preconditions_1.and)(preconditions_1.notNull, (0, preconditions_1.and)(_string, (0, preconditions_1.every)(validators_1.textsmall, (0, validators_1.minLength)(3), (0, validators_1.maxLength)(140)))),
    'body': (0, preconditions_1.optional)((0, preconditions_1.and)(_string, (0, preconditions_1.every)(validators_1.textlarge, (0, validators_1.minLength)(3), (0, validators_1.maxLength)(10000)))),
};
/**
 * validate a single Value against the rules for Post.
 */
exports.validate = (0, preconditions_1.and)(record_1.isRecord, (0, record_1.restrict)(exports.validators));
/**
 * validate a single Value against the rules for a partial Post.
 */
exports.validatePartial = (0, preconditions_1.and)(record_1.isRecord, (0, record_1.intersect)(exports.partialValidators));
//# sourceMappingURL=post.js.map