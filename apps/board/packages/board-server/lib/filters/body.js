"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromParams = void 0;
const function_1 = require("@quenk/noni/lib/data/function");
const api_1 = require("@quenk/tendril/lib/app/api");
const control_1 = require("@quenk/tendril/lib/app/api/control");
const supportedMethods = ['POST', 'PATCH'];
/**
 * fromParams extracts properties from the parsed params object to set them to
 * the body part of a request.
 *
 * It reads from the +params and +nparams tags (nparams casts to number) to
 * determine what to extract and set in the form: +params="<key>:<destination>".
 * Multiple pairs can be specified in a comma separated list.
 */
const fromParams = (req) => (0, api_1.doAction)(function* () {
    if (!supportedMethods.includes(req.method) ||
        !req.route.tags.params &&
            !req.route.tags.nparams)
        return (0, control_1.next)(req);
    req.body = getPairs(req.route.tags.params)
        .reduce(ingest(req.params), req.body);
    req.body = getPairs(req.route.tags.nparams)
        .reduce(ingest(req.params, Number), req.body);
    return (0, control_1.next)(req);
});
exports.fromParams = fromParams;
const getPairs = (str = '') => str.split(',').map(param => {
    let pair = param.split(':');
    return ((pair.length === 2) ? pair : [pair[0], pair[0]]);
});
const ingest = (src, trans = function_1.identity) => (dest, [param, key]) => {
    dest[key] = trans(src[param]);
    return dest;
};
//# sourceMappingURL=body.js.map