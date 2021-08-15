"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.MongoDbLogger = void 0;
var future_1 = require("@quenk/noni/lib/control/monad/future");
var array_1 = require("@quenk/noni/lib/data/array");
var record_1 = require("@quenk/noni/lib/data/record");
var collection_1 = require("@quenk/noni-mongodb/lib/database/collection");
var _1 = require("./");
var defaultConf = { interval: 10000 };
/**
 * MongoDbLogger implementation.
 */
var MongoDbLogger = /** @class */ (function (_super) {
    __extends(MongoDbLogger, _super);
    function MongoDbLogger(system, collection, conf) {
        var _this = _super.call(this, system) || this;
        _this.system = system;
        _this.collection = collection;
        _this.conf = conf;
        _this.buffer = [];
        return _this;
    }
    MongoDbLogger.create = function (system, collection, conf) {
        if (conf === void 0) { conf = {}; }
        return new MongoDbLogger(system, collection, record_1.merge(defaultConf, conf));
    };
    /**
     * logMessage does not log the message immediately, instead they are added
     * to the buffer.
     */
    MongoDbLogger.prototype.logMessage = function (m) {
        this.buffer.push(m);
    };
    /**
     * flush the buffer by adding all pending messages to the database.
     */
    MongoDbLogger.prototype.flush = function () {
        var buffer = this.buffer;
        var self = this;
        return future_1.doFuture(function () {
            var collection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!array_1.empty(buffer)) return [3 /*break*/, 3];
                        return [4 /*yield*/, self.collection()];
                    case 1:
                        collection = _a.sent();
                        return [4 /*yield*/, collection_1.insertMany(collection, buffer)];
                    case 2:
                        _a.sent();
                        self.buffer = [];
                        _a.label = 3;
                    case 3: return [2 /*return*/, future_1.pure(undefined)];
                }
            });
        });
    };
    MongoDbLogger.prototype.run = function () {
        var _this = this;
        setInterval(function () { return _this.flush(); }, this.conf.interval);
    };
    return MongoDbLogger;
}(_1.Logger));
exports.MongoDbLogger = MongoDbLogger;
//# sourceMappingURL=mongodb.js.map