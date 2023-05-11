/**
 * AUTOGENERATED - DO NOT EDIT DIRECTLY!
 */ 
import * as mongodb from 'mongodb';
import * as _job from './job';
import * as _mailMessage from './mail-message';

import { Maybe, fromNullable } from '@quenk/noni/lib/data/maybe';

import { Model } from '@quenk/dback-model-mongodb';

/**
 * DataTypeUnion combines all the model data types found in this module
 * (AUTOGENERATED).
 */
export type DataTypeUnion =
  
    _job.DataType |
  
    _mailMessage.DataType ;

/**
 * ModelGetter is a function that provides an instance of a Model.
 */
export type ModelGetter = (db: mongodb.Db) => Model<DataTypeUnion>

/**
 * Models is a record of Models.
 */
export interface Models {

  [key:string] : ModelGetter

}

/**
 * modelsAvailable from this module.
 */
export const modelsAvailable:Models = {


    'job': <ModelGetter>_job.ModelImpl.getInstance,

    'mail-message': <ModelGetter>_mailMessage.ModelImpl.getInstance

};

/**
 * getInstance of a Model from this module using its name.
 *
 * The returned Model may not be completely type safe.
 */
export const getInstanceOf =
(db:mongodb.Db, name:string) : Maybe<Model<DataTypeUnion>> => 
  fromNullable(modelsAvailable[name]).map(f => f(db));

