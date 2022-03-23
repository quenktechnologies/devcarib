
import { Value, Object } from '@quenk/noni/lib/data/jsonx';
import { Future, doFuture, pure } from '@quenk/noni/lib/control/monad/future';

import { Request } from '@quenk/tendril/lib/app/api/request';

import { Precondition } from '@quenk/preconditions';
import { Maybe } from '@quenk/noni/lib/data/maybe';
import { AuthResult } from '../controllers/auth';
import { left, right } from '@quenk/noni/lib/data/either';

/**
 * BaseAuthenticator provides a base Authenticator implementation for
 * authenitcating a user.
 */
export abstract class BaseAuthenticator<T extends Object> {

    /**
     * validate the authentication request before attempting authentication.
     *
     * This property should be implemented to ensure the request is actually
     * valid; required fields are specified, data is the correct format etc.
     */
    abstract validate: Precondition<Value, Value>;

    /**
     * getUser performs the actual authentication by retrieving a user who the
     * provided credentials are valid for.
     *
     * If no such user exists Nothing should be returned.
     */
    abstract getUser(body: Object): Maybe<T>;

    authenticate(req: Request): Future<AuthResult> {

        let that = this;

        return doFuture(function*() {

            let elogin = that.validate(req.body);

            if (elogin.isLeft())
                return pure(left({ authFailed: true, credentials: req.body }));

            let muser = yield that.getUser(<Object>elogin.takeRight());

            return pure(muser.isNothing() ?
                left({ authFailed: true, credentials: req.body }) :
                right(muser.get()));

        });

    }

}
