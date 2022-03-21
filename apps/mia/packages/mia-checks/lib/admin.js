"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPartial = exports.check = exports.partialChecks = exports.checks = void 0;
//@ts-ignore: 6133
var async_1 = require("@quenk/preconditions/lib/async");
//@ts-ignore: 6133
var record_1 = require("@quenk/preconditions/lib/async/record");
var admin_1 = require("@mia/validators/lib/admin");
var checks_1 = require("@devcarib/common/lib/checks");
//@ts-ignore: 6133
var _title = 'Admin';
//@ts-ignore: 6133
var _collection = 'admins';
/**
 * checks for Admin provided as a map.
 */
exports.checks = {
    'id': (0, async_1.every)((0, checks_1.unique)('admins', 'id')),
    'name': async_1.identity,
    'email': async_1.identity,
    'password': (0, async_1.every)(checks_1.bcrypt)
};
/**
 * partialChecks for Admin provided as a map.
 */
exports.partialChecks = {
    'id': async_1.identity,
    'name': async_1.identity,
    'email': async_1.identity,
    'password': (0, async_1.every)(checks_1.bcrypt)
};
/**
 * check a Admin value.
 */
exports.check = (0, async_1.and)((0, async_1.and)((0, async_1.async)(admin_1.validate), (0, record_1.restrict)(exports.checks)), (0, async_1.every)((0, checks_1.inc)('users')));
/**
 * checkPartial a partial Admin value.
 */
exports.checkPartial = (0, async_1.and)((0, async_1.and)((0, async_1.async)(admin_1.validatePartial), (0, record_1.intersect)(exports.partialChecks)), (0, async_1.every)((0, checks_1.inc)('users')));
//# sourceMappingURL=admin.js.map