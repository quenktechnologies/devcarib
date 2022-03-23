import { View } from '@quenk/wml';

import { Future } from '@quenk/noni/lib/control/monad/future';
import { Object } from '@quenk/noni/lib/data/jsonx';
import { Either } from '@quenk/noni/lib/data/either';

import { Request } from '@quenk/tendril/lib/app/api/request';
import { Action, doAction } from '@quenk/tendril/lib/app/api';
import { fork, next } from '@quenk/tendril/lib/app/api/control';
import { redirect, unauthorized } from '@quenk/tendril/lib/app/api/response';

import { render } from '@quenk/tendril-show-wml';

/**
 * AuthResult indicates failure or success of an authentication attempt.
 */
export type AuthResult = Either<AuthFailedContext, UserData>;

/**
 * AuthFailedContext is merged into the view context when authentication fails.
 */
export type AuthFailedContext = Object;

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
 * AuthController provides a workflow for authenticating a user. It is designed
 * with the intention of serving an Single Page Application (SPA) but can be
 * used to authenticate a regular website as well.
 *
 * The actual details of determing whether an authentication request should be
 * honoured or not are left up to the provided authenticator.
 */
export abstract class AuthController {

    /**
     * views holds the various views used for this workflow
     */
    abstract views: {

        /**
         * index is the view used to render the index.
         */
        index: View,

        /**
         * auth is the view used to render the login form.
         */
        auth: View

    }

    /**
     * urls used for redirecting.
     */
    abstract urls: {

        /**
         * auth is the url the user will be redirected to for authentication.
         */
        auth: string,

        /**
         * index is the url the user will be redirected to on successful
         * authentication.
         */
        index: string,

    }

    /**
     * authenticator used to authenticate users on request.
     */
    abstract authenticator: Authenticator;

    /**
     * userSessionKey is the session value to store the user data in.
     */
    userSessionKey = 'user';

    /**
     * authContextPRSKey is the PRS key used to store metadata between a failed
     * auth attempt and the login form.
     */
    authContextPRSKey = 'auth';

    /**
     * checkAuth produces a filter that can be included in a route to ensure
     * the user is authenticated before proceeding.
     *
     * @param isXHR - If true, responds with a status code only on failure,
     *                redirects to the auth form otherwise.
     */
    checkAuth = (isXHR = false) => (req: Request): Action<void> => {

        if (req.session.exists(this.userSessionKey)) return next(req);

        return isXHR ? unauthorized() : redirect(this.urls.auth, 302);

    }

    /**
     * onIndex displays the index page of the application if the user is properly
     * authenticated.
     *
     * If not, the user will be redirected to the login page.
     */
    onIndex(req: Request): Action<void> {

        let that = this;

        return doAction(function*() {

            let muser = req.session.get(that.userSessionKey);

            if (muser.isJust()) {

                return render(that.views.index);

            } else {

                return redirect(that.urls.auth, 302);

            }

        });

    }

    /**
     * onAuthForm renders the login form.
     */
    onAuthForm(_: Request): Action<void> {

        return render(this.views.auth);

    }

    /**
     * onAuthenticate handles the authentication request sent by the user.
     */
    onAuthenticate(req: Request): Action<void> {

        let that = this;

        return doAction(function*() {

            let euser = yield fork(that.authenticator.authenticate(req));

            if (euser.isLeft()) {

                req.session.setWithDescriptor(that.authContextPRSKey,
                    euser.takeLeft(), { ttl: 1 });

                return redirect(that.urls.auth, 303)

            }

            req.session.set(that.userSessionKey, euser.takeRight());

            return redirect(that.urls.index, 302);

        });

    }

    /**
     * onLogout destroys the user's authenticated session.
     */
    onLogout(req: Request): Action<undefined> {

        let that = this;

        return doAction(function*() {

            yield fork(req.session.destroy());

            return redirect(that.urls.auth, 302);

        });

    }

}
