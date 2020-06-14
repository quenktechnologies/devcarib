import { Precondition } from '@quenk/preconditions/lib/async';
import { Value } from '@quenk/noni/lib/data/jsonx';
import { Post } from '@board/types/lib/post';
/**
 * check function for Post types.
 */
export declare const check: Precondition<Value, Post>;
