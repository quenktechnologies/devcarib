"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = exports.clock = void 0;
const clock_1 = require("@board/server/lib/actors/task/clock");
const mongodb_1 = require("@board/server/lib/actors/log/mongodb");
const log_1 = require("@board/server/lib/actors/log");
const future_1 = require("@quenk/noni/lib/control/monad/future");
const connection_1 = require("@quenk/tendril/lib/app/connection");
exports.clock = {
    id: 'clock',
    create: (s) => clock_1.TaskClock.create(s, { log: '/log' })
};
exports.log = {
    id: 'log',
    create: (s) => {
        switch (process.env.BOARD_LOG_SINK) {
            case 'db':
                return mongodb_1.MongoDbLogger.create(s, () => future_1.doFuture(function* () {
                    let db = yield connection_1.unsafeGetUserConnection('main');
                    return future_1.pure(db.collection('log'));
                }));
            case 'console':
                return new log_1.ConsoleLogger(s);
            default:
                return new log_1.NoLogger(s);
        }
    }
};
//# sourceMappingURL=services.js.map