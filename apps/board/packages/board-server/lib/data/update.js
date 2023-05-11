"use strict";
/**
 * This module provides a basic API for automatically applying updates to
 * databases (migration) as the application changes.
 *
 * This is the preferred way to modifying schema and application data (as
 * opposed to manually executing queries or scripts).
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Updater = exports.Update = void 0;
const future_1 = require("@quenk/noni/lib/control/monad/future");
const array_1 = require("@quenk/noni/lib/data/array");
const updates = [];
/**
 * Update represents a single update to be applied to the database.
 *
 * Instantiating a child of this class automatically adds it to the global
 * lists of updates to apply.
 */
class Update {
    constructor() { updates.push(this); }
    /**
     * prepare can be overridden to preform initial steps such as data backup
     * before executing the actual update.
     */
    prepare(_updater) {
        return future_1.voidPure;
    }
    /**
     * restore is called if an attempt to apply an update fails.
     *
     * This method can be used to restore modified data to its backed up state.
     */
    restore(_updater) {
        return future_1.voidPure;
    }
}
exports.Update = Update;
/**
 * Updater provides a simplistic, date based patch mechanism for updating the
 * application's database.
 *
 * Updates are stored in a single, global list that is automatically populated
 * by [[Update]] child classes.
 */
class Updater {
    constructor(app, logger = console) {
        this.app = app;
        this.logger = logger;
    }
    /**
     * run all configured updates, one at a time.
     *
     * If any of these fail the entire update process is considered failed.
     */
    run() {
        let that = this;
        let { logger } = this;
        if ((0, array_1.empty)(updates))
            return future_1.voidPure;
        logger.info(`Found ${updates.length} updates, applying any missing...`);
        let counter = 0;
        return (0, future_1.doFuture)(function* () {
            let applied = yield that.getUpdates();
            yield (0, future_1.sequential)(updates.sort().map(next => (0, future_1.doFuture)(function* () {
                let { key } = next;
                if (applied.includes(key)) {
                    logger.info(`Skipping "${key}"...`);
                    return future_1.voidPure;
                }
                logger.info(`Applying update: "${key}"...`);
                logger.info('Description:');
                logger.info(next.description);
                let start = Date.now();
                yield next.prepare(that);
                yield next.run(that).catch(e => (0, future_1.doFuture)(function* () {
                    logger.error(`"${key} failed! ` +
                        `Attempting to rollback...`);
                    yield next.restore(that);
                    logger.warn(`Rollback for "${key}" complete.`);
                    logger.warn(`The update process has failed! ` +
                        `The application is unable to start!`);
                    return (0, future_1.raise)(e);
                }));
                logger.info(`Update "${key}" successfully applied!`);
                yield that.onComplete(next, start, Date.now());
                counter++;
                return future_1.voidPure;
            })));
            logger.info(`Successfully applied ${counter} updates!`);
            return future_1.voidPure;
        });
    }
}
exports.Updater = Updater;
//# sourceMappingURL=update.js.map