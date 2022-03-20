/** AUTO GENERATED MODULE, DO NOT EDIT DIRECTLY. */

/** imports */
import { Record } from '@quenk/noni/lib/data/record';

import { EnabledPolicies } from '@quenk/search-filters-mongodb';

export { EnabledPolicies }

import _admin from './admin';
import _job from './job';
import _user from './user';

/**
 * policiesEnabled is a map of model names to [[EnabledPolicies]] used in the 
 * application.
 */
export const policiesEnabled: Record<EnabledPolicies> = {

    'admin': _admin,
    'job': _job,
    'user': _user
}

