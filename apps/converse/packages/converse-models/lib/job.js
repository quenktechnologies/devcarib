"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobModel = exports.ModelImpl = void 0;
/** imports */
const dback_model_mongodb_1 = require("@quenk/dback-model-mongodb");
/**
 * JobModelModel.
 * AUTO-GENERATED, DO NOT EDIT DIRECTLY, CHANGES WILL BE LOST!
 */
class JobModel extends dback_model_mongodb_1.BaseModel {
    constructor(name, database, collection) {
        super(database, collection);
        this.name = name;
        this.database = database;
        this.collection = collection;
        this.id = 'id';
    }
    static getInstance(db) {
        return new JobModel('jobs', db, db.collection('jobs'));
    }
}
exports.JobModel = JobModel;
exports.ModelImpl = JobModel;
//# sourceMappingURL=job.js.map