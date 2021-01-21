import * as string from '@quenk/preconditions/lib/string';
import * as array from '@quenk/preconditions/lib/array';

import { Value } from '@quenk/noni/lib/data/jsonx';
import { Precondition, and } from '@quenk/preconditions';

/**
 * name must be a string and between 1-64 characters.
 *
 * Todo: ensure proper case.
 */
export const name: Precondition<Value, string> =
    and(string.isString, and(string.minLength(1), string.maxLength(64)));

/**
 * email must be a string between 3-64 characters and contain "@".
 */
export const email: Precondition<Value, string> =
    and(string.isString, and(
        and(string.minLength(3), string.maxLength(64)), string.matches(/@/)));

/**
 * password must be a string between 8-140 characters.
 */
export const password: Precondition<Value, string> =
    and(string.isString, and(string.minLength(8), string.maxLength(140)));

/**
 * url must be a string of at least 7 characters and begin with http or https.
 */
export const url: Precondition<Value, string> =
    and(string.isString, and(and(string.minLength(7), string.maxLength(5000)),
        string.matches(/^(http|https):\/\//)));

/**
 * textsmall is 256 characters or less.
 */
export const textsmall: Precondition<Value, string> =
    and(string.isString, and(string.minLength(0), string.maxLength(256)));

/**
 * textmedium is 5000 characters or less.
 */
export const textmedium: Precondition<Value, string> =
    and(string.isString, and(string.minLength(0), string.maxLength(5000)));

/**
 * textlarge is 25K characters or less.
 */
export const textlarge: Precondition<Value, string> =
    and(string.isString, and(string.minLength(0), string.maxLength(25 * 1000)));

/**
 * minLength for strings and array.
 */
export const minLength = (n: number): Precondition<Value, Value> =>
    (value: Value) => Array.isArray(value) ?
        array.min<Value>(n)(value) :
        string.minLength(n)(<string>value);

/**
 * maxLength for strings and array.
 */
export const maxLength = (n: number): Precondition<Value, Value> =>
    (value: Value) => Array.isArray(value) ?
        array.max<Value>(n)(value) :
        string.maxLength(n)(<string>value);

