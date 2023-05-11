"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInstanceOf = exports.modelsAvailable = void 0;
const _job = require("./job");
const _mailMessage = require("./mail-message");
const maybe_1 = require("@quenk/noni/lib/data/maybe");
/**
 * modelsAvailable from this module.
 */
exports.modelsAvailable = {
    'job': _job.ModelImpl.getInstance,
    'mail-message': _mailMessage.ModelImpl.getInstance
};
/**
 * getInstance of a Model from this module using its name.
 *
 * The returned Model may not be completely type safe.
 */
const getInstanceOf = (db, name) => (0, maybe_1.fromNullable)(exports.modelsAvailable[name]).map(f => f(db));
exports.getInstanceOf = getInstanceOf;
//# sourceMappingURL=index.js.map