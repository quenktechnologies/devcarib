/** AUTO GENERATED MODULE, DO NOT EDIT DIRECTLY. */

/** imports */
import * as _admin from './admin';
import * as _event from './event';
import * as _job from './job';
import * as _user from './user';

import { Value } from '@quenk/noni/lib/data/jsonx';
import { Maybe, fromNullable } from '@quenk/noni/lib/data/maybe';
import { Precondition } from '@quenk/preconditions/lib/async';

/**
 * DataTypeUnion combines all the types of the validators found in this module
 * into one.
 */
export type DataTypeUnion =
    _admin.DataType |

    _event.DataType |

    _job.DataType |

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

    'admin': <Precondition<Value, DataTypeUnion>>_admin.check,
    'event': <Precondition<Value, DataTypeUnion>>_event.check,
    'job': <Precondition<Value, DataTypeUnion>>_job.check,
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

    'admin': <Precondition<Value, Partial<DataTypeUnion>>>_admin.checkPartial,
    'event': <Precondition<Value, Partial<DataTypeUnion>>>_event.checkPartial,
    'job': <Precondition<Value, Partial<DataTypeUnion>>>_job.checkPartial,
    'user': <Precondition<Value, Partial<DataTypeUnion>>>_user.checkPartial
};

/**
 * getPartialChecksFor provides a validator from this module.
 */
export const getPartialChecksFor =
    (name: string): Maybe<Precondition<Value, DataTypeUnion>> =>
        fromNullable(partialChecksAvailable[name]);

