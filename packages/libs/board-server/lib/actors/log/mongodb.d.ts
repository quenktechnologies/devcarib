import * as mongodb from 'mongodb';
import { Future } from '@quenk/noni/lib/control/monad/future';
import { Milliseconds } from '@quenk/noni/lib/control/time';
import { System } from '@quenk/potoo/lib/actor/system';
import { Message, Logger } from './';
/**
 * CollectionProvider is a function that provides an instance of the collection
 * we write messages to.
 */
export declare type CollectionProvider = () => Future<mongodb.Collection>;
/**
 * MongoDbLoggerConf holds configuration options for the MongoDbLogger.
 */
export interface MongoDbLoggerConf {
    /**
     * interval at which to actually persist messages.
     *
     * Messages are not saved immediately to avoid overwhelming the database.
     */
    interval: Milliseconds;
}
/**
 * MongoDbLogger implementation.
 */
export declare class MongoDbLogger extends Logger {
    system: System;
    collection: CollectionProvider;
    conf: MongoDbLoggerConf;
    constructor(system: System, collection: CollectionProvider, conf: MongoDbLoggerConf);
    buffer: Message[];
    static create(system: System, collection: CollectionProvider, conf?: Partial<MongoDbLoggerConf>): MongoDbLogger;
    /**
     * logMessage does not log the message immediately, instead they are added
     * to the buffer.
     */
    logMessage(m: Message): void;
    /**
     * flush the buffer by adding all pending messages to the database.
     */
    flush(): Future<void>;
    run(): void;
}
