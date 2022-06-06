import * as mongo from 'mongodb';
import * as checks from '@converse/checks/lib/user';

import { Update, Updater } from '@devcarib/server/lib/data/update';
import {
    Future,
    doFuture,
    voidPure,
    raise
} from '@quenk/noni/lib/control/monad/future';

import {
    count,
    insertOne
} from '@quenk/noni-mongodb/lib/database/collection';

import { getMain } from '..';

/**
 * EnsureRootUser makes sure the system has at least one user on install.
 */
export class EnsureRootUser extends Update {

    key = '20220622_ensure-root-user';

    timestamp = 1654490680906;

    description = 'Ensures there is a root user to start the user graph. ' +
        'The credentials are source from the environment variables ROOT_USER_*';

    run({ app, logger }: Updater): Future<void> {

        return doFuture(function*() {

            let db: mongo.Db = yield getMain(app);

            let col = db.collection('users');

            let n = yield count(col, {});

            if (n !== 0) return voidPure;

            let user = {

                name: process.env.ROOT_USER_NAME,

                email: process.env.ROOT_USER_EMAIL,

                username: process.env.ROOT_USER_USERNAME,

                password: process.env.ROOT_USER_PASSWORD

            }

            let result = yield checks.check(user);

            if (result.isLeft()) {

                let failures = result.takeLeft().explain();

                logger.warn(`User validation failed: ` +
                    `${JSON.stringify(failures)}`);

                return raise(new Error('Could not create root user account!'));

            }

            yield insertOne(col, result.takeRight());

            return voidPure;

        });

    }

}
