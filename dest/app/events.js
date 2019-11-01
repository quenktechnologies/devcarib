"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var future_1 = require("@quenk/noni/lib/control/monad/future");
/**
 * connected hook sample.
 */
exports.connected = function () {
    return future_1.pure(console.info('{{{project.name}}}: Connections established.'));
};
/**
 * started hook sample
 */
exports.started = function () {
    return future_1.pure(console.info('{{{project.name}}}: running'));
};
//# sourceMappingURL=events.js.map