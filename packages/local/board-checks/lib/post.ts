import { inc } from './';
import {
    Precondition,
    async,
    and,
    identity
} from '@quenk/preconditions/lib/async';
import { restrict } from '@quenk/preconditions/lib/async/record';
import { Value } from '@quenk/noni/lib/data/jsonx';

import { Post } from '@board/types/lib/post';
import { validate } from '@board/validation/lib/post';

/**
 * check function for Post types.
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

    }));
