import * as mongodb from 'mongodb';
import * as prs from '@quenk/tendril/lib/app/api/storage/prs';
import * as session from '@quenk/tendril/lib/app/api/storage/session';
import * as adminChecks from '@board/checks/lib/admin';

import { isString } from '@quenk/noni/lib/data/type';
import { escape } from '@quenk/noni/lib/data/string/regex';
import { Object, Value } from '@quenk/noni/lib/data/jsonx';
import { Request } from '@quenk/tendril/lib/app/api/request';
import { Action, doAction } from '@quenk/tendril/lib/app/api';
import { checkout } from '@quenk/tendril/lib/app/api/pool';
import { value, fork } from '@quenk/tendril/lib/app/api/control';
import { conflict, forbidden } from '@quenk/tendril/lib/app/api/response';
import {
    HookResult,
    SearchKeys,
    BaseResource
} from '@quenk/dback-resource-mongodb';
import { Precondition } from '@quenk/preconditions/lib/async';
import { BaseModel } from '@quenk/dback-model-mongodb';

import { Post } from '@board/types/lib/post';
import { Admin } from '@board/types/lib/admin';
import { adminCheckPost, adminCheckPatch } from '@board/checks/lib/post';

const messages = {

    minLength: '{$key} must be {target} or more characters!',

    maxLength: '{$key} must be less than {target} characters!',

    notNull: '{$key} is required!'

};

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
 * AdminModel
 */
export class AdminModel extends BaseModel<Admin> {

    id = 'id';

    static getInstance(db: mongodb.Db): AdminModel {

        return new AdminModel(db, db.collection('admins'));

    }

}

/**
 * BaseController for admin routes.
 */
export abstract class BaseController<T extends Object>
    extends
    BaseResource<T> {

    /**
     * messages used in the explanation of Precondition Failures.
     */
    abstract messages: object;

    /**
     * checkCreate is applied to the body before creating new <T> records.
     */
    abstract checkCreate: Precondition<Value, T>;

    /**
     * checkUpdate is applied to the body before update an existing <T> record.
     */
    abstract checkUpdate: Precondition<Value, T>;

    /**
     * beforeSearch must be implemented to properly setup searches.
     */
    abstract beforeSearch(r: Request): Action<Request>;

    /**
     * before ensures the client has permission to access this api.
     */
    before(r: Request): HookResult {

        return <HookResult>doAction(function*() {

            let madmin = yield session.get('admin');

            if (madmin.isNothing()) return forbidden();

            return value(r);

        });

    }

    /**
     * beforeCreate validates the request body before updating.
     */
    beforeCreate(r: Request): HookResult {

        let that = this;

        return <HookResult>doAction(function*() {

            let eBody = yield fork(that.checkCreate(r.body));

            if (eBody.isLeft()) {

                let errors = eBody.takeLeft().explain(that.messages);
                return conflict({ errors });

            }

            r.body = eBody.takeRight();

            return value(r);

        });

    }

    /**
     * beforeUpdate validates the request body before updating.
     */
    beforeUpdate(r: Request): HookResult {

        let that = this;

        return <HookResult>doAction(function*() {

            let eBody = yield fork(that.checkUpdate(r.body));

            if (eBody.isLeft()) {

                let errors = eBody.takeLeft().explain(that.messages);
                return conflict({ errors });

            }

            r.body = eBody.takeRight();

            return value(r);

        });

    }

}

/**
 * AdminsController provides the handlers for the /admin/r/admins routes.
 */
export class AdminsController extends BaseController<Post> {

    messages = messages;

    checkCreate = adminChecks.post;

    checkUpdate = adminChecks.patch;

    getModel(): Action<AdminModel> {

        return doAction(function*() {

            let db: mongodb.Db = yield checkout('main');

            return value(AdminModel.getInstance(db));

        });

    }

    beforeSearch(r: Request): Action<Request> {

        return doAction(function*() {

            let qry: Object = {};

            if (isString(r.query.q)) {

                let filter = { $regex: escape(r.query.q), $options: 'i' };

                qry = { email: filter };

            }

            yield prs.set(SearchKeys.query, qry);

            return value(r);

        });

    }

}

/**
 * PostsController provides the handlers for the /admin/r/posts routes.
 */
export class PostsController extends BaseController<Post> {

    messages = messages;

    checkCreate = adminCheckPost;

    checkUpdate = adminCheckPatch;

    getModel(): Action<PostModel> {

        return doAction(function*() {

            let db: mongodb.Db = yield checkout('main');

            return value(PostModel.getInstance(db));

        });

    }

    beforeSearch(r: Request): Action<Request> {

        return doAction(function*() {

            let qry: Object = {};

            if (isString(r.query.q)) {

                let filter = { $regex: escape(r.query.q), $options: 'i' };

                qry = { $or: [{ title: filter }, { company: filter }] };

            }

            yield prs.set(SearchKeys.query, qry);

            return value(r);

        });

    }

}

export const postsCtl = new PostsController();
export const adminsCtrl = new AdminsController();
