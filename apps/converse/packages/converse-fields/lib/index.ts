/** AUTO GENERATED MODULE, DO NOT EDIT DIRECTLY. */

/** imports */
import { Record } from '@quenk/noni/lib/data/record';

import _comment from './comment';
import _event from './event';
import _post from './post';
import _user from './user';

/**
 * Fields is an object that can be used in a query to specify the projection of
 * the results.
 */
export interface Fields {

    [key: string]: number

}

/**
 * modelsAvailable from this module.
 */
export const fields: Record<Fields> = {

    'comment': _comment,
    'event': _event,
    'post': _post,
    'user': _user
}

