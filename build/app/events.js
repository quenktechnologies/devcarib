"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.started = exports.connected = void 0;
const future_1 = require("@quenk/noni/lib/control/monad/future");
/**
 * connected hook sample.
 */
exports.connected = () => future_1.pure(console.info('board: Connections established.'));
/**
 * started hook sample
 */
exports.started = () => future_1.pure(console.info('board: running'));
//# sourceMappingURL=events.js.map