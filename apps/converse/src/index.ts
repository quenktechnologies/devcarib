/* tdc-output-imports */

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
import { IndexView } from '@devcarib/views/lib/converse';
import { LoginView } from '@devcarib/views/lib/converse/login';

import { User } from '@converse/types/lib/user';

import { UserModel } from '@converse/models/lib/user';

import { unsafeGetConnection } from '@devcarib/server/lib/db';
import { compare } from '@devcarib/server/lib/data/password';
import { now } from '@devcarib/common/lib/data/datetime';

import { InviteController } from './invites';

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

        form: (req: Request, ctx: AuthFailedContext) => new LoginView({

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

        form: ROUTE_LOGIN

    }

    authenticator = new ConverseAuthenticator();

}

export const auth = new ConverseAuthController();
export const invites = new InviteController();
export const ensureAuthXHR = auth.ensureAuthXHR;

/* tdc-output-exports */
