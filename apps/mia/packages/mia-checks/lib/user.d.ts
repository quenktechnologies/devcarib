import { Value } from '@quenk/noni/lib/data/jsonx';
import { Precondition, Preconditions } from '@quenk/preconditions/lib/async';
import { User } from '@mia/types/lib/user';
/**
 * @private Used during template generation.
 */
export declare type DataType = User;
/**
 * checks for User provided as a map.
 */
export declare const checks: Preconditions<Value, Value>;
/**
 * partialChecks for User provided as a map.
 */
export declare const partialChecks: Preconditions<Value, Value>;
/**
 * check a User value.
 */
export declare const check: Precondition<Value, User>;
/**
 * checkPartial a partial User value.
 */
export declare const checkPartial: Precondition<Value, Partial<User>>;
