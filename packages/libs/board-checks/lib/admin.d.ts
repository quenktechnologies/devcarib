import { Value } from '@quenk/noni/lib/data/jsonx';
import { Precondition, Preconditions } from '@quenk/preconditions/lib/async';
import { Admin } from '@board/types/lib/admin';
/**
 * @private Used during template generation.
 */
export declare type DataType = Admin;
/**
 * checks for Admin provided as a map.
 */
export declare const checks: Preconditions<Value, Value>;
/**
 * partialChecks for Admin provided as a map.
 */
export declare const partialChecks: Preconditions<Value, Value>;
/**
 * check a Admin value.
 */
export declare const check: Precondition<Value, Admin>;
/**
 * checkPartial a partial Admin value.
 */
export declare const checkPartial: Precondition<Value, Partial<Admin>>;
