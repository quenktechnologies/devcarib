import { Value } from '@quenk/noni/lib/data/jsonx';
import { Precondition, Preconditions } from '@quenk/preconditions/lib/async';
import { Post } from '@converse/types/lib/post';
/**
 * @private Used during template generation.
 */
export declare type DataType = Post;
/**
 * checks for Post provided as a map.
 */
export declare const checks: Preconditions<Value, Value>;
/**
 * partialChecks for Post provided as a map.
 */
export declare const partialChecks: Preconditions<Value, Value>;
/**
 * check a Post value.
 */
export declare const check: Precondition<Value, Post>;
/**
 * checkPartial a partial Post value.
 */
export declare const checkPartial: Precondition<Value, Partial<Post>>;
