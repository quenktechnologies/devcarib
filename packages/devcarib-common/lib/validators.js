"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobStatus = exports.paymentFrequency = exports.currency = exports.maxLength = exports.minLength = exports.textlarge = exports.textmedium = exports.textsmall = exports.url = exports.password = exports.email = exports.name = void 0;
var string = require("@quenk/preconditions/lib/string");
var array = require("@quenk/preconditions/lib/array");
var preconditions_1 = require("@quenk/preconditions");
var array_1 = require("@quenk/noni/lib/data/array");
var result_1 = require("@quenk/preconditions/lib/result");
var currency_1 = require("./data/currency");
var payment_1 = require("./data/payment");
var job_1 = require("./data/job");
/**
 * name must be a string and between 1-64 characters.
 *
 * Todo: ensure proper case.
 */
exports.name = (0, preconditions_1.and)(string.isString, (0, preconditions_1.and)(string.minLength(1), string.maxLength(64)));
/**
 * email must be a string between 3-64 characters and contain "@".
 */
exports.email = (0, preconditions_1.and)(string.isString, (0, preconditions_1.and)((0, preconditions_1.and)(string.minLength(3), string.maxLength(64)), string.matches(/@/)));
/**
 * password must be a string between 8-140 characters.
 */
exports.password = (0, preconditions_1.and)(string.isString, (0, preconditions_1.and)(string.minLength(8), string.maxLength(140)));
/**
 * url must be a string of at least 7 characters and begin with http or https.
 */
exports.url = (0, preconditions_1.and)(string.isString, (0, preconditions_1.and)((0, preconditions_1.and)(string.minLength(7), string.maxLength(5000)), string.matches(/^(http|https):\/\//)));
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
var minLength = function (n) {
    return function (value) { return Array.isArray(value) ?
        array.min(n)(value) :
        string.minLength(n)(value); };
};
exports.minLength = minLength;
/**
 * maxLength for strings and array.
 */
var maxLength = function (n) {
    return function (value) { return Array.isArray(value) ?
        array.max(n)(value) :
        string.maxLength(n)(value); };
};
exports.maxLength = maxLength;
/**
 * currency ensures the provided string is one of the supported currency
 * indicators.
 */
var currency = function (value) {
    return (0, array_1.contains)(currency_1.supportedCurrencies, value) ?
        (0, result_1.succeed)(value) :
        (0, result_1.fail)('invalid', { value: value });
};
exports.currency = currency;
/**
 * paymentFrequency is one of several period specifiers that indicate how
 * often a payment will be made.
 */
var paymentFrequency = function (value) {
    return (0, array_1.contains)(payment_1.supportedPaymentFrequencies, value) ?
        (0, result_1.succeed)(value) :
        (0, result_1.fail)('invalid', { value: value });
};
exports.paymentFrequency = paymentFrequency;
/**
 * jobStatus must be one of the predefined job posting statuses.
 */
var jobStatus = function (value) {
    return (0, array_1.contains)(job_1.jobStatuses, value) ?
        (0, result_1.succeed)(value) :
        (0, result_1.fail)('invalid', { value: value });
};
exports.jobStatus = jobStatus;
//# sourceMappingURL=validators.js.map