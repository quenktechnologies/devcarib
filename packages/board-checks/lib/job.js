"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.check = void 0;
var _1 = require("./");
var async_1 = require("@quenk/preconditions/lib/async");
var record_1 = require("@quenk/preconditions/lib/async/record");
var job_1 = require("@board/validation/lib/job");
/**
 * check for Job type.
 */
exports.check = async_1.and(async_1.async(job_1.validate), record_1.restrict({
    id: _1.id,
    title: async_1.identity,
    country: async_1.identity,
    city: async_1.identity,
    type: async_1.identity,
    role: async_1.identity,
    industry: async_1.identity,
    technologies: async_1.identity,
    description: async_1.identity,
    link: async_1.identity
}));
//# sourceMappingURL=job.js.map