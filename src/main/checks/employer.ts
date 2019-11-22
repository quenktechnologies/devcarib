import * as bcryptjs from 'bcryptjs';
import * as v4 from 'uuid/v4';

import { Future, fromCallback, pure } from '@quenk/noni/lib/control/monad/future';

import { Result as SResult, succeed } from '@quenk/preconditions/lib/result';
import { doN, DoFn } from '@quenk/noni/lib/control/monad';
import { validate } from '../validation/employer';
import { Precondition, async, and } from '@quenk/preconditions/lib/async';
import { disjoint } from '@quenk/preconditions/lib/async/record';
import { Employer } from '../types/employer';
import { Value } from '@quenk/noni/lib/data/json';

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

export const id = (): Result<void, string> =>
    pure (succeed(v4()));

export const check: Precondition<Value, Employer> = and(
    async(validate), disjoint<any, any, any, Employer>({

        id: id,
        password: bcrypt

    })
)

