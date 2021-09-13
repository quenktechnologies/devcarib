"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPartial = exports.check = exports.partialChecks = exports.checks = void 0;
//@ts-ignore: 6133
var async_1 = require("@quenk/preconditions/lib/async");
//@ts-ignore: 6133
var record_1 = require("@quenk/preconditions/lib/async/record");
var job_1 = require("@board/validators/lib/job");
var checks_1 = require("./checks");
//@ts-ignore: 6133
var _title = 'Job';
//@ts-ignore: 6133
var _collection = 'jobs';
/**
 * checks for Job provided as a map.
 */
exports.checks = {
    'id': async_1.every(checks_1.inc('counters.jobs'), checks_1.unique('jobs', 'id')),
    'title': async_1.identity,
    'type': async_1.identity,
    'location': async_1.identity,
    'remote': async_1.identity,
    'description': async_1.identity,
    'description_html': async_1.identity,
    'company': async_1.identity,
    'company_email': async_1.identity,
    'company_logo': async_1.identity,
    'apply_url': async_1.identity,
    'approved': async_1.identity,
    'payment_currency': async_1.identity,
    'payment_amount': async_1.identity,
    'payment_frequency': async_1.identity,
    'status': async_1.identity,
    'created_by': async_1.identity,
    'created_on': async_1.identity,
    'last_updated_on': async_1.identity,
    'last_updated_by': async_1.identity
};
/**
 * partialChecks for Job provided as a map.
 */
exports.partialChecks = {
    'id': async_1.identity,
    'title': async_1.identity,
    'type': async_1.identity,
    'location': async_1.identity,
    'remote': async_1.identity,
    'description': async_1.identity,
    'description_html': async_1.identity,
    'company': async_1.identity,
    'company_email': async_1.identity,
    'company_logo': async_1.identity,
    'apply_url': async_1.identity,
    'approved': async_1.identity,
    'payment_currency': async_1.identity,
    'payment_amount': async_1.identity,
    'payment_frequency': async_1.identity,
    'status': async_1.identity,
    'created_by': async_1.identity,
    'created_on': async_1.identity,
    'last_updated_on': async_1.identity,
    'last_updated_by': async_1.identity
};
/**
 * check a Job value.
 */
exports.check = async_1.and(async_1.and(async_1.async(job_1.validate), record_1.restrict(exports.checks)), async_1.every(checks_1.parseMarkdown('description', 'description_html')));
/**
 * checkPartial a partial Job value.
 */
exports.checkPartial = async_1.and(async_1.and(async_1.async(job_1.validatePartial), record_1.intersect(exports.partialChecks)), async_1.every(checks_1.parseMarkdown('description', 'description_html')));
//# sourceMappingURL=job.js.map