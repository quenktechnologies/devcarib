/**
 * This module provides a basic API for automatically applying updates to
 * databases (migration) as the application changes.
 *
 * This is the preferred way to modifying schema and application data (as
 * opposed to manually executing queries or scripts).
 */

import {
    Future,
    doFuture,
    raise,
    sequential,
    voidPure
} from '@quenk/noni/lib/control/monad/future';
import { Type } from '@quenk/noni/lib/data/type';

import { App } from '@quenk/tendril/lib/app';
import { empty } from '@quenk/noni/lib/data/array';
import { Milliseconds } from '@quenk/noni/lib/control/time';

/**
 * Key is a unique, descriptive used to identify the patch from others.
 *
 * It should have the following format:
 * <date>"_"<purpose>
 *
 * Where date is in ISO8601 format and purpose uses '-' for spaces.
 *
 * Example:
 * 20220605_ensure-indexes
 */
export type Key = string;

const updates: Update[] = [];

/**
 * Update represents a single update to be applied to the database.
 *
 * Instantiating a child of this class automatically adds it to the global
 * lists of updates to apply.
 */
export abstract class Update {

    constructor() { updates.push(this); }

    /**
     * key for this Update.
     */
    abstract key: Key;

    /**
     * timestamp is used to sort updates in order of priority.
     *
     * Oldest updates are applied first.
     */
    abstract timestamp: Milliseconds;

    /**
     * description of the patch used by the manager to indicate what the job
     * does on the CLI.
     */
    abstract description: string;

    /**
     * prepare can be overridden to preform initial steps such as data backup
     * before executing the actual update.
     */
    prepare(_updater: Updater): Future<void> {

        return voidPure;

    }

    /**
     * restore is called if an attempt to apply an update fails.
     *
     * This method can be used to restore modified data to its backed up state.
     */
    restore(_updater: Updater): Future<void> {

        return voidPure;

    }

    /**
     * run the update.
     */
    abstract run(_updater: Updater): Future<void>

}

/**
 * Logger interface.
 */
export interface Logger {

    info(...args: Type[]): void

    warn(...args: Type[]): void

    error(...args: Type[]): void

}

/**
 * Updater provides a simplistic, date based patch mechanism for updating the
 * application's database.
 *
 * Updates are stored in a single, global list that is automatically populated
 * by [[Update]] child classes.
 */
export abstract class Updater {

    constructor(public app: App, public logger: Logger = console) { }

    /**
     * getUpdates must be implemented to provide a list of updates
     * already applied.
     *
     * These will be used to determine which updates still need to be applied.
     */
    abstract getUpdates(): Future<Key[]>

    /**
     * onComplete is called each time an update has been successfully
     * applied.
     *
     * Use it to maintain a persistent record for future app restarts.
     */
    abstract onComplete(
        _udate: Update,
        _start: Milliseconds,
        _end: Milliseconds): Future<void>

    /**
     * run all configured updates, one at a time.
     *
     * If any of these fail the entire update process is considered failed.
     */
    run(): Future<void> {

        let that = this;

        let { logger } = this;

        if (empty(updates)) return voidPure;

        logger.info(`Found ${updates.length} updates, applying any missing...`);

        let counter = 0;

        return doFuture(function*() {

            let applied: Key[] = yield that.getUpdates();

            yield sequential(updates.sort().map(next =>
                doFuture(function*() {

                    let { key } = next;

                    if (applied.includes(key)) {

                        logger.info(`Skipping "${key}"...`);

                        return voidPure;

                    }

                    logger.info(`Applying update: "${key}"...`);

                    logger.info('Description:');

                    logger.info(next.description);

                    let start = Date.now();

                    yield next.prepare(that);

                    yield next.run(that).catch(e => doFuture(function*() {

                        logger.error(`"${key} failed! ` +
                            `Attempting to rollback...`);

                        yield next.restore(that);

                        logger.warn(`Rollback for "${key}" complete.`);

                        logger.warn(`The update process has failed! ` +
                            `The application is unable to start!`);

                        return raise(e);

                    }));

                    logger.info(`Update "${key}" successfully applied!`);

                    yield that.onComplete(next, start, Date.now());

                    counter++;

                    return voidPure;

                })));

            logger.info(`Successfully applied ${counter} updates!`);

            return voidPure;
        });

    }

}
