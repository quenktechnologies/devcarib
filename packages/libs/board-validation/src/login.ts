import {
    Precondition,
    and,
    every,
    notNull
} from '@quenk/preconditions';
import { Value, Object } from '@quenk/noni/lib/data/jsonx';
import { Record } from '@quenk/noni/lib/data/record';
import { isRecord, restrict } from '@quenk/preconditions/lib/record';
import {
    isString,
    maxLength,
    minLength,
    trim
} from '@quenk/preconditions/lib/string';

import { Login } from '@board/types/lib/login';

/**
 * Schema for validating login credentials.
 */
export interface Schema extends Record<Precondition<Value, Value>> {

    email: Precondition<Value, string>,

    password: Precondition<Value, string>

}

/**
 * schema implementation
 */
export const schema: Schema = {

    email: and(notNull, every(isString, trim, minLength(3), maxLength(140))),

    password: and(notNull, every(isString, trim, minLength(1), maxLength(512))),

}

/**
 * validate a JSON value against the Login credential rules.
 */
export const validate: Precondition<Value, Login> =
    and<Value, Object, Login>(isRecord, restrict<Value, Value, Login>(schema));
