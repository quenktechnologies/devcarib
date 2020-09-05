import { Precondition } from '@quenk/preconditions/lib/async';
import { Value } from '@quenk/noni/lib/data/jsonx';
import { Post } from '@board/types/lib/post';
/**
 * check function for new Post types.
 */
export declare const check: Precondition<Value, Post>;
/**
 * checkPatch function for existing Post types.
 */
export declare const checkPatch: Precondition<Value, Post>;
/**
 * admingCheckPost
 */
export declare const adminCheckPost: Precondition<Value, Post>;
/**
 * adminCheckPatch
 */
export declare const adminCheckPatch: Precondition<Value, Post>;
