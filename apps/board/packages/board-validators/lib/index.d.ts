/** AUTO GENERATED MODULE, DO NOT EDIT DIRECTLY. */
/** imports */
import * as _job from './job';
import { Value } from '@quenk/noni/lib/data/jsonx';
import { Maybe } from '@quenk/noni/lib/data/maybe';
import { Precondition } from '@quenk/preconditions';
/**
 * DataTypeUnion combines all the types of the validators found in this module
 * into one.
 */
export declare type DataTypeUnion = _job.DataType;
/**
 * Validators is a record of validators.
 */
export interface Validators {
    [key: string]: Precondition<Value, DataTypeUnion>;
}
/**
 * validatorsAvailable from this module.
 */
export declare const validatorsAvailable: Validators;
/**
 * getValidatorsFor provides a validator from this module.
 */
export declare const getValidatorsFor: (name: string) => Maybe<Precondition<Value, DataTypeUnion>>;
/**
 * partialValidatorsAvailable from this module.
 */
export declare const partialValidatorsAvailable: Validators;
/**
 * getPartialValidatorsFor provides a validator from this module.
 */
export declare const getPartialValidatorsFor: (name: string) => Maybe<Precondition<Value, DataTypeUnion>>;
