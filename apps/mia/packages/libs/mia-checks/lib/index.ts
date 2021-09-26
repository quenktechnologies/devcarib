/** AUTO GENERATED MODULE, DO NOT EDIT DIRECTLY. */

/** imports */
import * as _admin from './admin';

import { Value } from '@quenk/noni/lib/data/jsonx';
import { Maybe, fromNullable } from '@quenk/noni/lib/data/maybe';
import { Precondition } from '@quenk/preconditions/lib/async';

/**
 * DataTypeUnion combines all the types of the validators found in this module
 * into one.
 */
export type DataTypeUnion =
    _admin.DataType;

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

    'admin': <Precondition<Value, DataTypeUnion>>_admin.check
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

    'admin': <Precondition<Value, Partial<DataTypeUnion>>>_admin.checkPartial
};

/**
 * getPartialChecksFor provides a validator from this module.
 */
export const getPartialChecksFor =
    (name: string): Maybe<Precondition<Value, DataTypeUnion>> =>
        fromNullable(partialChecksAvailable[name]);

