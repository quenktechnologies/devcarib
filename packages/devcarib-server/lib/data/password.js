"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compare = void 0;
const bcrypt = require("bcryptjs");
const future_1 = require("@quenk/noni/lib/control/monad/future");
/**
 * compare two bcrypt hashes for equality.
 */
const compare = (pwd1, pwd2) => (0, future_1.fromCallback)(cb => bcrypt.compare(pwd1, pwd2, cb));
exports.compare = compare;
//# sourceMappingURL=password.js.map