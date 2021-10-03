"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPartial = exports.check = exports.partialChecks = exports.checks = void 0;
//@ts-ignore: 6133
var async_1 = require("@quenk/preconditions/lib/async");
//@ts-ignore: 6133
var record_1 = require("@quenk/preconditions/lib/async/record");
var mail_message_1 = require("@board/validators/lib/mail-message");
//@ts-ignore: 6133
var _title = 'MailMessage';
//@ts-ignore: 6133
var _collection = 'mail';
/**
 * checks for MailMessage provided as a map.
 */
exports.checks = {
    'id': async_1.identity,
    'to': async_1.identity,
    'from': async_1.identity,
    'body': async_1.identity
};
/**
 * partialChecks for MailMessage provided as a map.
 */
exports.partialChecks = {
    'id': async_1.identity,
    'to': async_1.identity,
    'from': async_1.identity,
    'body': async_1.identity
};
/**
 * check a MailMessage value.
 */
exports.check = (0, async_1.and)((0, async_1.async)(mail_message_1.validate), (0, record_1.restrict)(exports.checks));
/**
 * checkPartial a partial MailMessage value.
 */
exports.checkPartial = (0, async_1.and)((0, async_1.async)(mail_message_1.validatePartial), (0, record_1.intersect)(exports.partialChecks));
//# sourceMappingURL=mail-message.js.map