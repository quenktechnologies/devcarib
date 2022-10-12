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
import { Precondition } from '@quenk/preconditions';

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
 * Validators is a record of validators.
 */
export interface Validators {

    [key: string]: Precondition<Value, DataTypeUnion>

}

/**
 * validatorsAvailable from this module.
 */
export const validatorsAvailable: Validators = {

    'comment': _comment.validate,
    'event': _event.validate,
    'invite': _invite.validate,
    'job': _job.validate,
    'post': _post.validate,
    'user': _user.validate
};

/**
 * getValidatorsFor provides a validator from this module.
 */
export const getValidatorsFor =
    (name: string): Maybe<Precondition<Value, DataTypeUnion>> =>
        fromNullable(validatorsAvailable[name]);

/**
 * partialValidatorsAvailable from this module.
 */
export const partialValidatorsAvailable: Validators = {

    'comment': _comment.validatePartial,
    'event': _event.validatePartial,
    'invite': _invite.validatePartial,
    'job': _job.validatePartial,
    'post': _post.validatePartial,
    'user': _user.validatePartial
};

/**
 * getPartialValidatorsFor provides a validator from this module.
 */
export const getPartialValidatorsFor =
    (name: string): Maybe<Precondition<Value, DataTypeUnion>> =>
        fromNullable(partialValidatorsAvailable[name]);

