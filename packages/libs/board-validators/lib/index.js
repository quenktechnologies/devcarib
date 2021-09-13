"use strict";
/** AUTO GENERATED MODULE, DO NOT EDIT DIRECTLY. */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPartialValidatorsFor = exports.partialValidatorsAvailable = exports.getValidatorsFor = exports.validatorsAvailable = void 0;
/** imports */
var _admin = require("./admin");
var _job = require("./job");
var _mailMessage = require("./mail-message");
var maybe_1 = require("@quenk/noni/lib/data/maybe");
/**
 * validatorsAvailable from this module.
 */
exports.validatorsAvailable = {
    'admin': _admin.validate,
    'job': _job.validate,
    'mail-message': _mailMessage.validate
};
/**
 * getValidatorsFor provides a validator from this module.
 */
var getValidatorsFor = function (name) {
    return maybe_1.fromNullable(exports.validatorsAvailable[name]);
};
exports.getValidatorsFor = getValidatorsFor;
/**
 * partialValidatorsAvailable from this module.
 */
exports.partialValidatorsAvailable = {
    'admin': _admin.validatePartial,
    'job': _job.validatePartial,
    'mail-message': _mailMessage.validatePartial
};
/**
 * getPartialValidatorsFor provides a validator from this module.
 */
var getPartialValidatorsFor = function (name) {
    return maybe_1.fromNullable(exports.partialValidatorsAvailable[name]);
};
exports.getPartialValidatorsFor = getPartialValidatorsFor;
//# sourceMappingURL=index.js.map