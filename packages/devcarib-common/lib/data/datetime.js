"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.now = void 0;
var moment = require("moment");
/**
 * now produces a JS Date object at the current time in UTC.
 */
var now = function () { return moment.utc().toDate(); };
exports.now = now;
//# sourceMappingURL=datetime.js.map