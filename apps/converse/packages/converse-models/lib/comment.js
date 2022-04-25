"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentModel = exports.ModelImpl = void 0;
/** imports */
const dback_model_mongodb_1 = require("@quenk/dback-model-mongodb");
/**
 * CommentModelModel.
 * AUTO-GENERATED, DO NOT EDIT DIRECTLY, CHANGES WILL BE LOST!
 */
class CommentModel extends dback_model_mongodb_1.BaseModel {
    constructor(name, database, collection) {
        super(database, collection);
        this.name = name;
        this.database = database;
        this.collection = collection;
        this.id = 'id';
    }
    static getInstance(db) {
        return new CommentModel('comments', db, db.collection('comments'));
    }
}
exports.CommentModel = CommentModel;
exports.ModelImpl = CommentModel;
//# sourceMappingURL=comment.js.map