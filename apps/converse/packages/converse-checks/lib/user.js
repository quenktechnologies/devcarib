"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPartial = exports.check = exports.partialChecks = exports.checks = void 0;
//@ts-ignore: 6133
const async_1 = require("@quenk/preconditions/lib/async");
//@ts-ignore: 6133
const record_1 = require("@quenk/preconditions/lib/async/record");
const user_1 = require("@converse/validators/lib/user");
const checks_1 = require("@devcarib/server/lib/data/checks");
//@ts-ignore: 6133
const _title = 'User';
//@ts-ignore: 6133
const _collection = 'users';
/**
 * checks for User provided as a map.
 */
exports.checks = {
    'id': async_1.identity,
    'name': async_1.identity,
    'email': (0, async_1.every)((0, checks_1.unique)(_collection, 'email')),
    'username': (0, async_1.every)((0, checks_1.unique)(_collection, 'username')),
    'password': (0, async_1.every)(checks_1.bcrypt),
    'status': async_1.identity,
    'last_login': async_1.identity
};
/**
 * partialChecks for User provided as a map.
 */
exports.partialChecks = {
    'id': async_1.identity,
    'name': async_1.identity,
    'email': (0, async_1.every)((0, checks_1.unique)(_collection, 'email')),
    'username': (0, async_1.every)((0, checks_1.unique)(_collection, 'username')),
    'password': (0, async_1.every)(checks_1.bcrypt),
    'status': async_1.identity,
    'last_login': async_1.identity
};
/**
 * check a User value.
 */
exports.check = (0, async_1.and)((0, async_1.and)((0, async_1.async)(user_1.validate), (0, record_1.restrict)(exports.checks)), (0, async_1.every)((0, checks_1.inc)('users')));
/**
 * checkPartial a partial User value.
 */
exports.checkPartial = (0, async_1.and)((0, async_1.and)((0, async_1.async)(user_1.validatePartial), (0, record_1.intersect)(exports.partialChecks)), (0, async_1.every)((0, checks_1.inc)('users')));
//# sourceMappingURL=user.js.map