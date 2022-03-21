import * as bcryptjs from 'bcryptjs';
import * as uuid from 'uuid';
import * as mongodb from 'mongodb';
import * as moment from 'moment';
import * as commonMark from '@devcarib/common/lib/common-mark';

import { Object, Value } from '@quenk/noni/lib/data/jsonx';
import {
    Future,
    fromCallback,
    pure
} from '@quenk/noni/lib/control/monad/future';
import { DoFn, doN } from '@quenk/noni/lib/control/monad';
import { unsafeGet } from '@quenk/noni/lib/data/record/path';
import { isObject } from '@quenk/noni/lib/data/type';
import {
    Result as SResult,
    succeed,
    fail
} from '@quenk/preconditions/lib/result';
import { Precondition } from '@quenk/preconditions/lib/async';
import {
    findOneAndUpdate, count
} from '@quenk/noni-mongodb/lib/database/collection';
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
 * unique fails if the value specified for the field is already stored in the
 * database.
 */
export const unique =
    <A>(collection: string, field: string, dbid = 'main') =>
        (value: A): Result<A, A> =>
            doN(<DoFn<SResult<A, A>, Result<A, A>>>function*() {

                let db = yield getMain(dbid);

                let n = yield count(db.collection(collection), {

                    [field]: value

                });

                return pure((n > 0) ?
                    fail<A, A>('unique', value, { value }) :
                    succeed<A, A>(value));

            });

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

/**
 * timestamp provides the current UTC datetime as a Date object.
 */
export const timestamp = (): Result<Value, Value> =>
    pure(succeed(<Value>moment.utc().toDate()));

/**
 * parseMarkdown parses the value of a property on a object as markdown
 * and sets the result to the target destination.
 */
export const parseMarkdown =
    (src: string, dest: string) =>
        <T extends Object>(value: T): Result<T, T> => fromCallback(cb => {

            if (!isObject(value)) return cb(null, succeed(value));

            let val = <Object>value;

            if (val[src] == null) return cb(null, succeed(value));

            val[dest] = commonMark.parse(String(val[src]));

            cb(null, succeed(<T>val));

        });
