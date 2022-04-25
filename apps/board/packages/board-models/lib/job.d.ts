/** imports */
import { BaseModel } from '@quenk/dback-model-mongodb';
import { Job as ModelType } from '@board/types/lib/job';
import * as mongodb from 'mongodb';
/**
 * @private Used by templates during generation.
 */
export { JobModel as ModelImpl, ModelType as DataType };
/**
 * JobModelModel.
 * AUTO-GENERATED, DO NOT EDIT DIRECTLY, CHANGES WILL BE LOST!
 */
export declare class JobModel extends BaseModel<ModelType> {
    name: string;
    database: mongodb.Db;
    collection: mongodb.Collection;
    constructor(name: string, database: mongodb.Db, collection: mongodb.Collection);
    id: string;
    static getInstance(db: mongodb.Db): JobModel;
}
