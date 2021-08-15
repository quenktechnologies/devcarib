"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskClock = exports.TargetInfo = exports.Finished = exports.Publish = exports.Subscribe = exports.Tick = void 0;
const record_1 = require("@quenk/noni/lib/data/record");
const case_1 = require("@quenk/potoo/lib/actor/resident/case");
const resident_1 = require("@quenk/potoo/lib/actor/resident");
/**
 * Tick
 */
class Tick {
    constructor(src) {
        this.src = src;
    }
}
exports.Tick = Tick;
/**
 * Subscribe to the clock using the specified interval.
 *
 * Intervals will be expanded by the TaskClock into their respective numerical
 * value from the TimeConf.
 */
class Subscribe {
    constructor(interval, actor) {
        this.interval = interval;
        this.actor = actor;
    }
}
exports.Subscribe = Subscribe;
/**
 * Publish is used internally to trigger notifications.
 */
class Publish {
}
exports.Publish = Publish;
/**
 * Finished should be sent to the TaskClock once an actor has completed its
 * work for a tick.
 */
class Finished {
    constructor(actor) {
        this.actor = actor;
    }
}
exports.Finished = Finished;
const defaultConf = {
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
class TargetInfo {
    /**
     * @param actor         - Address of actor to receive the "Tick" message.
     * @param step          - When the clock reaches a multiple of this number,
     *                        the actor will be notified.
     * @param busy          - If true, then the actor will not be notified.
     * @param counter       - Keeps track of how many times the actor was
     *                        successfully notified.
     */
    constructor(actor, step, busy = false, counter = 0) {
        this.actor = actor;
        this.step = step;
        this.busy = busy;
        this.counter = counter;
    }
}
exports.TargetInfo = TargetInfo;
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
class TaskClock extends resident_1.Immutable {
    constructor(system, conf) {
        super(system);
        this.system = system;
        this.conf = conf;
        this.targets = [];
        this.counter = 0;
        this.receive = [
            new case_1.Case(Subscribe, (s) => this.register(s)),
            new case_1.Case(Publish, () => this.publish()),
            new case_1.Case(Finished, (f) => this.actorFinished(f.actor))
        ];
    }
    static create(system, conf = {}) {
        return new TaskClock(system, record_1.rmerge(defaultConf, conf));
    }
    log(msg) {
        this.tell(this.conf.log, `[${this.self}]: ${msg}`);
    }
    /**
     * register an actor with the TaskClock.
     *
     * Duplicates will be ignored.
     */
    register(s) {
        if (this.conf.time[s.interval] &&
            !this.targets.find(t => t.actor === s.actor)) {
            let info = new TargetInfo(s.actor, this.conf.time[s.interval]);
            this.targets.push(info);
            this.log(`Registering actor=${s.actor} for interval=${s.interval}` +
                ` (every ${info.step}) clock-rate=${this.conf.rate}ms.`);
        }
        else {
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
                }
                else {
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
    actorFinished(actor) {
        this.targets.forEach(target => {
            if (target.actor === actor)
                target.busy = false;
        });
    }
    run() {
        setInterval(() => this.tell(this.self(), new Publish()), this.conf.rate);
    }
}
exports.TaskClock = TaskClock;
//# sourceMappingURL=clock.js.map