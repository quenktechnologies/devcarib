import * as mongodb from 'mongodb';

import { checkout } from '@quenk/tendril/lib/app/api/pool';
import { Action, doAction } from '@quenk/tendril/lib/app/api';
import { value } from '@quenk/tendril/lib/app/api/control';
import { BaseResource } from '@quenk/backdey-resource-mongodb';
import { BaseModel } from '@quenk/backdey-model-mongodb';

import { Post } from '@board/types/lib/post';

/**
 * PostModel
 */
export class PostModel extends BaseModel<Post> {

    id = 'id';

    static getInstance(db: mongodb.Db): PostModel {

        return new PostModel(db, db.collection('posts'));

    }

}

/**
 * PostAPIController provides the endpoints for post management.
 *
 * This should only be accessible to authenticated admin level users!
 */
export class PostApiController extends BaseResource<Post> {

    getModel(): Action<PostModel> {

        return doAction(function*() {

            let db: mongodb.Db = yield checkout('main');

            return value(PostModel.getInstance(db));

        });

    }

}

export const postAPI = new PostApiController();
