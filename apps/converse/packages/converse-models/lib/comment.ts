
/** imports */
import { BaseModel } from '@quenk/dback-model-mongodb';
import { Comment } from '@converse/types/lib/comment';
import * as mongodb from 'mongodb';


/**
 * @private Used by templates during generation.
 */
export {
    CommentModel as ModelImpl,
    Comment as DataType
}

/**
 * CommentModelModel.
 * AUTO-GENERATED, DO NOT EDIT DIRECTLY, CHANGES WILL BE LOST!
 */
export class CommentModel extends BaseModel<Comment> {

    constructor(
        public name: string,
        public database: mongodb.Db,
        public collection: mongodb.Collection) { super(database, collection); }

    id = 'id';

    static getInstance(db: mongodb.Db): CommentModel {
        return new CommentModel('comments', db, db.collection('comments'));

    }

}

