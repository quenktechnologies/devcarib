/** imports */
import { BaseModel } from '@quenk/dback-model-mongodb';
import { Job } from '@converse/types/lib/job';
import * as mongodb from 'mongodb';
/**
 * @private Used by templates during generation.
 */
export { JobModel as ModelImpl, Job as DataType };
/**
 * JobModelModel.
 * AUTO-GENERATED, DO NOT EDIT DIRECTLY, CHANGES WILL BE LOST!
 */
export declare class JobModel extends BaseModel<Job> {
    name: string;
    database: mongodb.Db;
    collection: mongodb.Collection;
    constructor(name: string, database: mongodb.Db, collection: mongodb.Collection);
    id: string;
    static getInstance(db: mongodb.Db): JobModel;
}
