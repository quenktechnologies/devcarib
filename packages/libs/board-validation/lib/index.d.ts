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
