import * as mongodb from 'mongodb';

import { System } from '@quenk/potoo/lib/actor/system';

import { TaskClock } from '@board/server/lib/actors/task/clock';
import { MongoDbLogger } from '@board/server/lib/actors/log/mongodb';
import { ConsoleLogger, NoLogger } from '@board/server/lib/actors/log';
import { doFuture, pure } from '@quenk/noni/lib/control/monad/future';
import { unsafeGetUserConnection } from '@quenk/tendril/lib/app/connection';

export const clock = {

    id: 'clock',

    create: (s: System) => TaskClock.create(s, {log: '/log'})

}

export const log = {

    id: 'log',

    create: (s: System) => {

        switch (process.env.BOARD_LOG_SINK) {

            case 'db':
                return MongoDbLogger.create(s, () => doFuture(function*() {

                    let db: mongodb.Db = yield unsafeGetUserConnection('main');

                    return pure(db.collection('log'));

                }));

            case 'console':
                return new ConsoleLogger(s);

            default:
                return new NoLogger(s);

        }

    }

}
