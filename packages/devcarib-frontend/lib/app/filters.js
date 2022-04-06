"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromNow = void 0;
const moment = require("moment");
/**
 * fromNow formats a datetime string to relative time.
 */
const fromNow = (date) => {
    let ref = moment.utc(date);
    return ref.isValid() ? ref.fromNow() : '';
};
exports.fromNow = fromNow;
//# sourceMappingURL=filters.js.map