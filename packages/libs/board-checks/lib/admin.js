"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patch = exports.post = void 0;
var _1 = require("./");
var async_1 = require("@quenk/preconditions/lib/async");
var record_1 = require("@quenk/preconditions/lib/async/record");
var admin_1 = require("@board/validation/lib/admin");
/**
 * post check function for Admin types.
 */
exports.post = async_1.and(async_1.async(admin_1.validate), record_1.restrict({
    id: _1.inc('admins'),
    name: async_1.identity,
    email: async_1.and(async_1.identity, _1.unique('admins', 'email')),
    password: _1.bcrypt,
}));
/**
 * patch check function for Admin types.
 */
exports.patch = async_1.and(async_1.async(admin_1.validate), record_1.intersect({
    password: _1.bcrypt,
}));
//# sourceMappingURL=admin.js.map