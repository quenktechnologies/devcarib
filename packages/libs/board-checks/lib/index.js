"use strict";
/** AUTO GENERATED MODULE, DO NOT EDIT DIRECTLY. */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPartialChecksFor = exports.partialChecksAvailable = exports.getChecksFor = exports.checksAvailable = void 0;
/** imports */
var _admin = require("./admin");
var _job = require("./job");
var _mailMessage = require("./mail-message");
var maybe_1 = require("@quenk/noni/lib/data/maybe");
/**
 * checksAvailable from this module.
 */
exports.checksAvailable = {
    'admin': _admin.check,
    'job': _job.check,
    'mail-message': _mailMessage.check
};
/**
 * getChecksFor provides a validator from this module.
 */
var getChecksFor = function (name) {
    return maybe_1.fromNullable(exports.checksAvailable[name]);
};
exports.getChecksFor = getChecksFor;
/**
 * partialChecksAvailable from this module.
 */
exports.partialChecksAvailable = {
    'admin': _admin.checkPartial,
    'job': _job.checkPartial,
    'mail-message': _mailMessage.checkPartial
};
/**
 * getPartialChecksFor provides a validator from this module.
 */
var getPartialChecksFor = function (name) {
    return maybe_1.fromNullable(exports.partialChecksAvailable[name]);
};
exports.getPartialChecksFor = getPartialChecksFor;
//# sourceMappingURL=index.js.map