
/** imports */
import { BaseModel } from '@quenk/dback-model-mongodb';
import { Admin } from '@mia/types/lib/admin';
import * as mongodb from 'mongodb';


/**
 * @private Used by templates during generation.
 */
export {
    AdminModel as ModelImpl,
    Admin as DataType
}

/**
 * AdminModelModel.
 * AUTO-GENERATED, DO NOT EDIT DIRECTLY, CHANGES WILL BE LOST!
 */
export class AdminModel extends BaseModel<Admin> {

    constructor(
        public name: string,
        public database: mongodb.Db,
        public collection: mongodb.Collection) { super(database, collection); }

    id = 'id';

    static getInstance(db: mongodb.Db): AdminModel {
        return new AdminModel('admins', db, db.collection('admins'));

    }

}

