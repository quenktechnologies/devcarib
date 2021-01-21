"use strict";
/** AUTO GENERATED MODULE, DO NOT EDIT DIRECTLY. */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPartialValidatorsFor = exports.partialValidatorsAvailable = exports.getValidatorsFor = exports.validatorsAvailable = void 0;
/** imports */
var _post = require("./post");
var _admin = require("./admin");
var _candidatePost = require("./candidate-post");
var maybe_1 = require("@quenk/noni/lib/data/maybe");
/**
 * validatorsAvailable from this module.
 */
exports.validatorsAvailable = {
    'post': _post.validate,
    'admin': _admin.validate,
    'candidate-post': _candidatePost.validate
};
/**
 * getValidatorsFor provides a validator from this module.
 */
exports.getValidatorsFor = function (name) {
    return maybe_1.fromNullable(exports.validatorsAvailable[name]);
};
/**
 * partialValidatorsAvailable from this module.
 */
exports.partialValidatorsAvailable = {
    'post': _post.validatePartial,
    'admin': _admin.validatePartial,
    'candidate-post': _candidatePost.validatePartial
};
/**
 * getPartialValidatorsFor provides a validator from this module.
 */
exports.getPartialValidatorsFor = function (name) {
    return maybe_1.fromNullable(exports.partialValidatorsAvailable[name]);
};
//# sourceMappingURL=index.js.map