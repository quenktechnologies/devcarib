import * as mongodb from 'mongodb';

import { System } from '@quenk/potoo/lib/actor/system';
import { Immutable } from '@quenk/potoo/lib/actor/resident';

import { TaskClock } from '@board/server/lib/actors/task/clock';
import { MongoDbLogger } from '@board/server/lib/actors/log/mongodb';
import {
    LOG_LEVEL_INFO,
    ConsoleLogger,
    NoLogger
} from '@board/server/lib/actors/log';
import { MailServer } from '@board/server/lib/actors/mail/server';

import { doFuture, pure } from '@quenk/noni/lib/control/monad/future';

import { unsafeGetUserConnection } from '@quenk/tendril/lib/app/connection';

class NullActor extends Immutable<void>{

    receive = [];

    run() { }

}

export const clock = {

    id: 'clock',

    create: (s: System) => TaskClock.create(s, { log: '/log' })

}

export const log = {

    id: 'log',

    create: (s: System) => {

        let level = Number(process.env.BOARD_LOG_LEVEL || LOG_LEVEL_INFO);

        switch (process.env.BOARD_LOG_SINK) {

            case 'db':
                return MongoDbLogger.create(s, () => doFuture(function*() {

                    let db: mongodb.Db = yield unsafeGetUserConnection('main');

                    return pure(db.collection('log'));

                }), { level });

            case 'console':
                return new ConsoleLogger(level, s);

            default:
                return new NoLogger(level, s);

        }

    }

}

export const mail = {

    id: 'mail',

    create: (s: System) => process.env.BOARD_MAIL_ENABLED ?
        MailServer.create(s, {

            host: <string>process.env.BOARD_MAIL_HOST,

            port: 465,

            username: <string>process.env.BOARD_MAIL_USERNAME,

            password: <string>process.env.BOARD_MAIL_PASSWORD,

            maxMessagesSent: 5

        }) :
    new NullActor(s)

}