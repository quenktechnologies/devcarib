"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timefromnow = exports.timestamp = void 0;
const moment = require("moment");
/**
 * timestamp displays a date in the follwing format: "January 30th 2021".
 */
exports.timestamp = (str) => {
    let stamp = moment(str);
    if ((str === '') || (!stamp.isValid()))
        return '';
    return stamp.format('MMMM Do YYYY');
};
/**
 * timefromnow displays the distance of a date from the current date.
 */
exports.timefromnow = (str) => {
    let date = moment(str);
    if ((str === '') || (!date.isValid()))
        return '';
    return date.fromNow();
};
//# sourceMappingURL=filters.js.map