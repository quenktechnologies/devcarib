"use strict";
/** AUTO GENERATED MODULE, DO NOT EDIT DIRECTLY. */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPartialChecksFor = exports.partialChecksAvailable = exports.getChecksFor = exports.checksAvailable = void 0;
/** imports */
const _job = require("./job");
const maybe_1 = require("@quenk/noni/lib/data/maybe");
/**
 * checksAvailable from this module.
 */
exports.checksAvailable = {
    'job': _job.check
};
/**
 * getChecksFor provides a validator from this module.
 */
const getChecksFor = (name) => (0, maybe_1.fromNullable)(exports.checksAvailable[name]);
exports.getChecksFor = getChecksFor;
/**
 * partialChecksAvailable from this module.
 */
exports.partialChecksAvailable = {
    'job': _job.checkPartial
};
/**
 * getPartialChecksFor provides a validator from this module.
 */
const getPartialChecksFor = (name) => (0, maybe_1.fromNullable)(exports.partialChecksAvailable[name]);
exports.getPartialChecksFor = getPartialChecksFor;
//# sourceMappingURL=index.js.map