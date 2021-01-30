"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timestamp = void 0;
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
//# sourceMappingURL=filters.js.map