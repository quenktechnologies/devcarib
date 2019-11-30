"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var async_1 = require("@quenk/preconditions/lib/async");
var record_1 = require("@quenk/preconditions/lib/async/record");
var employer_1 = require("@board/validation/lib/employer");
var _1 = require("./");
/**
 * check for Employer type.
 */
exports.check = async_1.and(async_1.async(employer_1.validate), record_1.restrict({
    id: _1.id,
    name: async_1.identity,
    website: async_1.identity,
    email: async_1.identity,
    password: _1.bcrypt,
    description: async_1.identity
}));
//# sourceMappingURL=employer.js.map