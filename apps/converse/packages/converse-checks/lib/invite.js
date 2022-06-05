"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPartial = exports.check = exports.partialChecks = exports.checks = void 0;
//@ts-ignore: 6133
var async_1 = require("@quenk/preconditions/lib/async");
//@ts-ignore: 6133
var record_1 = require("@quenk/preconditions/lib/async/record");
var invite_1 = require("@converse/validators/lib/invite");
var checks_1 = require("@devcarib/server/lib/data/checks");
//@ts-ignore: 6133
var _title = 'Invite';
//@ts-ignore: 6133
var _collection = 'invites';
/**
 * checks for Invite provided as a map.
 */
exports.checks = {
    'id': async_1.identity,
    'name': async_1.identity,
    'email': async_1.identity,
    'token': async_1.identity,
    'message': async_1.identity,
    'accepted_on': async_1.identity
};
/**
 * partialChecks for Invite provided as a map.
 */
exports.partialChecks = {
    'id': async_1.identity,
    'name': async_1.identity,
    'email': async_1.identity,
    'token': async_1.identity,
    'message': async_1.identity,
    'accepted_on': async_1.identity
};
/**
 * check a Invite value.
 */
exports.check = (0, async_1.and)((0, async_1.and)((0, async_1.async)(invite_1.validate), (0, record_1.restrict)(exports.checks)), (0, async_1.every)((0, checks_1.rand)('id')));
/**
 * checkPartial a partial Invite value.
 */
exports.checkPartial = (0, async_1.and)((0, async_1.async)(invite_1.validatePartial), (0, record_1.intersect)(exports.partialChecks));
//# sourceMappingURL=invite.js.map