import * as moment from 'moment';

/**
 * fromNow formats a datetime string to relative time.
 */
export const fromNow = (date: string) => {
    let ref = moment.utc(date);
    return ref.isValid() ? ref.fromNow() : '';
}
