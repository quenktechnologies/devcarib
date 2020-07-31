import * as mongodb from 'mongodb';
import * as prs from '@quenk/tendril/lib/app/api/storage/prs';

import { isString } from '@quenk/noni/lib/data/type';
import { Request } from '@quenk/tendril/lib/app/api/request';
import { Action, doAction } from '@quenk/tendril/lib/app/api';
import { checkout } from '@quenk/tendril/lib/app/api/pool';
import { value  } from '@quenk/tendril/lib/app/api/control';
import { show } from '@quenk/tendril/lib/app/api/response';
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
 * AdminController serves the UI and endpoints for the admin section.
 *
 * All the routes here should only be accessible to authenticated admin level
 * users!
 */
export class AdminController extends BaseResource<Post> {

    /**
     * showIndex displays the admin app page to the user.
     *
     * Note: This is not a JSON endpoint!
     */
    showIndex = (_: Request): Action<undefined> => {

        return show('admin.html');

    }

    search = (r: Request): Action<void> => {

        let doSearch = super.search;

        return doAction(function*() {

            yield prs.set(SearchKeys.query, isString(r.query.q) ?
                { title: r.query.q } : {});

            return doSearch(r);

        });

    }

    getModel(): Action<PostModel> {

        return doAction(function*() {

            let db: mongodb.Db = yield checkout('main');

            return value(PostModel.getInstance(db));

        });

    }

}

export const adminCtl = new AdminController();
