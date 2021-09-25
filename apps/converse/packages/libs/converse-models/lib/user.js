"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.ModelImpl = void 0;
/** imports */
const dback_model_mongodb_1 = require("@quenk/dback-model-mongodb");
/**
 * UserModelModel.
 * AUTO-GENERATED, DO NOT EDIT DIRECTLY, CHANGES WILL BE LOST!
 */
class UserModel extends dback_model_mongodb_1.BaseModel {
    constructor(name, database, collection) {
        super(database, collection);
        this.name = name;
        this.database = database;
        this.collection = collection;
        this.id = 'id';
    }
    static getInstance(db) {
        return new UserModel('users', db, db.collection('users'));
    }
}
exports.UserModel = UserModel;
exports.ModelImpl = UserModel;
//# sourceMappingURL=user.js.map