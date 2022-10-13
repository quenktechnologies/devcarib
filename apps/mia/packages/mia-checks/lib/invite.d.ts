import { Value } from '@quenk/noni/lib/data/jsonx';
import { Precondition, Preconditions } from '@quenk/preconditions/lib/async';
import { Invite } from '@mia/types/lib/invite';
/**
 * @private Used during template generation.
 */
export declare type DataType = Invite;
/**
 * checks for Invite provided as a map.
 */
export declare const checks: Preconditions<Value, Value>;
/**
 * partialChecks for Invite provided as a map.
 */
export declare const partialChecks: Preconditions<Value, Value>;
/**
 * check a Invite value.
 */
export declare const check: Precondition<Value, Invite>;
/**
 * checkPartial a partial Invite value.
 */
export declare const checkPartial: Precondition<Value, Partial<Invite>>;
