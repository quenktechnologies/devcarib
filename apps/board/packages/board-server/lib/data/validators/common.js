"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobStatus = exports.paymentFrequency = exports.currency = exports.boolean = exports.tzoffset = exports.time = exports.date = exports.maxLength = exports.minLength = exports.textlarge = exports.textmedium = exports.textsmall = exports.url = exports.password = exports.username = exports.email = exports.name = void 0;
const string = require("@quenk/preconditions/lib/string");
const array = require("@quenk/preconditions/lib/array");
const preconditions_1 = require("@quenk/preconditions");
const array_1 = require("@quenk/noni/lib/data/array");
const datetime_1 = require("@quenk/noni/lib/data/datetime");
const result_1 = require("@quenk/preconditions/lib/result");
const currency_1 = require("../currency");
const payment_1 = require("../payment");
const job_1 = require("../job");
/**
 * name must be a string and between 1-64 characters.
 *
 * Todo: ensure proper case.
 */
exports.name = (0, preconditions_1.and)(string.isString, (0, preconditions_1.and)(string.minLength(1), string.maxLength(64)));
/**
 * email must be a string between 3-64 characters and contain "@".
 */
exports.email = (0, preconditions_1.and)(string.isString, (0, preconditions_1.and)(string.lowercase, (0, preconditions_1.and)((0, preconditions_1.and)(string.minLength(3), string.maxLength(64)), string.matches(/@/))));
/**
 * username must be 3-12 characters and must begin with a letter.
 */
exports.username = (0, preconditions_1.and)(string.isString, (0, preconditions_1.and)(string.lowercase, (0, preconditions_1.and)((0, preconditions_1.and)(string.minLength(3), string.maxLength(12)), string.matches(/^[a-z][0-9a-z$@_]+/))));
/**
 * password must be a string between 8-140 characters.
 */
exports.password = (0, preconditions_1.and)(string.isString, (0, preconditions_1.and)(string.minLength(8), string.maxLength(140)));
/**
 * url must be a string of at least 7 characters and begin with http or https.
 */
exports.url = (0, preconditions_1.and)(string.isString, (0, preconditions_1.and)(string.lowercase, (0, preconditions_1.and)((0, preconditions_1.and)(string.minLength(7), string.maxLength(5000)), string.matches(/^(http|https):\/\//))));
/**
 * textsmall is 256 characters or less.
 */
exports.textsmall = (0, preconditions_1.and)(string.isString, (0, preconditions_1.and)(string.minLength(0), string.maxLength(256)));
/**
 * textmedium is 5000 characters or less.
 */
exports.textmedium = (0, preconditions_1.and)(string.isString, (0, preconditions_1.and)(string.minLength(0), string.maxLength(5000)));
/**
 * textlarge is 25K characters or less.
 */
exports.textlarge = (0, preconditions_1.and)(string.isString, (0, preconditions_1.and)(string.minLength(0), string.maxLength(25 * 1000)));
/**
 * minLength for strings and array.
 */
const minLength = (n) => (value) => Array.isArray(value) ?
    array.min(n)(value) :
    string.minLength(n)(value);
exports.minLength = minLength;
/**
 * maxLength for strings and array.
 */
const maxLength = (n) => (value) => Array.isArray(value) ?
    array.max(n)(value) :
    string.maxLength(n)(value);
exports.maxLength = maxLength;
/**
 * date must be a valid ISO8601 date.
 */
const date = (value) => {
    let dateString = (0, datetime_1.parseDate)(String(value));
    return (dateString !== '') ? (0, result_1.succeed)(dateString) : (0, result_1.fail)('date', { value });
};
exports.date = date;
const timeRegex = /^([01][0-9]|2[0-3]):([0-5][0-9])$/;
/**
 * time only supports hh:mm.
 */
const time = (value) => timeRegex.test(String(value)) ? (0, result_1.succeed)(value) : (0, result_1.fail)('time', { value });
exports.time = time;
const tzoffsetRegex = /^[+-][01][0-9]:[0-5][0-9]$/;
/**
 * tzoffset in the format +04:00
 */
const tzoffset = (value) => tzoffsetRegex.test(String(value)) ?
    (0, result_1.succeed)(value) : (0, result_1.fail)('tzoffset', { value });
exports.tzoffset = tzoffset;
/**
 * boolean casts a value to a JS boolean.
 */
const boolean = (value) => (0, result_1.succeed)(Boolean(value));
exports.boolean = boolean;
/**
 * currency ensures the provided string is one of the supported currency
 * indicators.
 */
const currency = (value) => (0, array_1.contains)(currency_1.supportedCurrencies, value) ?
    (0, result_1.succeed)(value) :
    (0, result_1.fail)('invalid', { value });
exports.currency = currency;
/**
 * paymentFrequency is one of several period specifiers that indicate how
 * often a payment will be made.
 */
const paymentFrequency = (value) => (0, array_1.contains)(payment_1.supportedPaymentFrequencies, value) ?
    (0, result_1.succeed)(value) :
    (0, result_1.fail)('invalid', { value });
exports.paymentFrequency = paymentFrequency;
/**
 * jobStatus must be one of the predefined job posting statuses.
 */
const jobStatus = (value) => (0, array_1.contains)(job_1.jobStatuses, value) ?
    (0, result_1.succeed)(value) :
    (0, result_1.fail)('invalid', { value });
exports.jobStatus = jobStatus;
//# sourceMappingURL=common.js.map