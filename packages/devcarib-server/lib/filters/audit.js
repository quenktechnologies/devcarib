"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureOwner = exports.auditWrite = void 0;
const api_1 = require("@quenk/tendril/lib/app/api");
const control_1 = require("@quenk/tendril/lib/app/api/control");
const response_1 = require("@quenk/tendril/lib/app/api/response");
const datetime_1 = require("@devcarib/common/lib/data/datetime");
const supportedMethods = ['POST', 'PATCH'];
/**
 * auditWrite sets the following keys on POST and PATCH requests respectively.
 * POST:
 *   created_by, created_on
 * PATCH:
 *  last_updated_by, last_updated_on
 *
 * The values for created_by and last_updated_by are fetched from the session.
 *
 * @param key - The session key to get the value from.
 */
const auditWrite = (key) => (req) => (0, api_1.doAction)(function* () {
    if (!supportedMethods.includes(req.method))
        return (0, control_1.next)(req);
    let body = (req.body) || {};
    let muser = req.session.get(key);
    if (muser.isNothing()) {
        (0, response_1.forbidden)();
        return (0, control_1.abort)();
    }
    if (req.method === 'POST') {
        body.created_by = muser.get();
        body.created_on = (0, datetime_1.now)();
    }
    else if (req.method === 'PATCH') {
        body.last_updated_by = muser.get();
        body.last_updated_on = (0, datetime_1.now)();
    }
    req.body = body;
    return (0, control_1.next)(req);
});
exports.auditWrite = auditWrite;
/**
 * ensureOwner adds a query to +query to ensure the action only takes place on
 * objects owned by the current user.
 *
 * This relies on the compileQueryTag filter being installed and must be
 * installed before it.
 */
const ensureOwner = (req) => (0, api_1.doAction)(function* () {
    if (!req.route.tags.owned)
        return (0, control_1.next)(req);
    let id = req.session.getOrElse('user.id', '');
    let filter = `created_by.id:${id}`;
    let { query } = req.route.tags;
    req.route.tags.query = req.route.tags.query ?
        `(${query}) and ${filter}` : filter;
    return (0, control_1.next)(req);
});
exports.ensureOwner = ensureOwner;
//# sourceMappingURL=audit.js.map