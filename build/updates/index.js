"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMain = exports.DevCaribUpdater = void 0;
const june2022 = require("./2022/june");
const future_1 = require("@quenk/noni/lib/control/monad/future");
const collection_1 = require("@quenk/noni-mongodb/lib/database/collection");
const update_1 = require("@devcarib/server/lib/data/update");
// Loads the updates
new june2022.EnsureRootUser();
class DevCaribUpdater extends update_1.Updater {
    _getSettings(col) {
        return (0, future_1.doFuture)(function* () {
            let msettings = yield (0, collection_1.findOne)(col, {});
            if (msettings.isNothing())
                return (0, future_1.raise)(new Error('Cannot retreive update list! ' +
                    'Settings not installed!'));
            return (0, future_1.pure)(msettings.get());
        });
    }
    getUpdates() {
        let that = this;
        return (0, future_1.doFuture)(function* () {
            let db = yield (0, exports.getMain)(that.app);
            let col = db.collection('settings');
            let settings = yield that._getSettings(col);
            if (!settings.updates) {
                let updates = { installed: [], stats: {} };
                yield (0, collection_1.updateOne)(col, {}, { $set: { updates } });
                return (0, future_1.pure)([]);
            }
            else {
                let installed = settings.updates.installed;
                return (0, future_1.pure)(installed);
            }
        });
    }
    onComplete(udate, start, end) {
        let that = this;
        return (0, future_1.doFuture)(function* () {
            let db = yield (0, exports.getMain)(that.app);
            let col = db.collection('settings');
            let settings = yield that._getSettings(col);
            yield (0, collection_1.updateOne)(col, { id: settings.id }, {
                $push: { 'updates.installed': udate.key },
                $set: {
                    [`updates.stats.${udate.key}`]: {
                        start,
                        end,
                        duration: end - start
                    }
                }
            });
            return future_1.voidPure;
        });
    }
}
exports.DevCaribUpdater = DevCaribUpdater;
const getMain = (app) => (0, future_1.doFuture)(function* () {
    let mconn = app.pool.get('main');
    if (mconn.isNothing())
        return (0, future_1.raise)(new Error('Connection "main" not found!'));
    return mconn.get().checkout();
});
exports.getMain = getMain;
//# sourceMappingURL=index.js.map