import { Value } from '@quenk/noni/lib/data/jsonx';
import { Precondition, Preconditions } from '@quenk/preconditions';
import { Admin } from '@board/types/lib/admin';
/**
 * validators for Admin provided as a map.
 */
export declare const validators: Preconditions<Value, Value>;
/**
 * partialValidators for Admin provided as a map.
 */
export declare const partialValidators: Preconditions<Value, Value>;
/**
 * validate a single Value against the rules for Admin.
 */
export declare const validate: Precondition<Value, Admin>;
/**
 * validate a single Value against the rules for a partial Admin.
 */
export declare const validatePartial: Precondition<Value, Partial<Admin>>;
