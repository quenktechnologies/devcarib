"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPartial = exports.check = exports.partialChecks = exports.checks = void 0;
//@ts-ignore: 6133
var async_1 = require("@quenk/preconditions/lib/async");
//@ts-ignore: 6133
var record_1 = require("@quenk/preconditions/lib/async/record");
var user_1 = require("@converse/validators/lib/user");
var common_checks_1 = require("@devcarib/common-checks");
//@ts-ignore: 6133
var _title = 'User';
//@ts-ignore: 6133
var _collection = 'users';
/**
 * checks for User provided as a map.
 */
exports.checks = {
    'id': async_1.every(common_checks_1.unique(_collection, 'id')),
    'name': async_1.identity,
    'username': async_1.every(common_checks_1.unique(_collection, 'username')),
    'password': async_1.every(common_checks_1.bcrypt),
    'status': async_1.identity,
    'last_login': async_1.identity
};
/**
 * partialChecks for User provided as a map.
 */
exports.partialChecks = {
    'id': async_1.every(common_checks_1.unique(_collection, 'id')),
    'name': async_1.identity,
    'username': async_1.every(common_checks_1.unique(_collection, 'username')),
    'password': async_1.every(common_checks_1.bcrypt),
    'status': async_1.identity,
    'last_login': async_1.identity
};
/**
 * check a User value.
 */
exports.check = async_1.and(async_1.async(user_1.validate), record_1.restrict(exports.checks));
/**
 * checkPartial a partial User value.
 */
exports.checkPartial = async_1.and(async_1.async(user_1.validatePartial), record_1.intersect(exports.partialChecks));
//# sourceMappingURL=user.js.map