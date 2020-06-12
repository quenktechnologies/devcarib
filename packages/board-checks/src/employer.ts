import {
    Precondition,
    async,
    and,
    identity
} from '@quenk/preconditions/lib/async';
import { restrict } from '@quenk/preconditions/lib/async/record';
import { Value } from '@quenk/noni/lib/data/json';

import { Employer } from '@board/types/lib/employer';
import { validate } from '@board/validation/lib/employer';

import { id, bcrypt } from './';

/**
 * check for Employer type.
 */
export const check: Precondition<Value, Employer> = and(
    async(validate), restrict<any, any, Employer>({

        id: id,

        name: identity,

        website: identity,

        email: identity,

        password: bcrypt,

        description: identity

    }))
