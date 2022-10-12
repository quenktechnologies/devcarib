
/** imports */
import { BaseModel } from '@quenk/dback-model-mongodb';
import { Job } from '@converse/types/lib/job';
import * as mongodb from 'mongodb';


/**
 * @private Used by templates during generation.
 */
export {
    JobModel as ModelImpl,
    Job as DataType
}

/**
 * JobModelModel.
 * AUTO-GENERATED, DO NOT EDIT DIRECTLY, CHANGES WILL BE LOST!
 */
export class JobModel extends BaseModel<Job> {

    constructor(
        public name: string,
        public database: mongodb.Db,
        public collection: mongodb.Collection) { super(database, collection); }

    id = 'id';

    static getInstance(db: mongodb.Db): JobModel {
        return new JobModel('jobs', db, db.collection('jobs'));

    }

}

