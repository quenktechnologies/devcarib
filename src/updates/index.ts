import * as mongo from 'mongodb';
import * as june2022 from './2022/june';

import {
    Future,
    doFuture,
    raise,
    pure,
    voidPure
} from '@quenk/noni/lib/control/monad/future';
import { Milliseconds } from '@quenk/noni/lib/control/time';
import { Object } from '@quenk/noni/lib/data/jsonx';
import { Maybe } from '@quenk/noni/lib/data/maybe';

import { App } from '@quenk/tendril/lib/app';

import {
    findOne,
    updateOne
} from '@quenk/noni-mongodb/lib/database/collection';

import { Key, Updater, Update } from '@devcarib/server/lib/data/update';

import { Settings } from '@board/types/lib/settings';

// Loads the updates
new june2022.EnsureRootUser();

export class DevCaribUpdater extends Updater {

    _getSettings(col: mongo.Collection): Future<Settings> {

        return doFuture(function*() {

            let msettings: Maybe<Settings> = yield findOne(col, {});

            if (msettings.isNothing())
                return raise<Settings>(
                    new Error('Cannot retreive update list! ' +
                        'Settings not installed!'));

            return pure(<Settings>msettings.get());

        })

    }

    getUpdates(): Future<Key[]> {

        let that = this;

        return doFuture(function*() {

            let db: mongo.Db = yield getMain(that.app);

            let col = db.collection('settings');

            let settings: Settings = yield that._getSettings(col);

            if (!settings.updates) {

                let updates = { installed: [], stats: {} };

                yield updateOne(col, {}, { $set: { updates } });

                return <Future<Key[]>>pure([]);

            } else {

                let installed: Key[] =
                    <Key[]>(<Object>settings.updates).installed;

                return pure(installed);

            }

        });

    }

    onComplete(
        udate: Update,
        start: Milliseconds,
        end: Milliseconds): Future<void> {

        let that = this;

        return doFuture(function*() {

            let db: mongo.Db = yield getMain(that.app);

            let col = db.collection('settings');

            let settings: Settings = yield that._getSettings(col);

            yield updateOne(col, { id: settings.id }, {

                $push: { 'updates.installed': udate.key },

                $set: {

                    [`updates.stats.${udate.key}`]: {

                        start,

                        end,

                        duration: end - start

                    }

                }
            });

            return voidPure;

        });

    }

}

export const getMain = (app: App): Future<mongo.Db> => doFuture(function*() {

    let mconn = app.pool.get('main');

    if (mconn.isNothing())
        return raise(new Error('Connection "main" not found!'));

    return mconn.get().checkout();

});
