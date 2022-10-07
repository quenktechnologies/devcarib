
/** imports */
import { BaseModel } from '@quenk/dback-model-mongodb';

//@ts-ignore: 6133


import {
    Invite as ModelType
} from '@converse/types/lib/invite';



//@ts-ignore: 6133


import {
    populate as populate
    , populateN as populateN
    , insertOne as insertOne
    , insertMany as insertMany
    , findOne as findOne
    , find as find
    , updateOne as updateOne
    , updateMany as updateMany
    , deleteOne as deleteOne
    , deleteMany as deleteMany
    , count as count
    , aggregate as aggregate
} from '@quenk/noni-mongodb/lib/database/collection';



//@ts-ignore: 6133


import * as mongodb from 'mongodb';



//@ts-ignore: 6133


import {
    Object
} from '@quenk/noni/lib/data/json';



//@ts-ignore: 6133


import {
    Future
    , pure
    , raise
    , fromCallback
} from '@quenk/noni/lib/control/monad/future';



//@ts-ignore: 6133


import {
    Maybe
} from '@quenk/noni/lib/data/maybe';



//@ts-ignore: 6133


import {
    merge
} from '@quenk/noni/lib/data/record';





/**
 * @private Used by templates during generation.
 */
export {
    InviteModel as ModelImpl,
    ModelType as DataType
}

/**
 * InviteModelModel.
 * AUTO-GENERATED, DO NOT EDIT DIRECTLY, CHANGES WILL BE LOST!
 */
export class InviteModel extends BaseModel<ModelType> {

    constructor(
        public name: string,
        public database: mongodb.Db,
        public collection: mongodb.Collection) { super(database, collection); }

    id = 'id';

    static getInstance(db: mongodb.Db): InviteModel {
        return new InviteModel('invites', db, db.collection('invites'));

    }

}
