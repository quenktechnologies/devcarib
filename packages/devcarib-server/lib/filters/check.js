"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkBody = void 0;
const response_1 = require("@quenk/tendril/lib/app/api/response");
const api_1 = require("@quenk/tendril/lib/app/api");
const control_1 = require("@quenk/tendril/lib/app/api/control");
const supportedMethods = ['POST', 'PATCH'];
/**
 * checkBody executes a [[Precondition]] from the checks map provided on the
 * request body upon attempt to create or update data.
 *
 * This filter reads the "model" tag to determine which check from the map to
 * use. If the check fails, a 409 status is sent along with the errors. If
 * no check is found for the specified model, status 400 is sent.
 */
const checkBody = (full, partial, messages = {}) => (req) => (0, api_1.doAction)(function* () {
    if (!supportedMethods.includes(req.method))
        return (0, control_1.next)(req);
    let ptr = req.route.tags.model;
    let check = ((req.method === 'PATCH') ? partial : full)[ptr];
    if (!check)
        return (0, response_1.badRequest)();
    let eresult = yield (0, control_1.fork)(check(req.body));
    if (eresult.isLeft()) {
        let errors = eresult.takeLeft().explain(messages);
        yield (0, response_1.conflict)({ errors });
        return (0, control_1.abort)();
    }
    req.body = eresult.takeRight();
    return (0, control_1.next)(req);
});
exports.checkBody = checkBody;
//# sourceMappingURL=check.js.map