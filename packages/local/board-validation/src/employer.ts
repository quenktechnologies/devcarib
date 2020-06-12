import { Value } from '@quenk/noni/lib/data/json';
import { Precondition, and, every, optional } from '@quenk/preconditions';
import { isRecord, restrict } from '@quenk/preconditions/lib/record';
import {
    isString,
    maxLength,
    minLength,
    trim
} from '@quenk/preconditions/lib/string';

import { Employer } from '@board/types/lib/employer';

/**
 * Validate a JSON value to see if it's an Employer.
 */
export const validate: Precondition<Value, Employer> =
    and(isRecord, restrict<any, any, Employer>({

        name: every(isString, trim, minLength(3), maxLength(140)),

        website: optional(every(isString, trim, maxLength(2048))),

        email: every(isString, trim, minLength(3), maxLength(255)),

        password: every(isString, trim, minLength(8), maxLength(512)),

        description: every(isString, trim, maxLength(3000)),

    }))
