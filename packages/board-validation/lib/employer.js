"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var preconditions_1 = require("@quenk/preconditions");
var record_1 = require("@quenk/preconditions/lib/record");
var string_1 = require("@quenk/preconditions/lib/string");
/**
 * Validate a JSON value to see if it's an Employer.
 */
exports.validate = preconditions_1.and(record_1.isRecord, record_1.restrict({
    name: string_1.isString,
    website: preconditions_1.optional(string_1.isString),
    email: string_1.isString,
    password: string_1.isString,
    description: string_1.isString
}));
//# sourceMappingURL=employer.js.map