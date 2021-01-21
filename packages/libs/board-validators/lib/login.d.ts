import { Value } from '@quenk/noni/lib/data/jsonx';
import { Precondition, Preconditions } from '@quenk/preconditions';
import { Login } from '@board/types/lib/login';
/**
 * @private Used during template generation.
 */
export declare type DataType = Login;
/**
 * validators for Login provided as a map.
 */
export declare const validators: Preconditions<Value, Value>;
/**
 * partialValidators for Login provided as a map.
 */
export declare const partialValidators: Preconditions<Value, Value>;
/**
 * validate a single Value against the rules for Login.
 */
export declare const validate: Precondition<Value, Login>;
/**
 * validate a single Value against the rules for a partial Login.
 */
export declare const validatePartial: Precondition<Value, Partial<Login>>;
