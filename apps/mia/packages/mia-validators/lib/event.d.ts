import { Value } from '@quenk/noni/lib/data/jsonx';
import { Precondition, Preconditions } from '@quenk/preconditions';
import { Event } from '@mia/types/lib/event';
/**
 * @private Used during template generation.
 */
export declare type DataType = Event;
/**
 * validators for Event provided as a map.
 */
export declare const validators: Preconditions<Value, Value>;
/**
 * partialValidators for Event provided as a map.
 */
export declare const partialValidators: Preconditions<Value, Value>;
/**
 * validate a single Value against the rules for Event.
 */
export declare const validate: Precondition<Value, Event>;
/**
 * validate a single Value against the rules for a partial Event.
 */
export declare const validatePartial: Precondition<Value, Partial<Event>>;
