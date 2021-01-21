"use strict";
/** AUTO GENERATED MODULE, DO NOT EDIT DIRECTLY. */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPartialChecksFor = exports.partialChecksAvailable = exports.getChecksFor = exports.checksAvailable = void 0;
/** imports */
var _post = require("./post");
var _admin = require("./admin");
var _candidatePost = require("./candidate-post");
var maybe_1 = require("@quenk/noni/lib/data/maybe");
/**
 * checksAvailable from this module.
 */
exports.checksAvailable = {
    'post': _post.check,
    'admin': _admin.check,
    'candidate-post': _candidatePost.check
};
/**
 * getChecksFor provides a validator from this module.
 */
exports.getChecksFor = function (name) {
    return maybe_1.fromNullable(exports.checksAvailable[name]);
};
/**
 * partialChecksAvailable from this module.
 */
exports.partialChecksAvailable = {
    'post': _post.checkPartial,
    'admin': _admin.checkPartial,
    'candidate-post': _candidatePost.checkPartial
};
/**
 * getPartialChecksFor provides a validator from this module.
 */
exports.getPartialChecksFor = function (name) {
    return maybe_1.fromNullable(exports.partialChecksAvailable[name]);
};
//# sourceMappingURL=index.js.map