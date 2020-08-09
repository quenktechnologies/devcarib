import { inc, bcrypt } from './';
import {
    Precondition,
    async,
    and,
    identity
} from '@quenk/preconditions/lib/async';
import { restrict } from '@quenk/preconditions/lib/async/record';
import { Value } from '@quenk/noni/lib/data/jsonx';

import { Admin } from '@board/types/lib/admin';
import { validate } from '@board/validation/lib/admin';

/**
 * check function for Admin types.
 */
export const check: Precondition<Value, Admin> = and(
    async(validate), restrict<Value, Value, Admin>({

        id: inc('admins'),

        name: identity,

        email: identity,

        password: bcrypt,

    }));
