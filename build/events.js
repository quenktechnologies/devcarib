"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.started = exports.connected = void 0;
const future_1 = require("@quenk/noni/lib/control/monad/future");
/**
 * connected hook sample.
 */
const connected = () => future_1.pure(console.info('board: Connections established.'));
exports.connected = connected;
/**
 * started hook sample
 */
const started = () => future_1.pure(console.info('board: running'));
exports.started = started;
//# sourceMappingURL=events.js.map