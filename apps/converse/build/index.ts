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

import { validate } from '@converse/validators/lib/login';
import { IndexView } from '@devcarib/views/lib/converse';
import { LoginView } from '@devcarib/views/lib/converse/login';

import { User } from '@converse/types/lib/user';

import { UserModel } from '@converse/models/lib/user';

import { AuthController } from '@devcarib/server/lib/controllers/auth';
import { AuthFailedContext, BaseAuthenticator } from '@devcarib/server/lib/auth';
import { unsafeGetConnection } from '@devcarib/server/lib/db';
import { compare } from '@devcarib/server/lib/data/password';
import { now } from '@devcarib/common/lib/data/datetime';

const TITLE = 'Converse';
const ROUTE_INDEX = '/converse';
const ROUTE_LOGIN = '/converse/login';

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

        index: () => new IndexView({ title: TITLE }),

        auth: (req: Request, ctx: AuthFailedContext) => new LoginView({

            title: 'Caribbean Developers Job Board - Admin Login',

            styles: [],

            auth: merge(ctx, {

                message: 'Email or password invalid.'

            }),

            csrfToken: <string>req.prs.getOrElse(PRS_CSRF_TOKEN, '')

        })

    }

    urls = {

        index: ROUTE_INDEX,

        auth: ROUTE_LOGIN

    }

    authenticator = new ConverseAuthenticator();

}

export const auth = new ConverseAuthController();

//XXX: Seems like there is a parser bug in jcon that won't let us specify
// ..#auth.checkAuth(true)
export const checkAuth = auth.checkAuth;

//@ts-ignore: 6133
export const template = ($app: App): Template => (
 {'id': `converse`,
'app': {'dirs': {'self': `/apps/converse/build`,
'public': [`../frontend/public`]},
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
return $routes;
}},
'create': 
//@ts-ignore: 6133 
(s:System) => new Module(<App>s)})
