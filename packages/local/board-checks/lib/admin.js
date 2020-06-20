"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.check = void 0;
var _1 = require("./");
var async_1 = require("@quenk/preconditions/lib/async");
var record_1 = require("@quenk/preconditions/lib/async/record");
var admin_1 = require("@board/validation/lib/admin");
/**
 * check function for Admin types.
 */
exports.check = async_1.and(async_1.async(admin_1.validate), record_1.restrict({
    id: _1.inc('admins'),
    name: async_1.identity,
    email: async_1.identity,
    password: _1.bcrypt,
}));
//# sourceMappingURL=admin.js.map