/** AUTO GENERATED MODULE, DO NOT EDIT DIRECTLY. */

/** imports */
import * as _comment from './comment';
import * as _event from './event';
import * as _invite from './invite';
import * as _job from './job';
import * as _post from './post';
import * as _user from './user';

import { Value } from '@quenk/noni/lib/data/jsonx';
import { Maybe, fromNullable } from '@quenk/noni/lib/data/maybe';
import { Precondition } from '@quenk/preconditions/lib/async';

/**
 * DataTypeUnion combines all the types of the validators found in this module
 * into one.
 */
export type DataTypeUnion =
    _comment.DataType |

    _event.DataType |

    _invite.DataType |

    _job.DataType |

    _post.DataType |

    _user.DataType;

/**
 * Checks is a record of checks.
 */
export interface Checks {

    [key: string]: Precondition<Value, DataTypeUnion>

}

/**
 * checksAvailable from this module.
 */
export const checksAvailable: Checks = {

    'comment': <Precondition<Value, DataTypeUnion>>_comment.check,
    'event': <Precondition<Value, DataTypeUnion>>_event.check,
    'invite': <Precondition<Value, DataTypeUnion>>_invite.check,
    'job': <Precondition<Value, DataTypeUnion>>_job.check,
    'post': <Precondition<Value, DataTypeUnion>>_post.check,
    'user': <Precondition<Value, DataTypeUnion>>_user.check
};

/**
 * getChecksFor provides a validator from this module.
 */
export const getChecksFor =
    (name: string): Maybe<Precondition<Value, DataTypeUnion>> =>
        fromNullable(checksAvailable[name]);

/**
 * partialChecksAvailable from this module.
 */
export const partialChecksAvailable: Checks = {

    'comment': <Precondition<Value, Partial<DataTypeUnion>>>_comment.checkPartial,
    'event': <Precondition<Value, Partial<DataTypeUnion>>>_event.checkPartial,
    'invite': <Precondition<Value, Partial<DataTypeUnion>>>_invite.checkPartial,
    'job': <Precondition<Value, Partial<DataTypeUnion>>>_job.checkPartial,
    'post': <Precondition<Value, Partial<DataTypeUnion>>>_post.checkPartial,
    'user': <Precondition<Value, Partial<DataTypeUnion>>>_user.checkPartial
};

/**
 * getPartialChecksFor provides a validator from this module.
 */
export const getPartialChecksFor =
    (name: string): Maybe<Precondition<Value, DataTypeUnion>> =>
        fromNullable(partialChecksAvailable[name]);

