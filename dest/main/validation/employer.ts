import {Value} from '@quenk/noni/lib/data/json';
import {Precondition, optional, and} from '@quenk/preconditions';
import { isRecord, restrict } from '@quenk/preconditions/lib/record';
import {isString} from '@quenk/preconditions/lib/string';

import {Employer} from '../types/employer';

/**
 * Validate a JSON value to see if it's an Employer.
 */
export const validate:Precondition<Value, Employer> = and(isRecord, restrict<any,any,any,Employer>({

    name:isString,
    website:optional(isString),
    email:isString,
    password:isString,
    description:isString

}))