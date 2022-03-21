"use strict";
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseMarkdown = exports.timestamp = exports.inc = exports.id = exports.unique = exports.bcrypt = exports.SETTINGS_ID = void 0;
var bcryptjs = require("bcryptjs");
var uuid = require("uuid");
var moment = require("moment");
var commonMark = require("@devcarib/common/lib/common-mark");
var future_1 = require("@quenk/noni/lib/control/monad/future");
var monad_1 = require("@quenk/noni/lib/control/monad");
var path_1 = require("@quenk/noni/lib/data/record/path");
var type_1 = require("@quenk/noni/lib/data/type");
var result_1 = require("@quenk/preconditions/lib/result");
var collection_1 = require("@quenk/noni-mongodb/lib/database/collection");
var connection_1 = require("@quenk/tendril/lib/app/connection");
exports.SETTINGS_ID = 'main';
/**
 * bcrypt
 */
var bcrypt = function (str) {
    return (0, monad_1.doN)(function () {
        var salty, salted;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, salt()];
                case 1:
                    salty = _a.sent();
                    return [4 /*yield*/, hash(String(str), salty)];
                case 2:
                    salted = _a.sent();
                    return [2 /*return*/, (0, future_1.pure)((0, result_1.succeed)(salted))];
            }
        });
    });
};
exports.bcrypt = bcrypt;
var salt = function () {
    return (0, future_1.fromCallback)(function (cb) { return bcryptjs.genSalt(12, cb); });
};
var hash = function (str, salt) {
    return (0, future_1.fromCallback)(function (cb) { return bcryptjs.hash(str, salt, cb); });
};
/**
 * unique fails if the value specified for the field is already stored in the
 * database.
 */
var unique = function (collection, field, dbid) {
    if (dbid === void 0) { dbid = 'main'; }
    return function (value) {
        return (0, monad_1.doN)(function () {
            var db, n;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, getMain(dbid)];
                    case 1:
                        db = _b.sent();
                        return [4 /*yield*/, (0, collection_1.count)(db.collection(collection), (_a = {},
                                _a[field] = value,
                                _a))];
                    case 2:
                        n = _b.sent();
                        return [2 /*return*/, (0, future_1.pure)((n > 0) ?
                                (0, result_1.fail)('unique', value, { value: value }) :
                                (0, result_1.succeed)(value))];
                }
            });
        });
    };
};
exports.unique = unique;
/**
 * id generates the id number for a record.
 */
var id = function () {
    return (0, future_1.pure)((0, result_1.succeed)(uuid.v4().split('-').join('')));
};
exports.id = id;
/**
 * inc increments a counter stored in the database returning the value.
 *
 * This is used mostly for generationg sequential ids.
 */
var inc = function (field, dbid) {
    if (dbid === void 0) { dbid = 'main'; }
    return function (_) {
        return (0, monad_1.doN)(function () {
            var db, target, filter, key, update, opts, r;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, getMain(dbid)];
                    case 1:
                        db = _b.sent();
                        target = db.collection('settings');
                        filter = { id: exports.SETTINGS_ID };
                        key = "counters.".concat(field);
                        update = { $inc: (_a = {}, _a[key] = 1, _a) };
                        opts = { returnOriginal: false };
                        return [4 /*yield*/, (0, collection_1.findOneAndUpdate)(target, filter, update, opts)];
                    case 2:
                        r = _b.sent();
                        return [2 /*return*/, (0, future_1.pure)((0, result_1.succeed)((0, path_1.unsafeGet)(key, r.value)))];
                }
            });
        });
    };
};
exports.inc = inc;
var getMain = function (id) {
    return (0, connection_1.getInstance)().get(id).get().checkout();
};
/**
 * timestamp provides the current UTC datetime as a Date object.
 */
var timestamp = function () {
    return (0, future_1.pure)((0, result_1.succeed)(moment.utc().toDate()));
};
exports.timestamp = timestamp;
/**
 * parseMarkdown parses the value of a property on a object as markdown
 * and sets the result to the target destination.
 */
var parseMarkdown = function (src, dest) {
    return function (value) { return (0, future_1.fromCallback)(function (cb) {
        if (!(0, type_1.isObject)(value))
            return cb(null, (0, result_1.succeed)(value));
        var val = value;
        if (val[src] == null)
            return cb(null, (0, result_1.succeed)(value));
        val[dest] = commonMark.parse(String(val[src]));
        cb(null, (0, result_1.succeed)(val));
    }); };
};
exports.parseMarkdown = parseMarkdown;
//# sourceMappingURL=checks.js.map