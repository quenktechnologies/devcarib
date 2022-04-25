/** imports */
import { BaseModel } from '@quenk/dback-model-mongodb';
import { Event as ModelType } from '@mia/types/lib/event';
import * as mongodb from 'mongodb';
/**
 * @private Used by templates during generation.
 */
export { EventModel as ModelImpl, ModelType as DataType };
/**
 * EventModelModel.
 * AUTO-GENERATED, DO NOT EDIT DIRECTLY, CHANGES WILL BE LOST!
 */
export declare class EventModel extends BaseModel<ModelType> {
    name: string;
    database: mongodb.Db;
    collection: mongodb.Collection;
    constructor(name: string, database: mongodb.Db, collection: mongodb.Collection);
    id: string;
    static getInstance(db: mongodb.Db): EventModel;
}
