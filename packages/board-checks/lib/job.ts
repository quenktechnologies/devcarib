import { id } from './';
import { validate } from '@board/validation/lib/job';
import { Precondition, async, and } from '@quenk/preconditions/lib/async';
import { disjoint } from '@quenk/preconditions/lib/async/record';
import { Job } from '@board/types/lib/job';
import { Value } from '@quenk/noni/lib/data/json';

export const check: Precondition<Value, Job> = and(
    async(validate), disjoint<any, any, any, Job>({

        id: id

    })
)
