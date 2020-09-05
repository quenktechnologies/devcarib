import { Precondition } from '@quenk/preconditions/lib/async';
import { Value } from '@quenk/noni/lib/data/jsonx';
import { Admin } from '@board/types/lib/admin';
/**
 * post check function for Admin types.
 */
export declare const post: Precondition<Value, Admin>;
/**
 * patch check function for Admin types.
 */
export declare const patch: Precondition<Value, Admin>;
