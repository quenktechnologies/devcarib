import * as mongodb from 'mongodb';
import * as moment from 'moment';
import * as bcrypt from 'bcryptjs';

import { Object } from '@quenk/noni/lib/data/jsonx';
import { Future, fromCallback } from '@quenk/noni/lib/control/monad/future';
import { Type } from '@quenk/noni/lib/data/type';

import { Request } from '@quenk/tendril/lib/app/api/request';
import { Action, doAction } from '@quenk/tendril/lib/app/api';
import { checkout } from '@quenk/tendril/lib/app/api/pool';
import { fork } from '@quenk/tendril/lib/app/api/control';
import { redirect } from '@quenk/tendril/lib/app/api/response';
import { PRS_CSRF_TOKEN } from '@quenk/tendril/lib/app/boot/stage/csrf-token';

import { BaseModel } from '@quenk/dback-model-mongodb';

import { render } from '@quenk/tendril-show-wml';

import { Admin } from '@board/types/lib/admin';

import { validate as validateLogin } from '@board/validators/lib/login';

import { IndexView } from '@board/views/lib/admin';
import { LoginView } from '@board/views/lib/admin/login';

const ROUTE_INDEX = '/admin';
const ROUTE_LOGIN = '/admin/login';

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
    showIndex = (r: Request): Action<undefined> => {

        return doAction<undefined>(function*() {

            let muser = r.session.get('admin');

            if (muser.isJust()) {

                return <Action<undefined>>render(new IndexView({

                    title: 'Caribbean Developers Job Board - Admin',

                    styles: ['/assets/css/board-admin.css']

                }));

            } else {

                return redirect(ROUTE_LOGIN, 301);

            }

        });

    }

    /**
     * showLoginForm renders the page with the login form.
     */
    showLoginForm(r: Request): Action<void> {

        return doAction(function*() {

            // Type is used here until wml optional properties are sorted out.
            let ctx = <Type>r.session.getOrElse(KEY_LOGIN_VIEW_CTX, {});

            ctx.title = 'Caribbean Developers Job Board - Admin Login';

            ctx.styles = [];

            return render(new LoginView({

                title: 'Caribbean Developers Job Board - Admin Login',

                styles: [],

                csrfToken: <string>r.prs.getOrElse(PRS_CSRF_TOKEN, '')

            }));

        });

    }

    /**
     * authenticate the admin user.
     */
    authenticate(req: Request): Action<undefined> {

        return doAction(function*() {

            let elogin = validateLogin(req.body);

            if (elogin.isLeft())
                return showAuthError(req, {

                    message: ERR_AUTH_INVALID,

                    errors: elogin.takeLeft().explain(messages)

                });

            let { email, password } = elogin.takeRight();

            let db = yield checkout('main');

            let model = AdminModel.getInstance(db);

            let [admin] = yield fork(model.search({ email }));

            if (admin == null)
                return showAuthError(req, authFailedErr(email));

            let matches = yield fork(comparePasswords(
                <string>password, admin.password)
            );

            if (!matches)
                return showAuthError(req, authFailedErr(email));

            let change = { last_login: today() };

            yield fork(model.update(admin.id, change));

            req.session.set('admin', { id: admin.id });

            return redirect(ROUTE_INDEX, 302);

        });

    }

    /**
     * logout the admin user.
     */
    logout(r: Request): Action<undefined> {

        return doAction(function*() {

            yield fork(r.session.destroy());

            return redirect(ROUTE_LOGIN, 302);

        });

    }

}

const authFailedErr = (email?: string) => ({
    email,
    errors: { message: ERR_AUTH_FAILED }
})

const showAuthError = (r: Request, ctx: Object): Action<undefined> =>
    doAction(function*() {

        r.session.setWithDescriptor(KEY_LOGIN_VIEW_CTX, ctx, { ttl: 1 });
        return redirect(ROUTE_LOGIN, 303);

    });

const comparePasswords = (pwd1: string, pwd2: string): Future<boolean> =>
    fromCallback<boolean>(cb => bcrypt.compare(pwd1, pwd2, cb));

const today = () => moment.utc().toDate();

export const adminCtl = new AdminController();
