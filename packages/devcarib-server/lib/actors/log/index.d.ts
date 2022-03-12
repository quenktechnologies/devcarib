import { Immutable } from '@quenk/potoo/lib/actor/resident/immutable';
import { Address } from '@quenk/potoo/lib/actor/address';
import { System } from '@quenk/potoo/lib/actor/system';
export declare const LOG_LEVEL_DEBUG = 7;
export declare const LOG_LEVEL_INFO = 6;
export declare const LOG_LEVEL_WARN = 4;
export declare const LOG_LEVEL_ERROR = 1;
/**
 * LogLevel for a log message.
 */
export declare type LogLevel = number;
/**
 * Message indicates a message we want stored to the log along with some meta
 * data.
 */
export declare class Message {
    level: LogLevel;
    actor: Address;
    text: string;
    constructor(level: LogLevel, actor: Address, text: string);
}
/**
 * Debug log message constructor.
 */
export declare class Debug extends Message {
    actor: Address;
    text: string;
    constructor(actor: Address, text: string);
}
/**
 * Info log message constructor.
 */
export declare class Info extends Message {
    actor: Address;
    text: string;
    constructor(actor: Address, text: string);
}
/**
 * Warn log message constructor.
 */
export declare class Warn extends Message {
    actor: Address;
    text: string;
    constructor(actor: Address, text: string);
}
/**
 * Error log message constructor.
 */
export declare class Error extends Message {
    actor: Address;
    text: string;
    constructor(actor: Address, text: string);
}
/**
 * Logger provides an actor for storing structured log messages to a source.
 *
 * The point of this actor is to have a way to automatically collect the
 * activities of job or service type actors in a way that can be reviewed
 * at a future point.
 */
export declare abstract class Logger extends Immutable<Message> {
    level: LogLevel;
    system: System;
    constructor(level: LogLevel, system: System);
    receive(): import("@quenk/potoo/lib/actor/resident/case").Case<import("@quenk/noni/lib/data/type").Pattern<Message>>[];
    /**
     * logMessage is overridden by implementations to do the actual log
     * persistence.
     */
    abstract logMessage(m: Message): void;
    run(): void;
}
/**
 * NoLogger does not log any messages it receives.
 */
export declare class NoLogger extends Logger {
    logMessage(): void;
}
/**
 * ConsoleLogger is a Logger implementation that uses the console.
 */
export declare class ConsoleLogger extends Logger {
    logMessage(m: Message): void;
}
