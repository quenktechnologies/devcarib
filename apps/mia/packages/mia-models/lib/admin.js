"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModel = exports.ModelImpl = void 0;
/** imports */
const dback_model_mongodb_1 = require("@quenk/dback-model-mongodb");
/**
 * AdminModelModel.
 * AUTO-GENERATED, DO NOT EDIT DIRECTLY, CHANGES WILL BE LOST!
 */
class AdminModel extends dback_model_mongodb_1.BaseModel {
    constructor(name, database, collection) {
        super(database, collection);
        this.name = name;
        this.database = database;
        this.collection = collection;
        this.id = 'id';
    }
    static getInstance(db) {
        return new AdminModel('admins', db, db.collection('admins'));
    }
}
exports.AdminModel = AdminModel;
exports.ModelImpl = AdminModel;
//# sourceMappingURL=admin.js.map