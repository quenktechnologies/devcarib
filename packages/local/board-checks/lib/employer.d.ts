import { Precondition } from '@quenk/preconditions/lib/async';
import { Value } from '@quenk/noni/lib/data/json';
import { Employer } from '@board/types/lib/employer';
/**
 * check for Employer type.
 */
export declare const check: Precondition<Value, Employer>;
