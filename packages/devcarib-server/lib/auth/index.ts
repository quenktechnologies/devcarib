import { Value, Object } from '@quenk/noni/lib/data/jsonx';
import { Future, doFuture, pure } from '@quenk/noni/lib/control/monad/future';
import { Either } from '@quenk/noni/lib/data/either';
import { Maybe } from '@quenk/noni/lib/data/maybe';
import { left, right } from '@quenk/noni/lib/data/either';

import { Precondition } from '@quenk/preconditions';

import { Request } from '@quenk/tendril/lib/app/api/request';

/**
 * AuthResult indicates failure or success of an authentication attempt.
 */
export type AuthResult = Either<AuthFailedContext, UserData>;

/**
 * AuthFailedContext is merged into the view context when authentication fails.
 */
export interface AuthFailedContext extends Object{

    /**
     * failed flag indicating failure.
     */
    failed: boolean,

    /**
     * credentials (raw) received from the user.
     */
    credentials: Object

}

/**
 * UserData is the pertinent details of the current user that is stored in
 * session to indicate successful authentication.
 */
export type UserData = Object;

/**
 * Authenticator is an object that knows how to correctly authenticate a
 * user's request for the application's purposes.
 *
 * The details of how to actually determine whether an auth attempt is
 * valid should be implemented here instead of a AuthController.
 */
export interface Authenticator {

    /**
     * authenticate the user's Request, returning an Either where the left side
     * is a context to be used by the login form upon failure and the right side
     * a representation of the user suitable to be stored in session data.
     *
     * This representation will be used to further determine if the user is
     * authenticated.
     */
    authenticate(req: Request): Future<Either<AuthFailedContext, UserData>>

}

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
    abstract getUser(credentials: Object): Future<Maybe<T>>;

    authenticate(req: Request): Future<AuthResult> {

        let that = this;

        return doFuture(function*() {

            let elogin = that.validate(req.body);

            if (elogin.isLeft())
                return pure(<AuthResult>left({
                    failed: true, credentials: req.body
                }));

            let muser = yield that.getUser(<Object>elogin.takeRight());

            return pure(<AuthResult>(muser.isNothing() ?
                left({ failed: true, credentials: req.body }) :
                right(muser.get())));

        });

    }

}
