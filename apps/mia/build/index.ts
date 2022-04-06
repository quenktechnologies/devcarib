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




import { Future, doFuture, pure } from '@quenk/noni/lib/control/monad/future';
import { just, Maybe, nothing } from '@quenk/noni/lib/data/maybe';
import { merge } from '@quenk/noni/lib/data/record';

//@ts-ignore: 2300
import { Request } from '@quenk/tendril/lib/app/api/request';
import { PRS_CSRF_TOKEN } from '@quenk/tendril/lib/app/boot/stage/csrf-token';

import { Admin } from '@mia/types/lib/admin';

import { validate as validateLogin } from '@mia/validators/lib/login';

import { AdminModel } from '@mia/models/lib/admin';

import { IndexView } from '@devcarib/views/lib/mia';
import { LoginView } from '@devcarib/views/lib/mia/login';

import { AuthController } from '@devcarib/server/lib/controllers/auth';
import { AuthFailedContext, BaseAuthenticator } from '@devcarib/server/lib/auth';
import { unsafeGetConnection } from '@devcarib/server/lib/db';
import { compare } from '@devcarib/server/lib/data/password';
import { now } from '@devcarib/common/lib/data/datetime';

const ROUTE_INDEX = '/mia';
const ROUTE_LOGIN = '/mia/login';

const TITLE = 'Mia';

class MiaAuthenticator extends BaseAuthenticator<Admin> {

    validate = validateLogin;

    getUser(creds: Object): Future<Maybe<Admin>> {

        return doFuture(function*() {

            let { email, password } = <Admin>creds;

            let db = yield unsafeGetConnection();

            let model = AdminModel.getInstance(db);

            let [admin] = yield model.search({ email });

            if (admin == null) return pure(nothing());

            let matches = yield compare(
                <string>password, admin.password);

            if (!matches) return pure(nothing());

            let change = { last_login: now() };

            yield model.update(admin.id, change);

            return pure(just({ id: admin.id }));

        });

    }

}

/**
 * MiaAuthController serves the endpoints for mia authentication.
 */
export class MiaAuthController extends AuthController {

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

    authenticator = new MiaAuthenticator();

    userSessionKey = 'admin';

}

export const auth = new MiaAuthController();

//@ts-ignore: 6133
export const template = ($app: App): Template => (
 {'id': `mia`,
'app': {'dirs': {'self': `/apps/mia/build`,
'public': [`../public`,`../frontend/public`,`../packages/mia-views/public`]},
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
