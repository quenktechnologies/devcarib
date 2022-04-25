"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventModel = exports.ModelImpl = void 0;
/** imports */
const dback_model_mongodb_1 = require("@quenk/dback-model-mongodb");
/**
 * EventModelModel.
 * AUTO-GENERATED, DO NOT EDIT DIRECTLY, CHANGES WILL BE LOST!
 */
class EventModel extends dback_model_mongodb_1.BaseModel {
    constructor(name, database, collection) {
        super(database, collection);
        this.name = name;
        this.database = database;
        this.collection = collection;
        this.id = 'id';
    }
    static getInstance(db) {
        return new EventModel('events', db, db.collection('events'));
    }
}
exports.EventModel = EventModel;
exports.ModelImpl = EventModel;
//# sourceMappingURL=event.js.map