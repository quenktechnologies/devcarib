"use strict";
/** AUTO GENERATED MODULE, DO NOT EDIT DIRECTLY. */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPartialChecksFor = exports.partialChecksAvailable = exports.getChecksFor = exports.checksAvailable = void 0;
/** imports */
var _admin = require("./admin");
var _job = require("./job");
var _user = require("./user");
var maybe_1 = require("@quenk/noni/lib/data/maybe");
/**
 * checksAvailable from this module.
 */
exports.checksAvailable = {
    'admin': _admin.check,
    'job': _job.check,
    'user': _user.check
};
/**
 * getChecksFor provides a validator from this module.
 */
var getChecksFor = function (name) {
    return (0, maybe_1.fromNullable)(exports.checksAvailable[name]);
};
exports.getChecksFor = getChecksFor;
/**
 * partialChecksAvailable from this module.
 */
exports.partialChecksAvailable = {
    'admin': _admin.checkPartial,
    'job': _job.checkPartial,
    'user': _user.checkPartial
};
/**
 * getPartialChecksFor provides a validator from this module.
 */
var getPartialChecksFor = function (name) {
    return (0, maybe_1.fromNullable)(exports.partialChecksAvailable[name]);
};
exports.getPartialChecksFor = getPartialChecksFor;
//# sourceMappingURL=index.js.map