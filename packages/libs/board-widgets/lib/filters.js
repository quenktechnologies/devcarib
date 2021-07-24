"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.truncate = exports.timefromnow = exports.timestamp = void 0;
var moment = require("moment");
/**
 * timestamp displays a date in the follwing format: "January 30th 2021".
 */
var timestamp = function (str) {
    var stamp = moment(str);
    if ((str === '') || (!stamp.isValid()))
        return '';
    return stamp.format('MMMM Do YYYY');
};
exports.timestamp = timestamp;
/**
 * timefromnow displays the distance of a date from the current date.
 */
var timefromnow = function (str) {
    var date = moment(str);
    if ((str === '') || (!date.isValid()))
        return '';
    return date.fromNow();
};
exports.timefromnow = timefromnow;
/**
 * truncate a string over the specified limit replacing the rest of the
 * characters with an ellipsis.
 */
var truncate = function (limit) { return function (str) {
    if (str === void 0) { str = ''; }
    return (str.length > limit) ? str.substr(0, limit) + "..." : str;
}; };
exports.truncate = truncate;
//# sourceMappingURL=filters.js.map