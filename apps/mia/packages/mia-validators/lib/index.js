"use strict";
/** AUTO GENERATED MODULE, DO NOT EDIT DIRECTLY. */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPartialValidatorsFor = exports.partialValidatorsAvailable = exports.getValidatorsFor = exports.validatorsAvailable = void 0;
/** imports */
const _admin = require("./admin");
const _event = require("./event");
const _invite = require("./invite");
const _job = require("./job");
const _user = require("./user");
const maybe_1 = require("@quenk/noni/lib/data/maybe");
/**
 * validatorsAvailable from this module.
 */
exports.validatorsAvailable = {
    'admin': _admin.validate,
    'event': _event.validate,
    'invite': _invite.validate,
    'job': _job.validate,
    'user': _user.validate
};
/**
 * getValidatorsFor provides a validator from this module.
 */
const getValidatorsFor = (name) => (0, maybe_1.fromNullable)(exports.validatorsAvailable[name]);
exports.getValidatorsFor = getValidatorsFor;
/**
 * partialValidatorsAvailable from this module.
 */
exports.partialValidatorsAvailable = {
    'admin': _admin.validatePartial,
    'event': _event.validatePartial,
    'invite': _invite.validatePartial,
    'job': _job.validatePartial,
    'user': _user.validatePartial
};
/**
 * getPartialValidatorsFor provides a validator from this module.
 */
const getPartialValidatorsFor = (name) => (0, maybe_1.fromNullable)(exports.partialValidatorsAvailable[name]);
exports.getPartialValidatorsFor = getPartialValidatorsFor;
//# sourceMappingURL=index.js.map