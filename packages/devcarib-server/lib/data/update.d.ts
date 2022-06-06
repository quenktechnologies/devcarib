/**
 * This module provides a basic API for automatically applying updates to
 * databases (migration) as the application changes.
 *
 * This is the preferred way to modifying schema and application data (as
 * opposed to manually executing queries or scripts).
 */
import { Future } from '@quenk/noni/lib/control/monad/future';
import { Type } from '@quenk/noni/lib/data/type';
import { App } from '@quenk/tendril/lib/app';
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
export declare type Key = string;
/**
 * Update represents a single update to be applied to the database.
 *
 * Instantiating a child of this class automatically adds it to the global
 * lists of updates to apply.
 */
export declare abstract class Update {
    constructor();
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
    prepare(_updater: Updater): Future<void>;
    /**
     * restore is called if an attempt to apply an update fails.
     *
     * This method can be used to restore modified data to its backed up state.
     */
    restore(_updater: Updater): Future<void>;
    /**
     * run the update.
     */
    abstract run(_updater: Updater): Future<void>;
}
/**
 * Logger interface.
 */
export interface Logger {
    info(...args: Type[]): void;
    warn(...args: Type[]): void;
    error(...args: Type[]): void;
}
/**
 * Updater provides a simplistic, date based patch mechanism for updating the
 * application's database.
 *
 * Updates are stored in a single, global list that is automatically populated
 * by [[Update]] child classes.
 */
export declare abstract class Updater {
    app: App;
    logger: Logger;
    constructor(app: App, logger?: Logger);
    /**
     * getUpdates must be implemented to provide a list of updates
     * already applied.
     *
     * These will be used to determine which updates still need to be applied.
     */
    abstract getUpdates(): Future<Key[]>;
    /**
     * onComplete is called each time an update has been successfully
     * applied.
     *
     * Use it to maintain a persistent record for future app restarts.
     */
    abstract onComplete(_udate: Update, _start: Milliseconds, _end: Milliseconds): Future<void>;
    /**
     * run all configured updates, one at a time.
     *
     * If any of these fail the entire update process is considered failed.
     */
    run(): Future<void>;
}
