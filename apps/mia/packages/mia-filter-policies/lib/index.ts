/** AUTO GENERATED MODULE, DO NOT EDIT DIRECTLY. */

/** imports */
import { Record } from '@quenk/noni/lib/data/record';

import _admin from './admin';
import _job from './job';
import _user from './user';

/**
 * FilterPolicy specifies the allowed searchable fields for a given model
 * within the application.
 */
export interface FilterPolicy {

    [key: string]: string | string[]

}

/**
 * policiesAvailable is a map of model names to FilterPolicys used in the 
 * application.
 */
export const fields: Record<FilterPolicy> = {

    'admin': _admin,
    'job': _job,
    'user': _user
}

