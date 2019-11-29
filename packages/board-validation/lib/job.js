"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var preconditions_1 = require("@quenk/preconditions");
var record_1 = require("@quenk/preconditions/lib/record");
var string_1 = require("@quenk/preconditions/lib/string");
/**
 * validate a JSON value as a Job.
 */
exports.validate = preconditions_1.and(record_1.isRecord, record_1.restrict({
    title: preconditions_1.every(string_1.isString, string_1.trim, string_1.minLength(3), string_1.maxLength(140)),
    country: preconditions_1.every(string_1.isString, string_1.trim, string_1.minLength(3), string_1.maxLength(140)),
    city: preconditions_1.every(string_1.isString, string_1.trim, string_1.minLength(3), string_1.maxLength(140)),
    type: preconditions_1.every(string_1.isString, string_1.trim, string_1.minLength(3), string_1.maxLength(512)),
    role: preconditions_1.every(string_1.isString, string_1.trim, string_1.minLength(3), string_1.maxLength(255)),
    industry: preconditions_1.optional(preconditions_1.every(string_1.isString, string_1.trim, string_1.minLength(3), string_1.maxLength(140))),
    technologies: preconditions_1.optional(preconditions_1.every(string_1.isString, string_1.trim, string_1.maxLength(512))),
    description: preconditions_1.every(string_1.isString, string_1.trim, string_1.minLength(1), string_1.maxLength(5000)),
    link: preconditions_1.optional(preconditions_1.every(string_1.isString, string_1.trim, string_1.minLength(3), string_1.maxLength(1024))),
}));
//# sourceMappingURL=job.js.map