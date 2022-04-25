import { Value } from '@quenk/noni/lib/data/jsonx';
import { Precondition } from '@quenk/preconditions';
/**
 * name must be a string and between 1-64 characters.
 *
 * Todo: ensure proper case.
 */
export declare const name: Precondition<Value, string>;
/**
 * email must be a string between 3-64 characters and contain "@".
 */
export declare const email: Precondition<Value, string>;
/**
 * password must be a string between 8-140 characters.
 */
export declare const password: Precondition<Value, string>;
/**
 * url must be a string of at least 7 characters and begin with http or https.
 */
export declare const url: Precondition<Value, string>;
/**
 * textsmall is 256 characters or less.
 */
export declare const textsmall: Precondition<Value, string>;
/**
 * textmedium is 5000 characters or less.
 */
export declare const textmedium: Precondition<Value, string>;
/**
 * textlarge is 25K characters or less.
 */
export declare const textlarge: Precondition<Value, string>;
/**
 * minLength for strings and array.
 */
export declare const minLength: (n: number) => Precondition<Value, Value>;
/**
 * maxLength for strings and array.
 */
export declare const maxLength: (n: number) => Precondition<Value, Value>;
/**
 * date must be a valid ISO8601 date.
 */
export declare const date: Precondition<Value, Value>;
/**
 * boolean casts a value to a JS boolean.
 */
export declare const boolean: Precondition<Value, Value>;
/**
 * currency ensures the provided string is one of the supported currency
 * indicators.
 */
export declare const currency: Precondition<Value, Value>;
/**
 * paymentFrequency is one of several period specifiers that indicate how
 * often a payment will be made.
 */
export declare const paymentFrequency: Precondition<Value, Value>;
/**
 * jobStatus must be one of the predefined job posting statuses.
 */
export declare const jobStatus: Precondition<Value, Value>;
