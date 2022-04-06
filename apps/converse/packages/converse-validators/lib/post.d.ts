import { Value } from '@quenk/noni/lib/data/jsonx';
import { Precondition, Preconditions } from '@quenk/preconditions';
import { Post } from '@converse/types/lib/post';
/**
 * @private Used during template generation.
 */
export declare type DataType = Post;
/**
 * validators for Post provided as a map.
 */
export declare const validators: Preconditions<Value, Value>;
/**
 * partialValidators for Post provided as a map.
 */
export declare const partialValidators: Preconditions<Value, Value>;
/**
 * validate a single Value against the rules for Post.
 */
export declare const validate: Precondition<Value, Post>;
/**
 * validate a single Value against the rules for a partial Post.
 */
export declare const validatePartial: Precondition<Value, Partial<Post>>;
