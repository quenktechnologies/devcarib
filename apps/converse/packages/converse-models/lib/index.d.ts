/** AUTO GENERATED MODULE, DO NOT EDIT DIRECTLY. */
/** imports */
import * as mongo from 'mongodb';
import * as _comment from './comment';
import * as _event from './event';
import * as _invite from './invite';
import * as _post from './post';
import * as _user from './user';
import { Maybe } from '@quenk/noni/lib/data/maybe';
import { Model } from '@quenk/dback-model-mongodb';
/**
 * DataTypeUnion combines all the types the various models handle into
 * a single data type.
 */
export declare type DataTypeUnion = _comment.DataType | _event.DataType | _invite.DataType | _post.DataType | _user.DataType;
/**
 * ModelGetter is a function that provides an instance of a Model.
 */
export declare type ModelGetter = (db: mongo.Db) => Model<DataTypeUnion>;
/**
 * Models is a record of Models.
 */
export interface Models {
    [key: string]: ModelGetter;
}
/**
 * modelsAvailable from this module.
 */
export declare const modelsAvailable: Models;
/**
 * getInstance of a Model from this module using its name.
 *
 * The returned Model may not be completely type safe.
 */
export declare const getInstanceOf: (db: mongo.Db, name: string) => Maybe<Model<DataTypeUnion>>;
