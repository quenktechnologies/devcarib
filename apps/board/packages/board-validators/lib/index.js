"use strict";
/** AUTO GENERATED MODULE, DO NOT EDIT DIRECTLY. */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPartialValidatorsFor = exports.partialValidatorsAvailable = exports.getValidatorsFor = exports.validatorsAvailable = void 0;
/** imports */
const _job = require("./job");
const maybe_1 = require("@quenk/noni/lib/data/maybe");
/**
 * validatorsAvailable from this module.
 */
exports.validatorsAvailable = {
    'job': _job.validate
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
    'job': _job.validatePartial
};
/**
 * getPartialValidatorsFor provides a validator from this module.
 */
const getPartialValidatorsFor = (name) => (0, maybe_1.fromNullable)(exports.partialValidatorsAvailable[name]);
exports.getPartialValidatorsFor = getPartialValidatorsFor;
//# sourceMappingURL=index.js.map