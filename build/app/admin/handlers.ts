import * as mongodb from 'mongodb';
import * as moment from 'moment';
import * as bcrypt from 'bcryptjs';
import * as session from '@quenk/tendril/lib/app/api/storage/session';

import { Object } from '@quenk/noni/lib/data/jsonx';
import { Future, fromCallback } from '@quenk/noni/lib/control/monad/future';
import { Request } from '@quenk/tendril/lib/app/api/request';
import { Action, doAction } from '@quenk/tendril/lib/app/api';
import { checkout } from '@quenk/tendril/lib/app/api/pool';
import {  fork } from '@quenk/tendril/lib/app/api/control';
import { show, redirect } from '@quenk/tendril/lib/app/api/response';
import { BaseModel } from '@quenk/dback-model-mongodb';

import { Admin } from '@board/types/lib/admin';
import { validate as validateLogin } from '@board/validators/lib/login';

const ROUTE_INDEX = '/admin';
const ROUTE_LOGIN = '/admin/login';

const VIEW_LOGIN = 'admin/login.html';
const VIEW_INDEX = 'admin/index.html';

const KEY_LOGIN_VIEW_CTX = 'loginCtx';

const ERR_AUTH_FAILED = 'Email or password is invalid!';
const ERR_AUTH_INVALID = 'Correct the below error(s) before continuing.';

const messages = {

    minLength: '{$key} must be {target} or more characters!',

    maxLength: '{$key} must be less than {target} characters!',

    notNull: '{$key} is required!'

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

            let muser = yield session.get('admin');

            if (muser.isJust()) {

                return show(VIEW_INDEX);

            } else {

                return redirect(ROUTE_LOGIN, 301);

            }

        });

    }

    /**
     * showLoginForm renders the page with the login form.
     */
    showLoginForm(_: Request): Action<undefined> {

        return doAction(function*() {

            let ctx = yield session.getOrElse(KEY_LOGIN_VIEW_CTX, {});
            return show(VIEW_LOGIN, ctx);

        });

    }

    /**
     * authenticate the admin user.
     */
    authenticate(req: Request): Action<undefined> {

        return doAction(function*() {

            let elogin = validateLogin(req.body);

            if (elogin.isLeft())
                return showAuthError({

                    message: ERR_AUTH_INVALID,

                    errors: elogin.takeLeft().explain(messages)

                });

            let { email, password } = elogin.takeRight();

            let db = yield checkout('main');

            let model = AdminModel.getInstance(db);

            let [admin] = yield fork(model.search({ email }));

            if (admin == null)
                return showAuthError(authFailedErr(email));

            let matches = yield fork(comparePasswords(
                <string>password, admin.password)
            );

            if (!matches)
                return showAuthError(authFailedErr(email));

            let change = { last_login: today() };

            yield fork(model.update(admin.id, change));

            yield session.set('admin', { id: admin.id });

            return redirect(ROUTE_INDEX, 302);

        });

    }

    /**
     * logout the admin user.
     */
    logout(_: Request): Action<undefined> {

        return doAction(function*() {

            yield session.destroy();

            return redirect(ROUTE_LOGIN, 302);

        });

    }

}

const authFailedErr = (email?: string) => ({
    email,
    errors: { message: ERR_AUTH_FAILED }
})

const showAuthError = (ctx: Object): Action<undefined> =>
    doAction(function*() {

        yield session.set(KEY_LOGIN_VIEW_CTX, ctx, { ttl: 1 });
        return redirect(ROUTE_LOGIN, 303);

    });

const comparePasswords = (pwd1: string, pwd2: string): Future<boolean> =>
    fromCallback<boolean>(cb => bcrypt.compare(pwd1, pwd2, cb));

const today = () => moment.utc().toDate();

export const adminCtl = new AdminController();
