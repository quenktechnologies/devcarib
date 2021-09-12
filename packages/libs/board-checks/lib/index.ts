/** AUTO GENERATED MODULE, DO NOT EDIT DIRECTLY. */

/** imports */
import * as _admin from './admin';
import * as _candidatePost from './candidate-post';
import * as _mailMessage from './mail-message';
import * as _post from './post';

import { Value } from '@quenk/noni/lib/data/jsonx';
import { Maybe, fromNullable } from '@quenk/noni/lib/data/maybe';
import { Precondition } from '@quenk/preconditions/lib/async';

/**
 * DataTypeUnion combines all the types of the validators found in this module
 * into one.
 */
export type DataTypeUnion =
    _admin.DataType |

    _candidatePost.DataType |

    _mailMessage.DataType |

    _post.DataType;

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
    'candidate-post': <Precondition<Value, DataTypeUnion>>_candidatePost.check,
    'mail-message': <Precondition<Value, DataTypeUnion>>_mailMessage.check,
    'post': <Precondition<Value, DataTypeUnion>>_post.check
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
    'candidate-post': <Precondition<Value, Partial<DataTypeUnion>>>_candidatePost.checkPartial,
    'mail-message': <Precondition<Value, Partial<DataTypeUnion>>>_mailMessage.checkPartial,
    'post': <Precondition<Value, Partial<DataTypeUnion>>>_post.checkPartial
};

/**
 * getPartialChecksFor provides a validator from this module.
 */
export const getPartialChecksFor =
    (name: string): Maybe<Precondition<Value, DataTypeUnion>> =>
        fromNullable(partialChecksAvailable[name]);

