import * as moment from 'moment';

/**
 * now produces a JS Date object at the current time in UTC.
 */
export const now = (): Date => moment.utc().toDate();

/**
 * getOffset provides the TZ offset from the provided Date value or constructs
 * one if not passed.
 *
 * The TZ offset is of the form +00:00.
 */
export const getOffset = (date = now()) => {
    let value = date.getTimezoneOffset();

    let sign = value > 0 ? '-' : '+';

    let offset = Math.abs(value);

    let hrs = Math.floor(offset / 60);

    let padHrs = hrs < 10 ? '0' : '';

    let mins = offset % 60;

    let padMin = mins < 10 ? '0' : '';

    return `${sign}${padHrs}${hrs}:${padMin}${mins}`;
};
