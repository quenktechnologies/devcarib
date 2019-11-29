import { id, bcrypt } from './';
import { validate } from '@board/validation/lib/employer';
import { Precondition, async, and } from '@quenk/preconditions/lib/async';
import { disjoint } from '@quenk/preconditions/lib/async/record';
import { Employer } from '@board/types/lib/employer';
import { Value } from '@quenk/noni/lib/data/json';

export const check: Precondition<Value, Employer> = and(
    async(validate), disjoint<any, any, any, Employer>({

        id: id,
        password: bcrypt

    })
)
