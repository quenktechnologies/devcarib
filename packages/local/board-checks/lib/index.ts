import * as bcryptjs from 'bcryptjs';
import * as uuid from 'uuid';

import { Value } from '@quenk/noni/lib/data/jsonx';
import { Future, fromCallback, pure } from '@quenk/noni/lib/control/monad/future';
import { doN, DoFn } from '@quenk/noni/lib/control/monad';
import { Result as SResult, succeed } from '@quenk/preconditions/lib/result';
import { Precondition } from '@quenk/preconditions/lib/async';

export type Result<A, B> = Future<SResult<A, B>>;

const salt = (): Future<string> =>
    fromCallback(cb => bcryptjs.genSalt(12, cb));

const hash = (str: string, salt: string) =>
    fromCallback(cb => bcryptjs.hash(str, salt, cb));

export const bcrypt = (str: string): Result<string, string> =>
    doN(<DoFn<SResult<string, string>, Result<string, string>>>function*() {

        let salty = yield salt();
        let salted = yield hash(str, salty);

        return pure(succeed(salted));

    });

/**
 * id generates the id number for a record.
 */
export const id: Precondition<Value, Value> = () =>
    pure(succeed(<Value>uuid.v4().split('-').join('')));
