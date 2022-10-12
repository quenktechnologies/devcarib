/** imports */
import { BaseModel } from '@quenk/dback-model-mongodb';
import { Post } from '@converse/types/lib/post';
import * as mongodb from 'mongodb';
/**
 * @private Used by templates during generation.
 */
export { PostModel as ModelImpl, Post as DataType };
/**
 * PostModelModel.
 * AUTO-GENERATED, DO NOT EDIT DIRECTLY, CHANGES WILL BE LOST!
 */
export declare class PostModel extends BaseModel<Post> {
    name: string;
    database: mongodb.Db;
    collection: mongodb.Collection;
    constructor(name: string, database: mongodb.Db, collection: mongodb.Collection);
    id: string;
    static getInstance(db: mongodb.Db): PostModel;
}
