
/** imports */
import { BaseModel } from '@quenk/dback-model-mongodb';
import { Invite } from '@mia/types/lib/invite';
import * as mongodb from 'mongodb';


/**
 * @private Used by templates during generation.
 */
export {
    InviteModel as ModelImpl,
    Invite as DataType
}

/**
 * InviteModelModel.
 * AUTO-GENERATED, DO NOT EDIT DIRECTLY, CHANGES WILL BE LOST!
 */
export class InviteModel extends BaseModel<Invite> {

    constructor(
        public name: string,
        public database: mongodb.Db,
        public collection: mongodb.Collection) { super(database, collection); }

    id = 'id';

    static getInstance(db: mongodb.Db): InviteModel {
        return new InviteModel('invites', db, db.collection('invites'));

    }

}

