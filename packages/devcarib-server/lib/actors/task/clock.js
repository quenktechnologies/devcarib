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
exports.TaskClock = exports.TargetInfo = exports.Finished = exports.Publish = exports.Subscribe = exports.Tick = void 0;
var record_1 = require("@quenk/noni/lib/data/record");
var case_1 = require("@quenk/potoo/lib/actor/resident/case");
var resident_1 = require("@quenk/potoo/lib/actor/resident");
var log_1 = require("../log");
/**
 * Tick
 */
var Tick = /** @class */ (function () {
    function Tick(src) {
        this.src = src;
    }
    return Tick;
}());
exports.Tick = Tick;
/**
 * Subscribe to the clock using the specified interval.
 *
 * Intervals will be expanded by the TaskClock into their respective numerical
 * value from the TimeConf.
 */
var Subscribe = /** @class */ (function () {
    function Subscribe(interval, actor) {
        this.interval = interval;
        this.actor = actor;
    }
    return Subscribe;
}());
exports.Subscribe = Subscribe;
/**
 * Publish is used internally to trigger notifications.
 */
var Publish = /** @class */ (function () {
    function Publish() {
    }
    return Publish;
}());
exports.Publish = Publish;
/**
 * Finished should be sent to the TaskClock once an actor has completed its
 * work for a tick.
 */
var Finished = /** @class */ (function () {
    function Finished(actor) {
        this.actor = actor;
    }
    return Finished;
}());
exports.Finished = Finished;
var defaultConf = {
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
var TargetInfo = /** @class */ (function () {
    /**
     * @param actor         - Address of actor to receive the "Tick" message.
     * @param step          - When the clock reaches a multiple of this number,
     *                        the actor will be notified.
     * @param busy          - If true, then the actor will not be notified.
     * @param counter       - Keeps track of how many times the actor was
     *                        successfully notified.
     */
    function TargetInfo(actor, step, busy, counter) {
        if (busy === void 0) { busy = false; }
        if (counter === void 0) { counter = 0; }
        this.actor = actor;
        this.step = step;
        this.busy = busy;
        this.counter = counter;
    }
    return TargetInfo;
}());
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
var TaskClock = /** @class */ (function (_super) {
    __extends(TaskClock, _super);
    function TaskClock(system, conf) {
        var _this = _super.call(this, system) || this;
        _this.system = system;
        _this.conf = conf;
        _this.targets = [];
        _this.counter = 0;
        return _this;
    }
    TaskClock.create = function (system, conf) {
        if (conf === void 0) { conf = {}; }
        return new TaskClock(system, (0, record_1.rmerge)(defaultConf, conf));
    };
    TaskClock.prototype.receive = function () {
        var _this = this;
        return [
            new case_1.Case(Subscribe, function (s) { return _this.register(s); }),
            new case_1.Case(Publish, function () { return _this.publish(); }),
            new case_1.Case(Finished, function (f) { return _this.actorFinished(f.actor); })
        ];
    };
    TaskClock.prototype.log = function (msg) {
        this.tell(this.conf.log, new log_1.Info(this.self(), msg));
    };
    /**
     * register an actor with the TaskClock.
     *
     * Duplicates will be ignored.
     */
    TaskClock.prototype.register = function (s) {
        if (this.conf.time[s.interval] &&
            !this.targets.find(function (t) { return t.actor === s.actor; })) {
            var info = new TargetInfo(s.actor, this.conf.time[s.interval]);
            this.targets.push(info);
            this.log("Registering actor=" + s.actor + " for interval=" + s.interval +
                (" (every " + info.step + " ticks) clock-rate=" + this.conf.rate + "ms."));
        }
        else {
            this.log("Actor \"" + s.actor + "\" " +
                ("specified unknown interval " + s.interval + "!"));
        }
    };
    /**
     * publish any notifications for the subscribed actors.
     */
    TaskClock.prototype.publish = function () {
        var _this = this;
        this.counter = this.counter + 1;
        this.targets.forEach(function (target) {
            if ((_this.counter % target.step) === 0) {
                if (target.busy) {
                    _this.log("Actor " + target.actor + " is busy, " +
                        ("ticks-sent=" + target.counter + " ") +
                        ("global-ticks=" + _this.counter));
                }
                else {
                    target.busy = true;
                    target.counter = target.counter + 1;
                    _this.log("Notifying actor " + target.actor + " " +
                        ("ticks-sent=" + target.counter + " ") +
                        ("global-ticks=" + _this.counter));
                    _this.tell(target.actor, new Tick(_this.self()));
                }
            }
        });
    };
    /**
     * actorFinished is called each time an actor finishes its work to remove
     * the busy flag.
     */
    TaskClock.prototype.actorFinished = function (actor) {
        this.targets.forEach(function (target) {
            if (target.actor === actor)
                target.busy = false;
        });
    };
    TaskClock.prototype.run = function () {
        var _this = this;
        setInterval(function () { return _this.tell(_this.self(), new Publish()); }, this.conf.rate);
    };
    return TaskClock;
}(resident_1.Immutable));
exports.TaskClock = TaskClock;
//# sourceMappingURL=clock.js.map