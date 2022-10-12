
/** imports */
import { BaseModel } from '@quenk/dback-model-mongodb';
import { Event } from '@mia/types/lib/event';
import * as mongodb from 'mongodb';


/**
 * @private Used by templates during generation.
 */
export {
    EventModel as ModelImpl,
    Event as DataType
}

/**
 * EventModelModel.
 * AUTO-GENERATED, DO NOT EDIT DIRECTLY, CHANGES WILL BE LOST!
 */
export class EventModel extends BaseModel<Event> {

    constructor(
        public name: string,
        public database: mongodb.Db,
        public collection: mongodb.Collection) { super(database, collection); }

    id = 'id';

    static getInstance(db: mongodb.Db): EventModel {
        return new EventModel('events', db, db.collection('events'));

    }

}

