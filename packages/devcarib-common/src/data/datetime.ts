import * as moment from 'moment';

/**
 * now produces a JS Date object at the current time in UTC.
 */
export const now = (): Date => moment.utc().toDate();
