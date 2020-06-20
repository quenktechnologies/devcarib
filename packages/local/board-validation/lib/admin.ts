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

import { Admin } from '@board/types/lib/admin';

/**
 * Schema for validating a value as a Admin.
 */
export interface Schema extends Record<Precondition<Value, Value>> {

    name: Precondition<Value, string>,

    email: Precondition<Value, string>,

    password: Precondition<Value, string>

}

/**
 * schema implementation
 */
export const schema: Schema = {

    name: and(notNull, every(isString, trim, minLength(3), maxLength(140))),

    email: and(notNull, every(isString, trim, minLength(3), maxLength(140))),

    password: and(notNull, every(isString, trim, minLength(3), maxLength(512))),

}

/**
 * validate a JSON value as a Admin.
 */
export const validate: Precondition<Value, Admin> =
    and<Value, Object, Admin>(isRecord, restrict<Value, Value, Admin>(schema));
