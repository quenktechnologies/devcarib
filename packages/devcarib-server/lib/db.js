"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unsafeGetConnection = exports.getConnection = void 0;
const connection_1 = require("@quenk/tendril/lib/app/connection");
/**
 * getConnection from tendril's internal connection pool by id.
 */
const getConnection = (id = 'main') => (0, connection_1.getUserConnection)(id);
exports.getConnection = getConnection;
/**
 * unsafeGetConnection form tendril's internal connection pool by id.
 *
 * This can cause the app to crash if the id was not found.
 */
const unsafeGetConnection = (id = 'main') => (0, connection_1.unsafeGetUserConnection)(id);
exports.unsafeGetConnection = unsafeGetConnection;
//# sourceMappingURL=db.js.map