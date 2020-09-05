import { inc, unique, bcrypt } from './';
import {
    Precondition,
    async,
    and,
    identity
} from '@quenk/preconditions/lib/async';
import { restrict, intersect } from '@quenk/preconditions/lib/async/record';
import { Value } from '@quenk/noni/lib/data/jsonx';

import { Admin } from '@board/types/lib/admin';
import { validate } from '@board/validation/lib/admin';

/**
 * post check function for Admin types.
 */
export const post: Precondition<Value, Admin> = and(
    async(validate), restrict<Value, Value, Admin>({

        id: inc('admins'),

        name: identity,

        email: and(identity, unique('admins', 'email')),

        password: bcrypt,

    }));

/**
 * patch check function for Admin types.
 */
export const patch: Precondition<Value, Admin> = and(
    async(validate), intersect<Value, Value, Admin>({

        password: bcrypt,

    }));
