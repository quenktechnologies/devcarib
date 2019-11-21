"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs = require("bcryptjs");
const future_1 = require("@quenk/noni/lib/control/monad/future");
const result_1 = require("@quenk/preconditions/lib/result");
const monad_1 = require("@quenk/noni/lib/control/monad");
const employer_1 = require("../validation/employer");
const async_1 = require("@quenk/preconditions/lib/async");
const record_1 = require("@quenk/preconditions/lib/async/record");
const salt = () => future_1.fromCallback(cb => bcryptjs.genSalt(12, cb));
const hash = (str, salt) => future_1.fromCallback(cb => bcryptjs.hash(str, salt, cb));
exports.bcrypt = (str) => monad_1.doN(function* () {
    let salty = yield salt();
    let salted = yield hash(str, salty);
    return future_1.pure(result_1.succeed(salted));
});
exports.check = async_1.and(async_1.async(employer_1.validate), record_1.disjoint({
    password: exports.bcrypt
}));
//# sourceMappingURL=employer.js.map