/* tdc-output-imports */

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
import { now } from '@devcarib/server/lib/data/datetime';

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

            return pure(just({ id: user.id }));

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

/* tdc-output-exports */
