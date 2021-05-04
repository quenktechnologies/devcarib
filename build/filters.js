"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timefromnow = exports.timestamp = void 0;
const moment = require("moment");
/**
 * timestamp displays a date in the follwing format: "January 30th 2021".
 */
const timestamp = (str) => {
    let stamp = moment(str);
    if ((str === '') || (!stamp.isValid()))
        return '';
    return stamp.format('MMMM Do YYYY');
};
exports.timestamp = timestamp;
/**
 * timefromnow displays the distance of a date from the current date.
 */
const timefromnow = (str) => {
    let date = moment(str);
    if ((str === '') || (!date.isValid()))
        return '';
    return date.fromNow();
};
exports.timefromnow = timefromnow;
//# sourceMappingURL=filters.js.map