/** AUTO GENERATED MODULE, DO NOT EDIT DIRECTLY. */

/** imports */
import * as mongo from 'mongodb';
import * as _admin from './admin';
import * as _job from './job';

import { Maybe, fromNullable } from '@quenk/noni/lib/data/maybe';
import { Model } from '@quenk/dback-model-mongodb';

/**
 * DataTypeUnion combines all the types the various models handle into
 * a single data type.
 */
export type DataTypeUnion =
    _admin.DataType |

    _job.DataType;

/**
 * ModelGetter is a function that provides an instance of a Model.
 */
export type ModelGetter = (db: mongo.Db) => Model<DataTypeUnion>

/**
 * Models is a record of Models.
 */
export interface Models {

    [key: string]: ModelGetter

}

/**
 * modelsAvailable from this module.
 */
export const modelsAvailable: Models = {

    'admin': <ModelGetter>_admin.ModelImpl.getInstance,
    'job': <ModelGetter>_job.ModelImpl.getInstance
};

/**
 * getInstance of a Model from this module using its name.
 *
 * The returned Model may not be completely type safe.
 */
export const getInstanceOf =
    (db: mongo.Db, name: string): Maybe<Model<DataTypeUnion>> =>
        fromNullable(modelsAvailable[name]).map(f => f(db));

