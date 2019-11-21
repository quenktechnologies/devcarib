"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
///<reference path='../../../node_modules/@types/express-session/index.d.ts'/>
var maybe_1 = require("@quenk/noni/lib/data/maybe");
var future_1 = require("@quenk/noni/lib/control/monad/future");
var record_1 = require("@quenk/noni/lib/data/record");
exports.SESSION_DATA_KEY = 'data';
/**
 * Session provides a more uniform API for accessing session data than
 * the default express-session middleware.
 *
 * Data is restricted to being key value pairs and is stored in a hash table
 * under the name SESSION_DATA_KEY.
 *
 * Data can be configured to last for the session duration, until set time
 * has passed or a number of requests have occured. The last two depends on
 * the middleware function being installed to function correctly.
 */
var Session = /** @class */ (function () {
    function Session(data, request) {
        this.data = data;
        this.request = request;
    }
    /**
     * get a value from session data using its key.
     */
    Session.prototype.get = function (key) {
        if (record_1.isRecord(this.data[key]))
            return maybe_1.just(this.data[key].value);
        return maybe_1.nothing();
    };
    /**
     * set a value in the session.
     */
    Session.prototype.set = function (key, value, opts) {
        var options = record_1.merge(defaultOptions(), opts || {});
        this.data[key] = { key: key, value: value, options: options };
        return this;
    };
    /**
     * remove a session key.
     */
    Session.prototype.remove = function (key) {
        delete this.data[key];
        return this;
    };
    /**
     * exists tests if a key exists in the session data.
     */
    Session.prototype.exists = function (key) {
        return this.data.hasOwnProperty(key);
    };
    /**
     * save the state of the session data.
     *
     * This should be called after all modifications have
     * been made to the session data.
     */
    Session.prototype.save = function () {
        var _this = this;
        this.request.session.data = this.data;
        return future_1.fromCallback(function (cb) {
            return _this.request.session.save(cb);
        });
    };
    /**
     * destroy the session.
     */
    Session.prototype.destroy = function () {
        var _this = this;
        return future_1.fromCallback(function (cb) {
            return _this.request.session.destroy(cb);
        });
    };
    return Session;
}());
exports.Session = Session;
var defaultOptions = function () { return ({
    timestamp: Date.now(),
    ttl: -1,
    countdown: -1
}); };
/**
 * fromRequest generates a session class from a Request
 * if session data exists.
 */
exports.fromRequest = function (req) {
    var maySession = maybe_1.fromNullable(req.session);
    if (maySession.isNothing())
        return maybe_1.nothing();
    var e = maySession.get().data || {};
    return maybe_1.just(new Session(e, req));
};
//# sourceMappingURL=index.js.map