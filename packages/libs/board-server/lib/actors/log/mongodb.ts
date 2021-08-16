import * as mongodb from 'mongodb';

import { Future, doFuture, pure } from '@quenk/noni/lib/control/monad/future';
import { Milliseconds } from '@quenk/noni/lib/control/time';
import { empty } from '@quenk/noni/lib/data/array';
import { merge } from '@quenk/noni/lib/data/record';

import { System } from '@quenk/potoo/lib/actor/system';

import { insertMany } from '@quenk/noni-mongodb/lib/database/collection';

import { LogLevel,Message, Logger, LOG_LEVEL_WARN } from './';

/**
 * CollectionProvider is a function that provides an instance of the collection
 * we write messages to.
 */
export type CollectionProvider = () => Future<mongodb.Collection>;

/**
 * MongoDbLoggerConf holds configuration options for the MongoDbLogger.
 */
export interface MongoDbLoggerConf {

    /**
     * level for logging.
     */
    level: LogLevel,

    /**
     * interval at which to actually persist messages.
     *
     * Messages are not saved immediately to avoid overwhelming the database.
     */
    interval: Milliseconds

}

const defaultConf: MongoDbLoggerConf = {

    level: LOG_LEVEL_WARN,

    interval: 10000

};

/**
 * MongoDbLogger implementation.
 */
export class MongoDbLogger extends Logger {

    constructor(
        public system: System,
        public collection: CollectionProvider,
        public conf: MongoDbLoggerConf) { super(conf.level, system); }

    buffer: Message[] = [];

    static create(
        system: System,
        collection: CollectionProvider,
        conf: Partial<MongoDbLoggerConf> = {}): MongoDbLogger {

        return new MongoDbLogger(
            system,
            collection,
            merge(defaultConf, conf)
        );

    }

    /**
     * logMessage does not log the message immediately, instead they are added
     * to the buffer.
     */
    logMessage(m: Message) {

        this.buffer.push(m);

    }

    /**
     * flush the buffer by adding all pending messages to the database.
     */
    flush(): Future<void> {

        let { buffer } = this;
        let self = this;

        return doFuture<void>(function*() {

            if (!empty(buffer)) {

                let collection = yield self.collection();

                yield insertMany(collection, buffer);

                self.buffer = [];

            }

            return pure(<void>undefined);

        });

    }

    run() {

        setInterval(() => this.flush(), this.conf.interval);

    }
}
