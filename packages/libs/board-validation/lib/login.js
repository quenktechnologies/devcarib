"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.schema = void 0;
var preconditions_1 = require("@quenk/preconditions");
var record_1 = require("@quenk/preconditions/lib/record");
var string_1 = require("@quenk/preconditions/lib/string");
/**
 * schema implementation
 */
exports.schema = {
    email: preconditions_1.and(preconditions_1.notNull, preconditions_1.every(string_1.isString, string_1.trim, string_1.minLength(3), string_1.maxLength(140))),
    password: preconditions_1.and(preconditions_1.notNull, preconditions_1.every(string_1.isString, string_1.trim, string_1.minLength(1), string_1.maxLength(512))),
};
/**
 * validate a JSON value against the Login credential rules.
 */
exports.validate = preconditions_1.and(record_1.isRecord, record_1.restrict(exports.schema));
//# sourceMappingURL=login.js.map