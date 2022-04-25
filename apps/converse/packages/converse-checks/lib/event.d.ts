import { Value } from '@quenk/noni/lib/data/jsonx';
import { Precondition, Preconditions } from '@quenk/preconditions/lib/async';
import { Event } from '@mia/types/lib/event';
/**
 * @private Used during template generation.
 */
export declare type DataType = Event;
/**
 * checks for Event provided as a map.
 */
export declare const checks: Preconditions<Value, Value>;
/**
 * partialChecks for Event provided as a map.
 */
export declare const partialChecks: Preconditions<Value, Value>;
/**
 * check a Event value.
 */
export declare const check: Precondition<Value, Event>;
/**
 * checkPartial a partial Event value.
 */
export declare const checkPartial: Precondition<Value, Partial<Event>>;
