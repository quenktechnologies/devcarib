import { Case } from '@quenk/potoo/lib/actor/resident/case';
import { Immutable } from '@quenk/potoo/lib/actor/resident';
import { Address } from '@quenk/potoo/lib/actor/address';
import { System } from '@quenk/potoo/lib/actor/system';

export const LOG_LEVEL_DEBUG = 7;
export const LOG_LEVEL_INFO = 6;
export const LOG_LEVEL_WARN = 4;
export const LOG_LEVEL_ERROR = 1;

/**
 * LogLevel for a log message.
 */
export type LogLevel = number;

/**
 * Message indicates a message we want stored to the log along with some meta
 * data.
 */
export class Message {

    constructor(
        public level: LogLevel,
        public actor: Address,
        public text: string
    ) { }

}

/**
 * Debug log message constructor.
 */
export class Debug extends Message {

    constructor(public actor: Address, public text: string) {
        super(LOG_LEVEL_DEBUG, actor, text);
    }

}

/**
 * Info log message constructor.
 */
export class Info extends Message {

    constructor(public actor: Address, public text: string) {
        super(LOG_LEVEL_INFO, actor, text);
    }

}

/**
 * Warn log message constructor.
 */
export class Warn extends Message {

    constructor(public actor: Address, public text: string) {
        super(LOG_LEVEL_WARN, actor, text);
    }

}

/**
 * Error log message constructor.
 */
export class Error extends Message {

    constructor(public actor: Address, public text: string) {

        super(LOG_LEVEL_ERROR, actor, text);

    }

}

/**
 * Logger provides an actor for storing structured log messages to a source.
 *
 * The point of this actor is to have a way to automatically collect the
 * activities of job or service type actors in a way that can be reviewed
 * at a future point.
 */
export abstract class Logger extends Immutable<Message> {

    constructor(public level: LogLevel, public system: System) {

            super(system);

    }

    receive() {

        return  [

        new Case(Message, (m: Message) => {

            if (m.level <= this.level)
                this.logMessage(m);

        })

    ];

    }

    /**
     * logMessage is overridden by implementations to do the actual log
     * persistence.
     */
    abstract logMessage(m: Message): void;

    run() { }

}

/**
 * NoLogger does not log any messages it receives.
 */
export class NoLogger extends Logger {

    logMessage() { }
}

/**
 * ConsoleLogger is a Logger implementation that uses the console.
 */
export class ConsoleLogger extends Logger {

    logMessage(m: Message) {

        let msg = `[${m.actor}] ${m.text}`;

        switch (m.level) {

            case LOG_LEVEL_INFO:
                console.info(msg);
                break;

            case LOG_LEVEL_WARN:
                console.warn(msg);
                break;

            case LOG_LEVEL_DEBUG:
                console.warn(msg);
                break;

            case LOG_LEVEL_ERROR:
                console.error(msg);
                break;

            default:
                break;

        }

    }

}
