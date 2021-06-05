"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.salaryRange = exports.maxLength = exports.minLength = exports.textlarge = exports.textmedium = exports.textsmall = exports.url = exports.password = exports.email = exports.name = void 0;
var string = require("@quenk/preconditions/lib/string");
var array = require("@quenk/preconditions/lib/array");
var preconditions_1 = require("@quenk/preconditions");
var array_1 = require("@quenk/noni/lib/data/array");
var result_1 = require("@quenk/preconditions/lib/result");
var salary_range_1 = require("@board/common/lib/data/post/salary-range");
/**
 * name must be a string and between 1-64 characters.
 *
 * Todo: ensure proper case.
 */
exports.name = preconditions_1.and(string.isString, preconditions_1.and(string.minLength(1), string.maxLength(64)));
/**
 * email must be a string between 3-64 characters and contain "@".
 */
exports.email = preconditions_1.and(string.isString, preconditions_1.and(preconditions_1.and(string.minLength(3), string.maxLength(64)), string.matches(/@/)));
/**
 * password must be a string between 8-140 characters.
 */
exports.password = preconditions_1.and(string.isString, preconditions_1.and(string.minLength(8), string.maxLength(140)));
/**
 * url must be a string of at least 7 characters and begin with http or https.
 */
exports.url = preconditions_1.and(string.isString, preconditions_1.and(preconditions_1.and(string.minLength(7), string.maxLength(5000)), string.matches(/^(http|https):\/\//)));
/**
 * textsmall is 256 characters or less.
 */
exports.textsmall = preconditions_1.and(string.isString, preconditions_1.and(string.minLength(0), string.maxLength(256)));
/**
 * textmedium is 5000 characters or less.
 */
exports.textmedium = preconditions_1.and(string.isString, preconditions_1.and(string.minLength(0), string.maxLength(5000)));
/**
 * textlarge is 25K characters or less.
 */
exports.textlarge = preconditions_1.and(string.isString, preconditions_1.and(string.minLength(0), string.maxLength(25 * 1000)));
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
 * salaryRange ensures the provided string is one of the salary range strings.
 */
var salaryRange = function (value) {
    return array_1.contains(salary_range_1.ranges, value) ? result_1.succeed(value) : result_1.fail('invalid', { value: value });
};
exports.salaryRange = salaryRange;
//# sourceMappingURL=validators.js.map