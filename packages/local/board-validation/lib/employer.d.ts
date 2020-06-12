import { Value } from '@quenk/noni/lib/data/json';
import { Precondition } from '@quenk/preconditions';
import { Employer } from '@board/types/lib/employer';
/**
 * Validate a JSON value to see if it's an Employer.
 */
export declare const validate: Precondition<Value, Employer>;
