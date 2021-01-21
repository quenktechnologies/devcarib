import * as moment from 'moment';
import * as mongo from 'mongodb';

import { Future, pure, raise } from '@quenk/noni/lib/control/monad/future';
import { DoFn, doN } from '@quenk/noni/lib/control/monad';
import {
    insertOne,
    findOne,
} from '@quenk/safe-mongodb/lib/database/collection';
import { App } from '@quenk/tendril/lib/app';

import { Settings } from '@board/types/lib/settings';
import {  check } from '@board/checks/lib/admin';

export const ADMIN_EMAIL = 'ADMIN_EMAIL';
export const ADMIN_PWD = 'ADMIN_PASSWORD';
export const VERSION = '0.0.1';

export const E_NO_ADMIN_CREDS =
    'Cannot continue installation, admin credentials missing!';

export const SETTINGS_ID = 'main';

/**
 * Setup script.
 */
export class Setup {

    constructor(public app: App) { }

    isInstalled(db: mongo.Db): Future<boolean> {

        return doN(<DoFn<boolean, Future<boolean>>>function*() {

            let settings = db.collection('settings');
            let mhit = yield findOne(settings, { id: SETTINGS_ID });

            return pure(mhit.isJust());

        });

    }

    installAdminUser(db: mongo.Db): Future<void> {

        return doN(<DoFn<void, Future<void>>>function*() {

            let name = 'Administrator';
            let email = process.env[ADMIN_EMAIL];
            let password = process.env[ADMIN_PWD];

            if ((email == null) || (password == null))
                return raise(new Error(E_NO_ADMIN_CREDS));

            let eAdmin = yield check({
                name,
                email,
                password,
            });

            if (eAdmin.isLeft()) {

                let err = JSON.stringify(eAdmin.takeLeft().explain({}));

                return <Future<void>>raise(new Error(
                    `Could not install admin user: \n ${err}`));

            }

            let admins = db.collection('admins');
            let admin = eAdmin.takeRight();

            admin.id = 1;

            return insertOne(admins, admin);

        });

    }

    /**
     * installSettings
     */
    installSettings(db: mongo.Db): Future<void> {

        return doN(<DoFn<void, Future<void>>>function*() {

            let settings = db.collection('settings');

            yield insertOne(settings, newSettings());

            return pure(<void>undefined);

        });

    }

    run(): Future<void> {

        let { app } = this;
        let that = this;

        return doN(<DoFn<void, Future<void>>>function*() {

            let db = yield getMain(app);

            let yes = yield that.isInstalled(db);

            if (!yes) {

                yield that.installAdminUser(db);

                yield that.installSettings(db);

            }

            return pure(<void>undefined);

        });

    }

}

const newSettings = (): Settings => ({

    id: SETTINGS_ID,

    installation: {

        successful: true,

        date: <any>moment.utc().toDate(),

        version: VERSION

    },
    counters: {}

});

const getMain = (app: App): Future<mongo.Db> =>
    app.pool.get('main')
        .map(c => c.checkout())
        .orJust(() => connectionNotFoundErr())
        .map(f => <Future<mongo.Db>>f)
        .get();

const connectionNotFoundErr = () =>
    raise(new Error('setup: main connection not found!'));

/**
 * run
 */
export const run = (app: App): Future<void> =>
    new Setup(app).run();
