import * as moment from 'moment';

export const now = () : Date => moment.utc().toDate();

