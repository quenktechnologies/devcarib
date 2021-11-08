import { Record } from '@quenk/noni/lib/data/record';
import { Milliseconds } from '@quenk/noni/lib/control/time';
import { Object } from '@quenk/noni/lib/data/json';
import { System } from '@quenk/potoo/lib/actor/system';
import { Case } from '@quenk/potoo/lib/actor/resident/case';
import { Immutable } from '@quenk/potoo/lib/actor/resident';
import { Address } from '@quenk/potoo/lib/actor/address';
/**
 * Interval is an identifier expanded by the TaskClock into a predefined
 * multiple of the internal counter.
 */
export declare type Interval = string;
/**
 * Message type for the TaskClock.
 */
export declare type Message = Subscribe | Publish;
/**
 * Tick
 */
export declare class Tick {
    src: Address;
    constructor(src: Address);
}
/**
 * Subscribe to the clock using the specified interval.
 *
 * Intervals will be expanded by the TaskClock into their respective numerical
 * value from the TimeConf.
 */
export declare class Subscribe {
    interval: Interval;
    actor: Address;
    constructor(interval: Interval, actor: Address);
}
/**
 * Publish is used internally to trigger notifications.
 */
export declare class Publish {
}
/**
 * Finished should be sent to the TaskClock once an actor has completed its
 * work for a tick.
 */
export declare class Finished {
    actor: Address;
    constructor(actor: Address);
}
/**
 * TaskClockConf is the configuration object for the TaskClock.
 */
export interface TaskClockConf extends Object {
    /**
     * rate or clock rate is used for the setInterval() call.
     */
    rate: Milliseconds;
    /**
     * log is the address of an actor to send log messages to.
     */
    log: Address;
    /**
     * time configuration.
     */
    time: TimeConf;
}
/**
 * TimeConf is a map of interval names to multiples of the TaskClock counter.
 *
 * These intervals are multiples of the number of times the clock has "ticked".
 * That is to say, a value of 60 means "every 60 ticks" for example. Predefined
 * values are used instead of the raw value to enforce some kind of consistency.
 */
export interface TimeConf extends Record<number> {
}
/**
 * TargetInfo contains the meta data needed to track and notify actors
 * subscribed to the TaskClock.
 */
export declare class TargetInfo {
    actor: Address;
    step: number;
    busy: boolean;
    counter: number;
    /**
     * @param actor         - Address of actor to receive the "Tick" message.
     * @param step          - When the clock reaches a multiple of this number,
     *                        the actor will be notified.
     * @param busy          - If true, then the actor will not be notified.
     * @param counter       - Keeps track of how many times the actor was
     *                        successfully notified.
     */
    constructor(actor: Address, step: number, busy?: boolean, counter?: number);
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
export declare class TaskClock extends Immutable<Message> {
    system: System;
    conf: TaskClockConf;
    targets: TargetInfo[];
    counter: number;
    constructor(system: System, conf: TaskClockConf);
    static create(system: System, conf?: Partial<TaskClockConf>): TaskClock;
    receive(): Case<Message>[];
    log(msg: string): void;
    /**
     * register an actor with the TaskClock.
     *
     * Duplicates will be ignored.
     */
    register(s: Subscribe): void;
    /**
     * publish any notifications for the subscribed actors.
     */
    publish(): void;
    /**
     * actorFinished is called each time an actor finishes its work to remove
     * the busy flag.
     */
    actorFinished(actor: Address): void;
    run(): void;
}
