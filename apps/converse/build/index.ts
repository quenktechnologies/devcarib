import * as dotR from './r'; 
//@ts-ignore: 6133
import {System} from '@quenk/potoo/lib/actor/system';
//@ts-ignore: 6133
import * as _json from '@quenk/noni/lib/data/jsonx';
//@ts-ignore: 6133
import {Template} from '@quenk/tendril/lib/app/module/template';
//@ts-ignore: 6133
import {Module} from '@quenk/tendril/lib/app/module';
//@ts-ignore: 6133
import {Request} from '@quenk/tendril/lib/app/api/request;'
//@ts-ignore: 6133
import {RouteConf as $RouteConf} from '@quenk/tendril/lib/app/module';
import {App as App} from '@quenk/tendril/lib/app';




import { Object } from '@quenk/noni/lib/data/jsonx';
import { Future, doFuture, pure } from '@quenk/noni/lib/control/monad/future';
import { merge } from '@quenk/noni/lib/data/record';
import { just, Maybe, nothing } from '@quenk/noni/lib/data/maybe';

// Imported automatically.
// @ts-ignore: 2300
import { Request } from '@quenk/tendril/lib/app/api/request';
import { PRS_CSRF_TOKEN } from '@quenk/tendril/lib/app/boot/stage/csrf-token';

import { AuthController } from '@quenk/server/lib/app/auth/controller';
import {
    AuthFailedContext,
    BaseAuthenticator
} from '@quenk/server/lib/app/auth/authenticator';

import { validate } from '@converse/validators/lib/login';

import { User } from '@converse/types/lib/user';

import { UserModel } from '@converse/models/lib/user';

import { unsafeGetConnection } from '@devcarib/server/lib/db';
import { compare } from '@devcarib/server/lib/data/password';
import { now } from '@devcarib/common/lib/data/datetime';

import { IndexView } from './views';
import { UserView } from './views/user';
import { LoginView } from './views/login';

import { InviteController } from './invites';

class ConverseAuthenticator extends BaseAuthenticator<User> {

    validate = validate;

    getUser(creds: Object): Future<Maybe<User>> {

        return doFuture(function*() {

            let { email, password } = <User>creds;

            let db = yield unsafeGetConnection();

            let model = UserModel.getInstance(db);

            let [user] = yield model.search({
                $or: [{ email }, { username: email }]
            });

            if (user == null) return pure(nothing());

            let matches = yield compare(<string>password, user.password);

            if (!matches) return pure(nothing());

            let change = { last_login: now() };

            yield model.update(user.id, change);

            return pure(just({ id: user.id, username: user.username }));

        });

    }

}

/**
 * ConverseAuthController serves the endpoints for converse authentication.
 */
export class ConverseAuthController extends AuthController {

    views = {

        index: () => new UserView(),

        form: (req: Request, ctx: AuthFailedContext) => new LoginView({

            title: 'Caribbean Developers Job Board - Admin Login',

            styles: [],

            auth: merge(ctx, {

                message: 'Email or password invalid.'

            }),

            csrfToken: <string>req.prs.getOrElse(PRS_CSRF_TOKEN, '')

        })

    }

    authenticator = new ConverseAuthenticator();

    userNotDetected(req: Request) {

        //TODO: We should not need to specify all these properties here.
        //Only csrfToken should be required.
        return this.show(new IndexView({

            auth: {

                failed: false,

                message: ''

            },

            csrfToken: <string>req.prs.getOrElse(PRS_CSRF_TOKEN, '')

        }));

    }

}

export const auth = new ConverseAuthController();
export const invites = new InviteController();
export const ensureAuthXHR = auth.ensureAuthXHR;

//@ts-ignore: 6133
export const template = ($app: App): Template => (
 {'id': `converse`,
'app': {'dirs': {'self': `/apps/converse/build`,
'public': [`../public`,`../frontend/public`]},
'path': `/`,
'modules': {'r': dotR.template},
'routes': //@ts-ignore: 6133
($module:Module) => {

let $routes:$RouteConf[] = [];

$routes.push({
method:'get',
path:'/',
filters:[auth.onIndex.bind(auth)],tags:{}});

$routes.push({
method:'get',
path:'/login',
filters:[auth.onAuthForm.bind(auth)],tags:{}});

$routes.push({
method:'post',
path:'/login',
filters:[auth.onAuthenticate.bind(auth)],tags:{}});

$routes.push({
method:'post',
path:'/logout',
filters:[auth.onLogout.bind(auth)],tags:{}});

$routes.push({
method:'get',
path:'/invites/:id',
filters:[invites.onForm.bind(invites)],tags:{}});

$routes.push({
method:'post',
path:'/invites/:id',
filters:[invites.onRegister.bind(invites)],tags:{}});

$routes.push({
method:'get',
path:'/register/success',
filters:[invites.onSuccess.bind(invites)],tags:{}});
return $routes;
}},
'create': 
//@ts-ignore: 6133 
(s:System) => new Module(<App>s)})
