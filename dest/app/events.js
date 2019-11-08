"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const future_1 = require("@quenk/noni/lib/control/monad/future");
/**
 * connected hook sample.
 */
exports.connected = () => future_1.pure(console.info('{{{project.name}}}: Connections established.'));
/**
 * started hook sample
 */
exports.started = () => future_1.pure(console.info('{{{project.name}}}: running'));
//# sourceMappingURL=events.js.map