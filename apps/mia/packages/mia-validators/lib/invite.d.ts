import { Value } from '@quenk/noni/lib/data/jsonx';
import { Precondition, Preconditions } from '@quenk/preconditions';
import { Invite } from '@mia/types/lib/invite';
/**
 * @private Used during template generation.
 */
export declare type DataType = Invite;
/**
 * validators for Invite provided as a map.
 */
export declare const validators: Preconditions<Value, Value>;
/**
 * partialValidators for Invite provided as a map.
 */
export declare const partialValidators: Preconditions<Value, Value>;
/**
 * validate a single Value against the rules for Invite.
 */
export declare const validate: Precondition<Value, Invite>;
/**
 * validate a single Value against the rules for a partial Invite.
 */
export declare const validatePartial: Precondition<Value, Partial<Invite>>;
