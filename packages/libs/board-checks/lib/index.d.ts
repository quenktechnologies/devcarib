/** AUTO GENERATED MODULE, DO NOT EDIT DIRECTLY. */
/** imports */
import * as _admin from './admin';
import * as _job from './job';
import * as _mailMessage from './mail-message';
import { Value } from '@quenk/noni/lib/data/jsonx';
import { Maybe } from '@quenk/noni/lib/data/maybe';
import { Precondition } from '@quenk/preconditions/lib/async';
/**
 * DataTypeUnion combines all the types of the validators found in this module
 * into one.
 */
export declare type DataTypeUnion = _admin.DataType | _job.DataType | _mailMessage.DataType;
/**
 * Checks is a record of checks.
 */
export interface Checks {
    [key: string]: Precondition<Value, DataTypeUnion>;
}
/**
 * checksAvailable from this module.
 */
export declare const checksAvailable: Checks;
/**
 * getChecksFor provides a validator from this module.
 */
export declare const getChecksFor: (name: string) => Maybe<Precondition<Value, DataTypeUnion>>;
/**
 * partialChecksAvailable from this module.
 */
export declare const partialChecksAvailable: Checks;
/**
 * getPartialChecksFor provides a validator from this module.
 */
export declare const getPartialChecksFor: (name: string) => Maybe<Precondition<Value, DataTypeUnion>>;
