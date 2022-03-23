/* tdc-output-imports */

import { Future, doFuture, pure } from '@quenk/noni/lib/control/monad/future';
import { just, Maybe, nothing } from '@quenk/noni/lib/data/maybe';
import { merge } from '@quenk/noni/lib/data/record';

//@ts-ignore: 2300
import { Request } from '@quenk/tendril/lib/app/api/request';
import { PRS_CSRF_TOKEN } from '@quenk/tendril/lib/app/boot/stage/csrf-token';

import { Admin } from '@mia/types/lib/admin';

import { validate as validateLogin } from '@mia/validators/lib/login';

import { AdminModel } from '@mia/models/lib/admin';

import { IndexView } from '@mia/views';
import { LoginView } from '@mia/views/lib/login';

import { AuthController } from '@devcarib/server/lib/controllers/auth';
import { AuthFailedContext, BaseAuthenticator } from '@devcarib/server/lib/auth';
import { unsafeGetConnection } from '@devcarib/server/lib/db';
import { compare } from '@devcarib/server/lib/data/password';
import { now } from '@devcarib/server/lib/data/datetime';

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
 * MiaAuthController serves the endpoints for authentication.
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

/* tdc-output-exports */
