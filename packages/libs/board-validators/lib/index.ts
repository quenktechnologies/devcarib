/** AUTO GENERATED MODULE, DO NOT EDIT DIRECTLY. */

/** imports */
import * as _admin from './admin';
import * as _candidatePost from './candidate-post';
import * as _mailMessage from './mail-message';
import * as _post from './post';

import { Value } from '@quenk/noni/lib/data/jsonx';
import { Maybe, fromNullable } from '@quenk/noni/lib/data/maybe';
import { Precondition } from '@quenk/preconditions';

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
 * Validators is a record of validators.
 */
export interface Validators {

    [key: string]: Precondition<Value, DataTypeUnion>

}

/**
 * validatorsAvailable from this module.
 */
export const validatorsAvailable: Validators = {

    'admin': _admin.validate,
    'candidate-post': _candidatePost.validate,
    'mail-message': _mailMessage.validate,
    'post': _post.validate
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

    'admin': _admin.validatePartial,
    'candidate-post': _candidatePost.validatePartial,
    'mail-message': _mailMessage.validatePartial,
    'post': _post.validatePartial
};

/**
 * getPartialValidatorsFor provides a validator from this module.
 */
export const getPartialValidatorsFor =
    (name: string): Maybe<Precondition<Value, DataTypeUnion>> =>
        fromNullable(partialValidatorsAvailable[name]);

