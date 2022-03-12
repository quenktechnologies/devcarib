/** imports */
import { BaseModel } from '@quenk/dback-model-mongodb';
import { User as ModelType } from '@mia/types/lib/user';
import * as mongodb from 'mongodb';
/**
 * @private Used by templates during generation.
 */
export { UserModel as ModelImpl, ModelType as DataType };
/**
 * UserModelModel.
 * AUTO-GENERATED, DO NOT EDIT DIRECTLY, CHANGES WILL BE LOST!
 */
export declare class UserModel extends BaseModel<ModelType> {
    name: string;
    database: mongodb.Db;
    collection: mongodb.Collection;
    constructor(name: string, database: mongodb.Db, collection: mongodb.Collection);
    id: string;
    static getInstance(db: mongodb.Db): UserModel;
}
