"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPartial = exports.check = exports.partialChecks = exports.checks = void 0;
//@ts-ignore: 6133
const async_1 = require("@quenk/preconditions/lib/async");
//@ts-ignore: 6133
const record_1 = require("@quenk/preconditions/lib/async/record");
const event_1 = require("@mia/validators/lib/event");
const checks_1 = require("@devcarib/server/lib/data/checks");
//@ts-ignore: 6133
const _title = 'Event';
//@ts-ignore: 6133
const _collection = 'events';
/**
 * checks for Event provided as a map.
 */
exports.checks = {
    'id': (0, async_1.every)((0, checks_1.unique)('events', 'id')),
    'title': async_1.identity,
    'startDate': async_1.identity,
    'startTime': async_1.identity,
    'startDateTime': async_1.identity,
    'tzOffset': async_1.identity,
    'endDate': async_1.identity,
    'endTime': async_1.identity,
    'endDateTime': async_1.identity,
    'url': async_1.identity,
    'location': async_1.identity,
    'host': async_1.identity,
    'description': async_1.identity,
    'description_html': async_1.identity,
    'created_by': async_1.identity,
    'created_on': async_1.identity,
    'last_updated_on': async_1.identity,
    'last_updated_by': async_1.identity
};
/**
 * partialChecks for Event provided as a map.
 */
exports.partialChecks = {
    'id': async_1.identity,
    'title': async_1.identity,
    'startDate': async_1.identity,
    'startTime': async_1.identity,
    'startDateTime': async_1.identity,
    'tzOffset': async_1.identity,
    'endDate': async_1.identity,
    'endTime': async_1.identity,
    'endDateTime': async_1.identity,
    'url': async_1.identity,
    'location': async_1.identity,
    'host': async_1.identity,
    'description': async_1.identity,
    'description_html': async_1.identity,
    'created_by': async_1.identity,
    'created_on': async_1.identity,
    'last_updated_on': async_1.identity,
    'last_updated_by': async_1.identity
};
/**
 * check a Event value.
 */
exports.check = (0, async_1.and)((0, async_1.and)((0, async_1.async)(event_1.validate), (0, record_1.restrict)(exports.checks)), (0, async_1.every)((0, checks_1.parseMarkdown)('description', 'description_html'), (0, checks_1.inc)('events'), (0, checks_1.datetime)('startDateTime', 'startDate', 'startTime', 'tzOffset'), (0, checks_1.datetime)('endDateTime', 'endDate', 'endTime', 'tzOffset')));
/**
 * checkPartial a partial Event value.
 */
exports.checkPartial = (0, async_1.and)((0, async_1.and)((0, async_1.async)(event_1.validatePartial), (0, record_1.intersect)(exports.partialChecks)), (0, async_1.every)((0, checks_1.parseMarkdown)('description', 'description_html')));
//# sourceMappingURL=event.js.map