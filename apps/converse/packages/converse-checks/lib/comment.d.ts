import { Value } from '@quenk/noni/lib/data/jsonx';
import { Precondition, Preconditions } from '@quenk/preconditions/lib/async';
import { Comment } from '@converse/types/lib/comment';
/**
 * @private Used during template generation.
 */
export declare type DataType = Comment;
/**
 * checks for Comment provided as a map.
 */
export declare const checks: Preconditions<Value, Value>;
/**
 * partialChecks for Comment provided as a map.
 */
export declare const partialChecks: Preconditions<Value, Value>;
/**
 * check a Comment value.
 */
export declare const check: Precondition<Value, Comment>;
/**
 * checkPartial a partial Comment value.
 */
export declare const checkPartial: Precondition<Value, Partial<Comment>>;
