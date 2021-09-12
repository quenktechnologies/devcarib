"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mail = exports.log = exports.clock = void 0;
const resident_1 = require("@quenk/potoo/lib/actor/resident");
const clock_1 = require("@board/server/lib/actors/task/clock");
const mongodb_1 = require("@board/server/lib/actors/log/mongodb");
const log_1 = require("@board/server/lib/actors/log");
const server_1 = require("@board/server/lib/actors/mail/server");
const future_1 = require("@quenk/noni/lib/control/monad/future");
const connection_1 = require("@quenk/tendril/lib/app/connection");
class NullActor extends resident_1.Immutable {
    constructor() {
        super(...arguments);
        this.receive = [];
    }
    run() { }
}
exports.clock = {
    id: 'clock',
    create: (s) => clock_1.TaskClock.create(s, { log: '/log' })
};
exports.log = {
    id: 'log',
    create: (s) => {
        let level = Number(process.env.BOARD_LOG_LEVEL || log_1.LOG_LEVEL_INFO);
        switch (process.env.BOARD_LOG_SINK) {
            case 'db':
                return mongodb_1.MongoDbLogger.create(s, () => future_1.doFuture(function* () {
                    let db = yield connection_1.unsafeGetUserConnection('main');
                    return future_1.pure(db.collection('log'));
                }), { level });
            case 'console':
                return new log_1.ConsoleLogger(level, s);
            default:
                return new log_1.NoLogger(level, s);
        }
    }
};
exports.mail = {
    id: 'mail',
    create: (s) => process.env.BOARD_MAIL_ENABLED ?
        server_1.MailServer.create(s, {
            host: process.env.BOARD_MAIL_HOST,
            port: 465,
            username: process.env.BOARD_MAIL_USERNAME,
            password: process.env.BOARD_MAIL_PASSWORD,
            maxMessagesSent: 5
        }) :
        new NullActor(s)
};
//# sourceMappingURL=services.js.map