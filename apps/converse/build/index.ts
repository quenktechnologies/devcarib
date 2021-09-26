
//@ts-ignore: 6133
import {System} from '@quenk/potoo/lib/actor/system';
//@ts-ignore: 6133
import * as _json from '@quenk/noni/lib/data/jsonx';
//@ts-ignore: 6133
import {Template} from '@quenk/tendril/lib/app/module/template';
//@ts-ignore: 6133
import {Module} from '@quenk/tendril/lib/app/module';
//@ts-ignore: 2300
import {Request} from '@quenk/tendril/lib/app/api/request;'
//@ts-ignore: 6133
import {RouteConf as $RouteConf} from '@quenk/tendril/lib/app/module';
import {App as App} from '@quenk/tendril/lib/app';




import * as moment from 'moment';
import * as bcrypt from 'bcryptjs';

import { Object } from '@quenk/noni/lib/data/jsonx';
import { Future, fromCallback } from '@quenk/noni/lib/control/monad/future';

// @ts-ignore: 2300
import { Request } from '@quenk/tendril/lib/app/api/request';
import { Action, doAction } from '@quenk/tendril/lib/app/api';
import { checkout } from '@quenk/tendril/lib/app/api/pool';
import { fork } from '@quenk/tendril/lib/app/api/control';
import { redirect } from '@quenk/tendril/lib/app/api/response';

import { render } from '@quenk/tendril-show-wml';
import { PRS_CSRF_TOKEN } from '@quenk/tendril/lib/app/boot/stage/csrf-token';

import { validate as validateLogin } from '@converse/validators/lib/login';

import { LoginView } from '@converse/views/lib/login';
import { IndexView } from '@converse/views';

import { UserModel } from '@converse/models/lib/user';
import { merge } from '@quenk/noni/lib/data/record';

const ROUTE_INDEX = '/';
const ROUTE_LOGIN = '/converse/login';

const KEY_LOGIN_VIEW_CTX = 'loginCtx';

const ERR_AUTH_FAILED = 'Email or password is incorrect.';

const messages = {

    minLength: '{$key} must be {target} or more characters!',

    maxLength: '{$key} must be less than {target} characters!',

    notNull: '{$key} is required!'

}

/**
 * WebController serves the UI for web requests.
 */
export class WebController {

    /**
     * onIndex renders the index page to the user.
     *
     * If a user session cannot be detected, the user is redirected to the
     * login page.
     */
    onIndex(r: Request): Action<undefined> {

        return doAction<undefined>(function*() {

            let muser = r.session.get('user');

            if (muser.isJust()) {

                return <Action<undefined>>render(new IndexView({}));

            } else {

                return redirect(ROUTE_LOGIN, 301);

            }

        });

    }

    /**
     * onLoginForm renders the login page.
     */
    onLoginForm(r: Request): Action<void> {

        return doAction(function*() {

            let ctx = r.session.getOrElse(KEY_LOGIN_VIEW_CTX, {});

            return render(new LoginView(merge(<object>ctx, {
                csrfToken: <string>r.prs.getOrElse(PRS_CSRF_TOKEN, '')
            })));

        });

    }

    /**
     * onLoginFormSubmit handles the authentication atempt.
     */
    onLoginFormSubmit(req: Request): Action<undefined> {

        return doAction(function*() {

            let elogin = validateLogin(req.body);

            if (elogin.isLeft())
                return showAuthError(req, {

                    message: ERR_AUTH_FAILED,

                    errors: elogin.takeLeft().explain(messages)

                });

            let { email, password } = elogin.takeRight();

            let db = yield checkout('main');

            let model = UserModel.getInstance(db);

            let [user] = yield fork(model.search({ email }));

            if (user == null)
                return showAuthError(req, authFailedErr(email));

            let matches = yield fork(comparePasswords(
                <string>password, user.password)
            );

            if (!matches)
                return showAuthError(req, authFailedErr(email));

            let change = { last_login: today() };

            yield fork(model.update(user.id, change));

            req.session.set('user', { id: user.id });

            return redirect(ROUTE_INDEX, 302);

        });

    }

    /**
     * onLogout is called when the user logs out.
     */
    onLogout(r: Request): Action<undefined> {

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

//@ts-ignore: 6133
export const template = ($app: App): Template => (
 {'id': `converse`,
'app': {'dirs': {'self': `/apps/converse/build`},
'routes': //@ts-ignore: 6133
($module:Module) => {

let $routes:$RouteConf[] = [];
let userCtrl = new WebController();

$routes.push({
method:'get',
path:'/',
filters:[userCtrl.onIndex.bind(userCtrl)]});

$routes.push({
method:'get',
path:'/login',
filters:[userCtrl.onLoginForm.bind(userCtrl)]});

$routes.push({
method:'post',
path:'/login',
filters:[userCtrl.onLoginFormSubmit.bind(userCtrl)]});

$routes.push({
method:'post',
path:'/logout',
filters:[userCtrl.onLogout.bind(userCtrl)]});
return $routes;
}},
'create': 
//@ts-ignore: 6133 
(s:System) => new Module(<App>s)})
