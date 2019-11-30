"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var preconditions_1 = require("@quenk/preconditions");
var record_1 = require("@quenk/preconditions/lib/record");
var string_1 = require("@quenk/preconditions/lib/string");
/**
 * Validate a JSON value to see if it's an Employer.
 */
exports.validate = preconditions_1.and(record_1.isRecord, record_1.restrict({
    name: preconditions_1.every(string_1.isString, string_1.trim, string_1.minLength(3), string_1.maxLength(140)),
    website: preconditions_1.optional(preconditions_1.every(string_1.isString, string_1.trim, string_1.maxLength(2048))),
    email: preconditions_1.every(string_1.isString, string_1.trim, string_1.minLength(3), string_1.maxLength(255)),
    password: preconditions_1.every(string_1.isString, string_1.trim, string_1.minLength(8), string_1.maxLength(512)),
    description: preconditions_1.every(string_1.isString, string_1.trim, string_1.maxLength(3000)),
}));
//# sourceMappingURL=employer.js.map