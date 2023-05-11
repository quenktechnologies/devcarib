import * as string from '@quenk/preconditions/lib/string';
import * as array from '@quenk/preconditions/lib/array';

import { Value } from '@quenk/noni/lib/data/jsonx';
import { Precondition, and } from '@quenk/preconditions';
import { contains } from '@quenk/noni/lib/data/array';
import { parseDate } from '@quenk/noni/lib/data/datetime';

import { succeed, fail } from '@quenk/preconditions/lib/result';

import { supportedCurrencies } from '../currency';
import { supportedPaymentFrequencies } from '../payment';
import { jobStatuses } from '../job';

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
    and(string.isString,
        and(string.lowercase,
            and(and(string.minLength(3), string.maxLength(64)),
                string.matches(/@/))));

/**
 * username must be 3-12 characters and must begin with a letter.
 */
export const username: Precondition<Value, string> =
    and(string.isString,
        and(string.lowercase,
            and(and(string.minLength(3), string.maxLength(12)),
                string.matches(/^[a-z][0-9a-z$@_]+/))));

/**
 * password must be a string between 8-140 characters.
 */
export const password: Precondition<Value, string> =
    and(string.isString, and(string.minLength(8), string.maxLength(140)));

/**
 * url must be a string of at least 7 characters and begin with http or https.
 */
export const url: Precondition<Value, string> =
    and(string.isString,
        and(string.lowercase,
            and(and(string.minLength(7), string.maxLength(5000)),
                string.matches(/^(http|https):\/\//))));

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

/**
 * date must be a valid ISO8601 date.
 */
export const date: Precondition<Value, Value> = (value: Value) => {

    let dateString = parseDate(String(value));

    return (dateString !== '') ? succeed(dateString) : fail('date', { value });

}

const timeRegex = /^([01][0-9]|2[0-3]):([0-5][0-9])$/;

/**
 * time only supports hh:mm.
 */
export const time: Precondition<Value, Value> = (value: Value) =>
    timeRegex.test(String(value)) ? succeed(value) : fail('time', { value });

const tzoffsetRegex = /^[+-][01][0-9]:[0-5][0-9]$/;

/**
 * tzoffset in the format +04:00
 */
export const tzoffset: Precondition<Value, Value> = (value: Value) =>
    tzoffsetRegex.test(String(value)) ?
        succeed(value) : fail('tzoffset', { value });

/**
 * boolean casts a value to a JS boolean.
 */
export const boolean: Precondition<Value, Value> = (value: Value) =>
    succeed(Boolean(value));

/**
 * currency ensures the provided string is one of the supported currency
 * indicators.
 */
export const currency: Precondition<Value, Value> = (value: Value) =>
    contains(supportedCurrencies, value) ?
        succeed(value) :
        fail('invalid', { value })

/**
 * paymentFrequency is one of several period specifiers that indicate how
 * often a payment will be made.
 */
export const paymentFrequency: Precondition<Value, Value> = (value: Value) =>
    contains(supportedPaymentFrequencies, value) ?
        succeed(value) :
        fail('invalid', { value })

/**
 * jobStatus must be one of the predefined job posting statuses.
 */
export const jobStatus: Precondition<Value, Value> = (value: Value) =>
    contains(jobStatuses, value) ?
        succeed(value) :
        fail('invalid', { value });
