"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPartial = exports.check = exports.partialChecks = exports.checks = void 0;
//@ts-ignore: 6133
var async_1 = require("@quenk/preconditions/lib/async");
//@ts-ignore: 6133
var record_1 = require("@quenk/preconditions/lib/async/record");
var admin_1 = require("@board/validation/lib/admin");
var _1 = require("./");
//@ts-ignore: 6133
var _title = 'Admin';
//@ts-ignore: 6133
var _collection = 'admins';
/**
 * checks for Admin provided as a map.
 */
exports.checks = {
    'id': async_1.every(_1.inc('counters.admins'), _1.unique('admins', 'id')),
    'name': async_1.identity,
    'email': async_1.identity,
    'password': async_1.identity
};
/**
 * partialChecks for Admin provided as a map.
 */
exports.partialChecks = {
    'id': async_1.identity,
    'name': async_1.identity,
    'email': async_1.identity,
    'password': async_1.identity
};
/**
 * check a Admin value.
 */
exports.check = function () {
    return async_1.and(async_1.async(admin_1.validate), record_1.restrict(exports.checks));
};
/**
 * checkPartial a partial Admin value.
 */
exports.checkPartial = function () {
    return async_1.and(async_1.async(admin_1.validatePartial), record_1.intersect(exports.partialChecks));
};
//# sourceMappingURL=admin.js.map