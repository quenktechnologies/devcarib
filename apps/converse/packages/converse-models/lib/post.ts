
/** imports */
import { BaseModel } from '@quenk/dback-model-mongodb';
import { Post } from '@converse/types/lib/post';
import * as mongodb from 'mongodb';


/**
 * @private Used by templates during generation.
 */
export {
    PostModel as ModelImpl,
    Post as DataType
}

/**
 * PostModelModel.
 * AUTO-GENERATED, DO NOT EDIT DIRECTLY, CHANGES WILL BE LOST!
 */
export class PostModel extends BaseModel<Post> {

    constructor(
        public name: string,
        public database: mongodb.Db,
        public collection: mongodb.Collection) { super(database, collection); }

    id = 'id';

    static getInstance(db: mongodb.Db): PostModel {
        return new PostModel('posts', db, db.collection('posts'));

    }

}

