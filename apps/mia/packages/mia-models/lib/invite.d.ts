/** imports */
import { BaseModel } from '@quenk/dback-model-mongodb';
import { Invite } from '@mia/types/lib/invite';
import * as mongodb from 'mongodb';
/**
 * @private Used by templates during generation.
 */
export { InviteModel as ModelImpl, Invite as DataType };
/**
 * InviteModelModel.
 * AUTO-GENERATED, DO NOT EDIT DIRECTLY, CHANGES WILL BE LOST!
 */
export declare class InviteModel extends BaseModel<Invite> {
    name: string;
    database: mongodb.Db;
    collection: mongodb.Collection;
    constructor(name: string, database: mongodb.Db, collection: mongodb.Collection);
    id: string;
    static getInstance(db: mongodb.Db): InviteModel;
}
