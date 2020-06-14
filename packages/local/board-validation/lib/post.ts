import {
    Precondition,
    and,
    every,
    optional,
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

import { Post } from '@board/types/lib/post';

/**
 * Schema for validating a value as a Post.
 */
export interface Schema extends Record<Precondition<Value, Value>> {

    title: Precondition<Value, string>,

    description: Precondition<Value, string>,

    company: Precondition<Value, string>,

    company_email: Precondition<Value, string>,

    company_logo: Precondition<Value, string>,

    apply_url: Precondition<Value, string>

}

/**
 * schema implementation
 */
export const schema: Schema = {

    title: and(notNull, every(isString, trim, minLength(3), maxLength(140))),

    description: and(notNull, every(isString, trim, minLength(1),
        maxLength(8000))),

    company: and(notNull, every(isString, trim, minLength(3), maxLength(80))),

    company_email: and(notNull, every(isString, trim, minLength(3),
        maxLength(80))),

    company_logo: optional(every(isString, trim, minLength(3), maxLength(3000))),

    apply_url: optional(every(isString, trim, minLength(3), maxLength(3000)))

}

/**
 * validate a JSON value as a Post.
 */
export const validate: Precondition<Value, Post> =
    and<Value, Object, Post>(isRecord, restrict<Value, Value, Post>(schema));
