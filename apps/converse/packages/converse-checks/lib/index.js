"use strict";
/** AUTO GENERATED MODULE, DO NOT EDIT DIRECTLY. */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPartialChecksFor = exports.partialChecksAvailable = exports.getChecksFor = exports.checksAvailable = void 0;
/** imports */
const _comment = require("./comment");
const _event = require("./event");
const _invite = require("./invite");
const _job = require("./job");
const _post = require("./post");
const _user = require("./user");
const maybe_1 = require("@quenk/noni/lib/data/maybe");
/**
 * checksAvailable from this module.
 */
exports.checksAvailable = {
    'comment': _comment.check,
    'event': _event.check,
    'invite': _invite.check,
    'job': _job.check,
    'post': _post.check,
    'user': _user.check
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
    'comment': _comment.checkPartial,
    'event': _event.checkPartial,
    'invite': _invite.checkPartial,
    'job': _job.checkPartial,
    'post': _post.checkPartial,
    'user': _user.checkPartial
};
/**
 * getPartialChecksFor provides a validator from this module.
 */
const getPartialChecksFor = (name) => (0, maybe_1.fromNullable)(exports.partialChecksAvailable[name]);
exports.getPartialChecksFor = getPartialChecksFor;
//# sourceMappingURL=index.js.map