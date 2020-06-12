import { id } from './';
import {
    Precondition,
    async,
    and,
    identity
} from '@quenk/preconditions/lib/async';
import { restrict } from '@quenk/preconditions/lib/async/record';
import { Value } from '@quenk/noni/lib/data/json';

import { Job } from '@board/types/lib/job';
import { validate } from '@board/validation/lib/job';

/**
 * check for Job type.
 */
export const check: Precondition<Value, Job> = and(
    async(validate), restrict<any, any, Job>({

        id: id,

        title: identity,

        country: identity,

        city: identity,

        type: identity,

        role: identity,

        industry: identity,

        technologies: identity,

        description: identity,

        link: identity

    }))
