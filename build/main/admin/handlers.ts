import * as mongodb from 'mongodb';
import * as prs from '@quenk/tendril/lib/app/api/storage/prs';

import { isString } from '@quenk/noni/lib/data/type';
import { escape } from '@quenk/noni/lib/data/string/regex';
import { Request } from '@quenk/tendril/lib/app/api/request';
import { Action, doAction } from '@quenk/tendril/lib/app/api';
import { checkout } from '@quenk/tendril/lib/app/api/pool';
import { value, fork } from '@quenk/tendril/lib/app/api/control';
import { show, conflict } from '@quenk/tendril/lib/app/api/response';
import { SearchKeys, BaseResource } from '@quenk/backdey-resource-mongodb';
import { BaseModel } from '@quenk/backdey-model-mongodb';

import { Post } from '@board/types/lib/post';
import {patch} from '@board/checks/lib/post';

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
 * PostsController provides the handlers for the /admin/r/posts routes.
 */
export class PostsController extends BaseResource<Post> {

    /**
     * runSearch executes a search using the "q" query variable
     * as an argument for
     */
    runSearch = (r: Request): Action<void> => {

        let that = this;

        return doAction(function*() {

            let qry = isString(r.query.q) ?
                { title: { $regex: escape(r.query.q), $options: 'i' } } : {};

            yield prs.set(SearchKeys.query, qry);

            return that.search(r);

        });

    }

    /**
     * runUpdate valdiates and applies an update to a post.
     */
    runUpdate = (r: Request): Action<void> => {

        let that = this;

        return doAction(function*() {

            let eBody = yield fork(patch(r.body));

            if (eBody.isLeft())
                return conflict({ errors: eBody.takeLeft() });

            r.body = eBody.takeRight();

            return that.update(r);

        });

    }

    getModel(): Action<PostModel> {

        return doAction(function*() {

            let db: mongodb.Db = yield checkout('main');

            return value(PostModel.getInstance(db));

        });

    }

}

/**
 * AdminController serves the UI for the admin section.
 *
 * All the routes here should only be accessible to authenticated admin level
 * users!
 */
export class AdminController {

    /**
     * showIndex displays the admin app page to the user.
     *
     * Note: This is not a JSON endpoint!
     */
    showIndex = (_: Request): Action<undefined> => {

        return show('admin.html');

    }

}

export const adminCtl = new AdminController();
export const postsCtl = new PostsController();
