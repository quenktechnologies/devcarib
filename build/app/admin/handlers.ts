import * as mongodb from 'mongodb';
import * as moment from 'moment';
import * as bcrypt from 'bcryptjs';
import * as prs from '@quenk/tendril/lib/app/api/storage/prs';
import * as session from '@quenk/tendril/lib/app/api/storage/session';

import { isString } from '@quenk/noni/lib/data/type';
import { escape } from '@quenk/noni/lib/data/string/regex';
import { Object } from '@quenk/noni/lib/data/jsonx';
import { Request } from '@quenk/tendril/lib/app/api/request';
import { Action, doAction } from '@quenk/tendril/lib/app/api';
import { checkout } from '@quenk/tendril/lib/app/api/pool';
import { value, fork } from '@quenk/tendril/lib/app/api/control';
import { show, conflict, redirect } from '@quenk/tendril/lib/app/api/response';
import { SearchKeys, BaseResource } from '@quenk/dback-resource-mongodb';
import { BaseModel } from '@quenk/dback-model-mongodb';

import { Post } from '@board/types/lib/post';
import { User } from '@board/types/lib/user';
import { adminCheckPatch } from '@board/checks/lib/post';
import { Future, fromCallback } from '@quenk/noni/lib/control/monad/future';

const templates = {};

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
 * UserModel
 */
export class UserModel extends BaseModel<User> {

    id = 'id';

    static getInstance(db: mongodb.Db): PostModel {

        return new UserModel(db, db.collection('admins'));

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

            let qry: Object = {};

            if (isString(r.query.q)) {

                let filter = { $regex: escape(r.query.q), $options: 'i' };

                qry = { $or: [{ title: filter }, { company: filter }] };

            }

            yield prs.set(SearchKeys.query, qry);

            return that.search(r);

        });

    }

    /**
     * runUpdate valdiates and applies an update to a Post.
     */
    runUpdate = (r: Request): Action<void> => {

        let that = this;

        return doAction(function*() {

            let eBody = yield fork(adminCheckPatch(r.body));

            if (eBody.isLeft()) {

                let errors = eBody.takeLeft().explain(templates);
                return conflict({ errors });

            }

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

        return doAction<undefined>(function*() {

            let muser = yield session.get('user');

            if (muser.isJust()) {

                return show('admin.html');

            } else {

                return redirect('/admin/login', 301);

            }

        });

    }

    /**
     * showLoginForm renders the page with the login form.
     */
    showLoginForm(_: Request): Action<undefined> {

        // TODO: Show messages stored in flash
        return show('login.html', {});

    }

    /**
     * authenticate the admin user.
     */
    authenticate(req: Request): Action<undefined> {

        let { username, password } =
            <{ username: string, password: string }>req.body;

        return doAction(function*() {

            let db = yield checkout('main');

            let model = UserModel.getInstance(db);

            let musers = yield fork(model.search({ username }));

            if (musers.isNothing())
                return showAuthError(username);

            let user = musers.get()[0];

            let matches = yield fork(comparePasswords(password, user.password));

            if (!matches)
                return showAuthError(username);

            let change = { last_login: today() };

            yield fork(model.update(user.id, change));

            yield session.set('user', { id: user.id });

            return redirect('/admin', 302);

        });

    }

    /**
     * logout the admin user.
     */
    logout(_: Request): Action<undefined> {

        return doAction(function*() {

            yield session.destroy();

            return redirect('/admin/login', 303);

        });

    }

}

const showAuthError = (_username: string): Action<undefined> =>
    doAction(function*() {

        // TODO: This function awaits flash support in tendril.
        return redirect('/admin/login', 303);

    });

const comparePasswords = (pwd1: string, pwd2: string): Future<boolean> =>
    fromCallback<boolean>(cb => bcrypt.compare(pwd1, pwd2, cb));

const today = () => moment.utc().toDate();

export const adminCtl = new AdminController();
export const postsCtl = new PostsController();
