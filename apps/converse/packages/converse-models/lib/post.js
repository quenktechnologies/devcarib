"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModel = exports.ModelImpl = void 0;
/** imports */
const dback_model_mongodb_1 = require("@quenk/dback-model-mongodb");
/**
 * PostModelModel.
 * AUTO-GENERATED, DO NOT EDIT DIRECTLY, CHANGES WILL BE LOST!
 */
class PostModel extends dback_model_mongodb_1.BaseModel {
    constructor(name, database, collection) {
        super(database, collection);
        this.name = name;
        this.database = database;
        this.collection = collection;
        this.id = 'id';
    }
    static getInstance(db) {
        return new PostModel('posts', db, db.collection('posts'));
    }
}
exports.PostModel = PostModel;
exports.ModelImpl = PostModel;
//# sourceMappingURL=post.js.map