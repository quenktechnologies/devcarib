import {
    Precondition,
    async,
    and,
    identity
} from '@quenk/preconditions/lib/async';
import { restrict, intersect } from '@quenk/preconditions/lib/async/record';
import { Value } from '@quenk/noni/lib/data/jsonx';

import { Post } from '@board/types/lib/post';
import { validate } from '@board/validation/lib/post';

import { inc, timestamp } from './';

/**
 * check function for new Post types.
 */
export const check: Precondition<Value, Post> = and(
    async(validate), restrict<Value, Value, Post>({

        id: inc('posts'),

        title: identity,

        description: identity,

        company: identity,

        company_email: identity,

        company_logo: identity,

        apply_url: identity,

        created_on: timestamp,

        last_modified_on: timestamp

    }));

/**
 * patch function for existing Post types.
 */
export const patch: Precondition<Value, Post> = and(
    async(validate), intersect<Value, Value, Post>({

        title: identity,

        description: identity,

        company: identity,

        company_email: identity,

        company_logo: identity,

        apply_url: identity,

        last_modified_on: timestamp

    }));
