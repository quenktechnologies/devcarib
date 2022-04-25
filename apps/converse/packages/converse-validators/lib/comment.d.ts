import { Value } from '@quenk/noni/lib/data/jsonx';
import { Precondition, Preconditions } from '@quenk/preconditions';
import { Comment } from '@converse/types/lib/comment';
/**
 * @private Used during template generation.
 */
export declare type DataType = Comment;
/**
 * validators for Comment provided as a map.
 */
export declare const validators: Preconditions<Value, Value>;
/**
 * partialValidators for Comment provided as a map.
 */
export declare const partialValidators: Preconditions<Value, Value>;
/**
 * validate a single Value against the rules for Comment.
 */
export declare const validate: Precondition<Value, Comment>;
/**
 * validate a single Value against the rules for a partial Comment.
 */
export declare const validatePartial: Precondition<Value, Partial<Comment>>;
