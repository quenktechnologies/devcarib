/** AUTO GENERATED MODULE, DO NOT EDIT DIRECTLY. */

/** imports */
import * as _user from './user';

import { Value } from '@quenk/noni/lib/data/jsonx';
import { Maybe, fromNullable } from '@quenk/noni/lib/data/maybe';
import { Precondition } from '@quenk/preconditions';

/**
 * DataTypeUnion combines all the types of the validators found in this module
 * into one.
 */
export type DataTypeUnion =
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

    'user': _user.validatePartial
};

/**
 * getPartialValidatorsFor provides a validator from this module.
 */
export const getPartialValidatorsFor =
    (name: string): Maybe<Precondition<Value, DataTypeUnion>> =>
        fromNullable(partialValidatorsAvailable[name]);

