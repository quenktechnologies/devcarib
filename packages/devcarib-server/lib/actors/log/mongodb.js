"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDbLogger = void 0;
const future_1 = require("@quenk/noni/lib/control/monad/future");
const array_1 = require("@quenk/noni/lib/data/array");
const record_1 = require("@quenk/noni/lib/data/record");
const collection_1 = require("@quenk/noni-mongodb/lib/database/collection");
const _1 = require("./");
const defaultConf = {
    level: _1.LOG_LEVEL_WARN,
    interval: 10000
};
/**
 * MongoDbLogger implementation.
 */
class MongoDbLogger extends _1.Logger {
    constructor(system, collection, conf) {
        super(conf.level, system);
        this.system = system;
        this.collection = collection;
        this.conf = conf;
        this.buffer = [];
    }
    static create(system, collection, conf = {}) {
        return new MongoDbLogger(system, collection, (0, record_1.merge)(defaultConf, conf));
    }
    /**
     * logMessage does not log the message immediately, instead they are added
     * to the buffer.
     */
    logMessage(m) {
        this.buffer.push(m);
    }
    /**
     * flush the buffer by adding all pending messages to the database.
     */
    flush() {
        let { buffer } = this;
        let self = this;
        return (0, future_1.doFuture)(function* () {
            if (!(0, array_1.empty)(buffer)) {
                let collection = yield self.collection();
                yield (0, collection_1.insertMany)(collection, buffer);
                self.buffer = [];
            }
            return (0, future_1.pure)(undefined);
        });
    }
    run() {
        setInterval(() => this.flush(), this.conf.interval);
    }
}
exports.MongoDbLogger = MongoDbLogger;
//# sourceMappingURL=mongodb.js.map