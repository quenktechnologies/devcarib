import { Record, rmerge } from '@quenk/noni/lib/data/record';
import { Milliseconds } from '@quenk/noni/lib/control/time';
import { Object } from '@quenk/noni/lib/data/json';

import { System } from '@quenk/potoo/lib/actor/system';
import { Case, caseOf } from '@quenk/potoo/lib/actor/resident/case';
import { Immutable } from '@quenk/potoo/lib/actor/resident/immutable';
import { Address } from '@quenk/potoo/lib/actor/address';

import { Info } from '../log';

/**
 * Interval is an identifier expanded by the TaskClock into a predefined
 * multiple of the internal counter.
 */
export type Interval = string;

/**
 * Message type for the TaskClock.
 */
export type Message
    = Subscribe
    | Publish
    ;

/**
 * Tick
 */
export class Tick { constructor(public src: Address) { } }

/**
 * Subscribe to the clock using the specified interval.
 *
 * Intervals will be expanded by the TaskClock into their respective numerical
 * value from the TimeConf.
 */
export class Subscribe {

    constructor(public interval: Interval, public actor: Address) { }

}

/**
 * Publish is used internally to trigger notifications.
 */
export class Publish { }

/**
 * Finished should be sent to the TaskClock once an actor has completed its
 * work for a tick.
 */
export class Finished {

    constructor(public actor: Address) { }

}

/**
 * TaskClockConf is the configuration object for the TaskClock.
 */
export interface TaskClockConf extends Object {

    /**
     * rate or clock rate is used for the setInterval() call.
     */
    rate: Milliseconds,

    /**
     * log is the address of an actor to send log messages to.
     */
    log: Address,

    /**
     * time configuration.
     */
    time: TimeConf

}

/**
 * TimeConf is a map of interval names to multiples of the TaskClock counter.
 *
 * These intervals are multiples of the number of times the clock has "ticked".
 * That is to say, a value of 60 means "every 60 ticks" for example. Predefined
 * values are used instead of the raw value to enforce some kind of consistency.
 */
export interface TimeConf extends Record<number> { }

const defaultConf: TaskClockConf = {

    rate: 1000,

    log: 'log',

    time: {

        'freq.high': 1,

        'freq.mid': 30,

        'freq.low': 60,

        'minute': 60,

        'minute.five': 60 * 5,

        'minute.fifteen': 60 * 15,

        'hour.half': 60 * 30,

        'hour': 60 * 60,

        'daily': 60 * 60 * 24

    }

};

/**
 * TargetInfo contains the meta data needed to track and notify actors
 * subscribed to the TaskClock.
 */
export class TargetInfo {

    /**
     * @param actor         - Address of actor to receive the "Tick" message.
     * @param step          - When the clock reaches a multiple of this number,
     *                        the actor will be notified.
     * @param busy          - If true, then the actor will not be notified.
     * @param counter       - Keeps track of how many times the actor was
     *                        successfully notified.
     */
    constructor(
        public actor: Address,
        public step: number,
        public busy = false,
        public counter = 0) { }

}

/**
 * TaskClock is an actor used to co-ordinate timer based activities on behalf
 * of other actors.
 *
 * It works by maintaining an internal interval "clock" along with a counter
 * to track how many times the clock has "ticked". Actors subscribe to this
 * behaviour by indicating their interest in receiving "Tick" events from
 * the clock. Interested actors specify multiples of the counter value in the
 * Subscribe message and the clock will determine which actor to notify upon
 * each tick.
 *
 * Note: It is important that subscribing actors indicate they have completed
 * their work or this actor will no longer publish events to that destination.
 * This is done to avoid notifying subscribed actors while they are still
 * active. Use Finished for this.
 */
export class TaskClock extends Immutable<Message> {

    targets: TargetInfo[] = [];

    counter = 0;

    constructor(
        public system: System,
        public conf: TaskClockConf) { super(system); }

    static create(
        system: System,
        conf: Partial<TaskClockConf> = {}
    ): TaskClock {

        return new TaskClock(system, <TaskClockConf>rmerge(defaultConf, conf));

    }

    receive() {

        return <Case<Message>[]>[

            caseOf(Subscribe, (s: Subscribe) => this.register(s)),

            caseOf(Publish, () => this.publish()),

            caseOf(Finished, (f: Finished) => this.actorFinished(f.actor))

        ];

    }

    log(msg: string) {

        this.tell(this.conf.log, new Info(this.self(), msg));

    }

    /**
     * register an actor with the TaskClock.
     *
     * Duplicates will be ignored.
     */
    register(s: Subscribe) {

        if (this.conf.time[s.interval] &&
            !this.targets.find(t => t.actor === s.actor)) {

            let info = new TargetInfo(s.actor, this.conf.time[s.interval]);

            this.targets.push(info);

            this.log(`Registering actor=${s.actor} for interval=${s.interval}` +
                ` (every ${info.step} ticks) clock-rate=${this.conf.rate}ms.`);

        } else {

            this.log(`Actor "${s.actor}" ` +
                `specified unknown interval ${s.interval}!`);

        }

    }

    /**
     * publish any notifications for the subscribed actors.
     */
    publish() {

        this.counter = this.counter + 1;

        this.targets.forEach(target => {

            if ((this.counter % target.step) === 0) {

                if (target.busy) {

                    this.log(`Actor ${target.actor} is busy, ` +
                        `ticks-sent=${target.counter} ` +
                        `global-ticks=${this.counter}`);

                } else {

                    target.busy = true;

                    target.counter = target.counter + 1;

                    this.log(`Notifying actor ${target.actor} ` +
                        `ticks-sent=${target.counter} ` +
                        `global-ticks=${this.counter}`);

                    this.tell(target.actor, new Tick(this.self()));

                }

            }

        });

    }

    /**
     * actorFinished is called each time an actor finishes its work to remove
     * the busy flag.
     */
    actorFinished(actor: Address) {

        this.targets.forEach(target => {

            if (target.actor === actor)
                target.busy = false;

        });

    }

    run() {

        setInterval(() => this.tell(this.self(), new Publish()),
            this.conf.rate);

    }

}
