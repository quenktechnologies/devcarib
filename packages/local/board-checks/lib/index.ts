import * as bcryptjs from 'bcryptjs';
import * as uuid from 'uuid';
import * as mongodb from 'mongodb';

import { Value } from '@quenk/noni/lib/data/jsonx';
import { Future, fromCallback, pure } from '@quenk/noni/lib/control/monad/future';
import { DoFn, doN } from '@quenk/noni/lib/control/monad';
import { unsafeGet } from '@quenk/noni/lib/data/record/path';
import { Result as SResult, succeed } from '@quenk/preconditions/lib/result';
import { Precondition } from '@quenk/preconditions/lib/async';
import {
    findOneAndUpdate
} from '@quenk/safe-mongodb/lib/database/collection';
import { getInstance } from '@quenk/tendril/lib/app/connection';

export type Result<A, B> = Future<SResult<A, B>>;

export const SETTINGS_ID = 'main';

/**
 * bcrypt
 */
export const bcrypt = (str: Value): Result<Value, Value> =>
    doN(<DoFn<SResult<Value, Value>, Result<Value, Value>>>function*() {

        let salty = yield salt();
        let salted = yield hash(String(str), salty);

        return pure(succeed(salted));

    });

const salt = (): Future<string> =>
    fromCallback(cb => bcryptjs.genSalt(12, cb));

const hash = (str: string, salt: string) =>
    fromCallback(cb => bcryptjs.hash(str, salt, cb));


/**
 * id generates the id number for a record.
 */
export const id: Precondition<Value, Value> = () =>
    pure(succeed(<Value>uuid.v4().split('-').join('')));

/**
 * inc increments a counter stored in the database returning the value.
 *
 * This is used mostly for generationg sequential ids.
 */
export const inc =
    (field: string, dbid = 'main') =>
        (_: Value): Result<Value, Value> =>
            doN(<DoFn<SResult<Value, Value>, Result<Value, Value>>>function*() {

                let db = yield getMain(dbid);

                let target = db.collection('settings');

                let filter = { id: SETTINGS_ID };

                let key = `counters.${field}`;

                let update = { $inc: { [key]: 1 } };

                let opts = { returnOriginal: false };

                let r = yield findOneAndUpdate(target, filter, update, opts);

                return pure(succeed(unsafeGet(key, r.value)));

            });

const getMain = (id: string): Future<mongodb.Db> =>
    getInstance().get(id).get().checkout();
