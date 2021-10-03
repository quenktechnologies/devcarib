import { Value } from '@quenk/noni/lib/data/jsonx';
import { Precondition, Preconditions } from '@quenk/preconditions';
import { User } from '@converse/types/lib/user';
/**
 * @private Used during template generation.
 */
export declare type DataType = User;
/**
 * validators for User provided as a map.
 */
export declare const validators: Preconditions<Value, Value>;
/**
 * partialValidators for User provided as a map.
 */
export declare const partialValidators: Preconditions<Value, Value>;
/**
 * validate a single Value against the rules for User.
 */
export declare const validate: Precondition<Value, User>;
/**
 * validate a single Value against the rules for a partial User.
 */
export declare const validatePartial: Precondition<Value, Partial<User>>;
