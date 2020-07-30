import * as mongodb from 'mongodb';
import * as prs from '@quenk/tendril/lib/app/api/storage/prs';

import { isString } from '@quenk/noni/lib/data/type';
import { Request } from '@quenk/tendril/lib/app/api/request';
import { Action, doAction } from '@quenk/tendril/lib/app/api';
import { checkout } from '@quenk/tendril/lib/app/api/pool';
import { value, next } from '@quenk/tendril/lib/app/api/control';
import { SearchKeys, BaseResource } from '@quenk/backdey-resource-mongodb';
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

    /**
     * setQuery sets the PRS for executing a search on the posts collection.
     */
    setQuery = (r: Request): Action<void> => {

        return doAction(function*() {

            yield prs.set(SearchKeys.query, isString(r.query.q) ?
                { title: r.query.q } : {});

            return next(r);

        });

    }

    getModel(): Action<PostModel> {

        return doAction(function*() {

            let db: mongodb.Db = yield checkout('main');

            return value(PostModel.getInstance(db));

        });

    }

}

export const postAPI = new PostApiController();
