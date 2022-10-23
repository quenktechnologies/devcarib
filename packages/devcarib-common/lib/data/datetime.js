"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOffset = exports.now = void 0;
const moment = require("moment");
/**
 * now produces a JS Date object at the current time in UTC.
 */
const now = () => moment.utc().toDate();
exports.now = now;
/**
 * getOffset provides the TZ offset from the provided Date value or constructs
 * one if not passed.
 *
 * The TZ offset is of the form +00:00.
 */
const getOffset = (date = (0, exports.now)()) => {
    let value = date.getTimezoneOffset();
    let sign = value > 0 ? '-' : '+';
    let offset = Math.abs(value);
    let hrs = Math.floor(offset / 60);
    let padHrs = hrs < 10 ? '0' : '';
    let mins = offset % 60;
    let padMin = mins < 10 ? '0' : '';
    return `${sign}${padHrs}${hrs}:${padMin}${mins}`;
};
exports.getOffset = getOffset;
//# sourceMappingURL=datetime.js.map