"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleLogger = exports.NoLogger = exports.Logger = exports.Error = exports.Warn = exports.Info = exports.Debug = exports.Message = exports.LOG_LEVEL_ERROR = exports.LOG_LEVEL_WARN = exports.LOG_LEVEL_INFO = exports.LOG_LEVEL_DEBUG = void 0;
const case_1 = require("@quenk/potoo/lib/actor/resident/case");
const immutable_1 = require("@quenk/potoo/lib/actor/resident/immutable");
exports.LOG_LEVEL_DEBUG = 7;
exports.LOG_LEVEL_INFO = 6;
exports.LOG_LEVEL_WARN = 4;
exports.LOG_LEVEL_ERROR = 1;
/**
 * Message indicates a message we want stored to the log along with some meta
 * data.
 */
class Message {
    constructor(level, actor, text) {
        this.level = level;
        this.actor = actor;
        this.text = text;
    }
}
exports.Message = Message;
/**
 * Debug log message constructor.
 */
class Debug extends Message {
    constructor(actor, text) {
        super(exports.LOG_LEVEL_DEBUG, actor, text);
        this.actor = actor;
        this.text = text;
    }
}
exports.Debug = Debug;
/**
 * Info log message constructor.
 */
class Info extends Message {
    constructor(actor, text) {
        super(exports.LOG_LEVEL_INFO, actor, text);
        this.actor = actor;
        this.text = text;
    }
}
exports.Info = Info;
/**
 * Warn log message constructor.
 */
class Warn extends Message {
    constructor(actor, text) {
        super(exports.LOG_LEVEL_WARN, actor, text);
        this.actor = actor;
        this.text = text;
    }
}
exports.Warn = Warn;
/**
 * Error log message constructor.
 */
class Error extends Message {
    constructor(actor, text) {
        super(exports.LOG_LEVEL_ERROR, actor, text);
        this.actor = actor;
        this.text = text;
    }
}
exports.Error = Error;
/**
 * Logger provides an actor for storing structured log messages to a source.
 *
 * The point of this actor is to have a way to automatically collect the
 * activities of job or service type actors in a way that can be reviewed
 * at a future point.
 */
class Logger extends immutable_1.Immutable {
    constructor(level, system) {
        super(system);
        this.level = level;
        this.system = system;
    }
    receive() {
        return [
            (0, case_1.caseOf)(Message, (m) => {
                if (m.level <= this.level)
                    this.logMessage(m);
            })
        ];
    }
    run() { }
}
exports.Logger = Logger;
/**
 * NoLogger does not log any messages it receives.
 */
class NoLogger extends Logger {
    logMessage() { }
}
exports.NoLogger = NoLogger;
/**
 * ConsoleLogger is a Logger implementation that uses the console.
 */
class ConsoleLogger extends Logger {
    logMessage(m) {
        let msg = `[${m.actor}] ${m.text}`;
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
    }
}
exports.ConsoleLogger = ConsoleLogger;
//# sourceMappingURL=index.js.map