"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var record_1 = require("@quenk/noni/lib/data/record");
/**
 * removeExpired removes all the entries from the session
 * whose countdown or ttl has reached 0.
 */
exports.removeExpired = function () { return function (req, _, next) {
    if (req.session && req.session.data)
        req.session.data = record_1.filter(req.session.data, function (e) {
            if (e.options.ttl === 0)
                return false;
            if ((e.options.countdown !== -1) &&
                (Date.now() - e.options.countdown) === 0)
                return false;
            return true;
        });
    next();
}; };
/**
 * decrementTTL decrements the ttl value for session entries
 * that are > 0.
 */
exports.decrementTTL = function () { return function (req, _, next) {
    if (req.session && req.session.data) {
        var data = req.session.data;
        req.session.data = record_1.map(data, function (e) {
            if ((e.options.ttl !== -1) && (e.options.ttl !== 0))
                e.options.ttl = e.options.ttl - 1;
            return e;
        });
    }
    next();
}; };
//# sourceMappingURL=middleware.js.map