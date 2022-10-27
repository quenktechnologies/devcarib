import * as moment from 'moment';

/**
 * fromNow formats a datetime string to relative time.
 */
export const fromNow = (date: string) => {
    let ref = moment.utc(date);
    console.error("ref--> ", ref, ref.fromNow());
    return ref.isValid() ? ref.fromNow() : '';
}
