/** imports */
import { BaseModel } from '@quenk/dback-model-mongodb';
import { Admin } from '@mia/types/lib/admin';
import * as mongodb from 'mongodb';
/**
 * @private Used by templates during generation.
 */
export { AdminModel as ModelImpl, Admin as DataType };
/**
 * AdminModelModel.
 * AUTO-GENERATED, DO NOT EDIT DIRECTLY, CHANGES WILL BE LOST!
 */
export declare class AdminModel extends BaseModel<Admin> {
    name: string;
    database: mongodb.Db;
    collection: mongodb.Collection;
    constructor(name: string, database: mongodb.Db, collection: mongodb.Collection);
    id: string;
    static getInstance(db: mongodb.Db): AdminModel;
}
