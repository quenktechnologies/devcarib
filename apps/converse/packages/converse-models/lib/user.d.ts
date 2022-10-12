/** imports */
import { BaseModel } from '@quenk/dback-model-mongodb';
import { User } from '@converse/types/lib/user';
import * as mongodb from 'mongodb';
/**
 * @private Used by templates during generation.
 */
export { UserModel as ModelImpl, User as DataType };
/**
 * UserModelModel.
 * AUTO-GENERATED, DO NOT EDIT DIRECTLY, CHANGES WILL BE LOST!
 */
export declare class UserModel extends BaseModel<User> {
    name: string;
    database: mongodb.Db;
    collection: mongodb.Collection;
    constructor(name: string, database: mongodb.Db, collection: mongodb.Collection);
    id: string;
    static getInstance(db: mongodb.Db): UserModel;
}
