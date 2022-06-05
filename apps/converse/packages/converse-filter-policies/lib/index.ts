/** AUTO GENERATED MODULE, DO NOT EDIT DIRECTLY. */

/** imports */
import { Record } from '@quenk/noni/lib/data/record';

import { EnabledPolicies } from '@quenk/search-filters-mongodb';

export { EnabledPolicies }

import _comment from './comment';
import _event from './event';
import _invite from './invite';
import _post from './post';
import _user from './user';

/**
 * policiesEnabled is a map of model names to [[EnabledPolicies]] used in the 
 * application.
 */
export const policiesEnabled: Record<EnabledPolicies> = {

    'comment': _comment,
    'event': _event,
    'invite': _invite,
    'post': _post,
    'user': _user
}

