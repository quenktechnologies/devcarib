/* tdc-output-imports */

import { Future, doFuture, pure } from '@quenk/noni/lib/control/monad/future';
import { just, Maybe, nothing } from '@quenk/noni/lib/data/maybe';
import { merge } from '@quenk/noni/lib/data/record';

//@ts-ignore: 2300
import { Request } from '@quenk/tendril/lib/app/api/request';
import { PRS_CSRF_TOKEN } from '@quenk/tendril/lib/app/boot/stage/csrf-token';

import { AuthController } from '@quenk/backend/lib/app/auth/controller';
import {
    AuthFailedContext,
    BaseAuthenticator
} from '@quenk/backend/lib/app/auth/authenticator';

import { Admin } from '@mia/types/lib/admin';

import { validate as validateLogin } from '@mia/server/lib/validators/login';

import { AdminModel } from '@mia/server/lib/models/admin';

import { IndexView } from '@devcarib/views/lib/mia';
import { LoginView } from '@devcarib/views/lib/mia/login';

import { unsafeGetUserConnection } from '@quenk/tendril/lib/app/connection';
import { compare } from '@devcarib/server/lib/data/password';
import { now } from '@devcarib/common/lib/data/datetime';

const ROUTE_INDEX = '/mia';
const ROUTE_LOGIN = '/mia/login';

const TITLE = 'Mia';

class MiaAuthenticator extends BaseAuthenticator<Admin> {
    validate = validateLogin;

    getUser(creds: Object): Future<Maybe<Admin>> {
        return doFuture(function* () {
            let { email, password } = <Admin>creds;

            let db = yield unsafeGetUserConnection('main');

            let model = AdminModel.getInstance(db);

            let [admin] = yield model.search({ filters: { email } });

            if (admin == null) return pure(nothing());

            let matches = yield compare(<string>password, admin.password);

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

        form: (req: Request, ctx: AuthFailedContext) =>
            new LoginView({
                title: 'Caribbean Developers Job Board - Admin Login',

                styles: [],

                auth: merge(ctx, {
                    message: 'Email or password invalid.'
                }),

                csrfToken: <string>req.prs.getOrElse(PRS_CSRF_TOKEN, '')
            })
    };

    urls = {
        index: ROUTE_INDEX,

        form: ROUTE_LOGIN
    };

    authenticator = new MiaAuthenticator();

    userSessionKey = 'admin';
}

export const auth = new MiaAuthController();

/* tdc-output-exports */
