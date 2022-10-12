/** imports */
import { BaseModel } from '@quenk/dback-model-mongodb';
import { Comment } from '@converse/types/lib/comment';
import * as mongodb from 'mongodb';
/**
 * @private Used by templates during generation.
 */
export { CommentModel as ModelImpl, Comment as DataType };
/**
 * CommentModelModel.
 * AUTO-GENERATED, DO NOT EDIT DIRECTLY, CHANGES WILL BE LOST!
 */
export declare class CommentModel extends BaseModel<Comment> {
    name: string;
    database: mongodb.Db;
    collection: mongodb.Collection;
    constructor(name: string, database: mongodb.Db, collection: mongodb.Collection);
    id: string;
    static getInstance(db: mongodb.Db): CommentModel;
}
