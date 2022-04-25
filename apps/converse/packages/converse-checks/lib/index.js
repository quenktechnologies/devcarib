"use strict";
/** AUTO GENERATED MODULE, DO NOT EDIT DIRECTLY. */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPartialChecksFor = exports.partialChecksAvailable = exports.getChecksFor = exports.checksAvailable = void 0;
/** imports */
var _comment = require("./comment");
var _event = require("./event");
var _post = require("./post");
var _user = require("./user");
var maybe_1 = require("@quenk/noni/lib/data/maybe");
/**
 * checksAvailable from this module.
 */
exports.checksAvailable = {
    'comment': _comment.check,
    'event': _event.check,
    'post': _post.check,
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
    'comment': _comment.checkPartial,
    'event': _event.checkPartial,
    'post': _post.checkPartial,
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