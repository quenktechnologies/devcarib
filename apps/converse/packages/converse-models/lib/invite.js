"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InviteModel = exports.ModelImpl = void 0;
/** imports */
const dback_model_mongodb_1 = require("@quenk/dback-model-mongodb");
/**
 * InviteModelModel.
 * AUTO-GENERATED, DO NOT EDIT DIRECTLY, CHANGES WILL BE LOST!
 */
class InviteModel extends dback_model_mongodb_1.BaseModel {
    constructor(name, database, collection) {
        super(database, collection);
        this.name = name;
        this.database = database;
        this.collection = collection;
        this.id = 'id';
    }
    static getInstance(db) {
        return new InviteModel('invites', db, db.collection('invites'));
    }
}
exports.InviteModel = InviteModel;
exports.ModelImpl = InviteModel;
//# sourceMappingURL=invite.js.map