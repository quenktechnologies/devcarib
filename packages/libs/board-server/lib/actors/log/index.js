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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleLogger = exports.NoLogger = exports.Logger = exports.Error = exports.Warn = exports.Info = exports.Debug = exports.Message = exports.LOG_LEVEL_ERROR = exports.LOG_LEVEL_WARN = exports.LOG_LEVEL_INFO = exports.LOG_LEVEL_DEBUG = void 0;
var case_1 = require("@quenk/potoo/lib/actor/resident/case");
var resident_1 = require("@quenk/potoo/lib/actor/resident");
exports.LOG_LEVEL_DEBUG = 7;
exports.LOG_LEVEL_INFO = 6;
exports.LOG_LEVEL_WARN = 4;
exports.LOG_LEVEL_ERROR = 1;
/**
 * Message indicates a message we want stored to the log along with some meta
 * data.
 */
var Message = /** @class */ (function () {
    function Message(level, actor, text) {
        this.level = level;
        this.actor = actor;
        this.text = text;
    }
    return Message;
}());
exports.Message = Message;
/**
 * Debug log message constructor.
 */
var Debug = /** @class */ (function (_super) {
    __extends(Debug, _super);
    function Debug(actor, text) {
        var _this = _super.call(this, exports.LOG_LEVEL_DEBUG, actor, text) || this;
        _this.actor = actor;
        _this.text = text;
        return _this;
    }
    return Debug;
}(Message));
exports.Debug = Debug;
/**
 * Info log message constructor.
 */
var Info = /** @class */ (function (_super) {
    __extends(Info, _super);
    function Info(actor, text) {
        var _this = _super.call(this, exports.LOG_LEVEL_INFO, actor, text) || this;
        _this.actor = actor;
        _this.text = text;
        return _this;
    }
    return Info;
}(Message));
exports.Info = Info;
/**
 * Warn log message constructor.
 */
var Warn = /** @class */ (function (_super) {
    __extends(Warn, _super);
    function Warn(actor, text) {
        var _this = _super.call(this, exports.LOG_LEVEL_WARN, actor, text) || this;
        _this.actor = actor;
        _this.text = text;
        return _this;
    }
    return Warn;
}(Message));
exports.Warn = Warn;
/**
 * Error log message constructor.
 */
var Error = /** @class */ (function (_super) {
    __extends(Error, _super);
    function Error(actor, text) {
        var _this = _super.call(this, exports.LOG_LEVEL_ERROR, actor, text) || this;
        _this.actor = actor;
        _this.text = text;
        return _this;
    }
    return Error;
}(Message));
exports.Error = Error;
/**
 * Logger provides an actor for storing structured log messages to a source.
 *
 * The point of this actor is to have a way to automatically collect the
 * activities of job or service type actors in a way that can be reviewed
 * at a future point.
 */
var Logger = /** @class */ (function (_super) {
    __extends(Logger, _super);
    function Logger() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.receive = [new case_1.Case(Message, function (m) { return _this.logMessage(m); })];
        return _this;
    }
    Logger.prototype.run = function () { };
    return Logger;
}(resident_1.Immutable));
exports.Logger = Logger;
/**
 * NoLogger does not log any messages it receives.
 */
var NoLogger = /** @class */ (function (_super) {
    __extends(NoLogger, _super);
    function NoLogger() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoLogger.prototype.logMessage = function () { };
    return NoLogger;
}(Logger));
exports.NoLogger = NoLogger;
/**
 * ConsoleLogger is a Logger implementation that uses the console.
 */
var ConsoleLogger = /** @class */ (function (_super) {
    __extends(ConsoleLogger, _super);
    function ConsoleLogger() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ConsoleLogger.prototype.logMessage = function (m) {
        var msg = "[" + m.actor + "] " + m.text;
        switch (m.level) {
            case exports.LOG_LEVEL_INFO:
                console.info(msg);
                break;
            case exports.LOG_LEVEL_WARN:
                console.warn(msg);
                break;
            case exports.LOG_LEVEL_DEBUG:
                console.warn(msg);
                break;
            case exports.LOG_LEVEL_ERROR:
                console.error(msg);
                break;
            default:
                break;
        }
    };
    return ConsoleLogger;
}(Logger));
exports.ConsoleLogger = ConsoleLogger;
//# sourceMappingURL=index.js.map