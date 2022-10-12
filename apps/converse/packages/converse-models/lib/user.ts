
/** imports */
import { BaseModel } from '@quenk/dback-model-mongodb';
import { User } from '@converse/types/lib/user';
import * as mongodb from 'mongodb';


/**
 * @private Used by templates during generation.
 */
export {
    UserModel as ModelImpl,
    User as DataType
}

/**
 * UserModelModel.
 * AUTO-GENERATED, DO NOT EDIT DIRECTLY, CHANGES WILL BE LOST!
 */
export class UserModel extends BaseModel<User> {

    constructor(
        public name: string,
        public database: mongodb.Db,
        public collection: mongodb.Collection) { super(database, collection); }

    id = 'id';

    static getInstance(db: mongodb.Db): UserModel {
        return new UserModel('users', db, db.collection('users'));

    }

}

