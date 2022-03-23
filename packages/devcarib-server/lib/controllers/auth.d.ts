import { View } from '@quenk/wml';
import { Future } from '@quenk/noni/lib/control/monad/future';
import { Object } from '@quenk/noni/lib/data/jsonx';
import { Either } from '@quenk/noni/lib/data/either';
import { Request } from '@quenk/tendril/lib/app/api/request';
import { Action } from '@quenk/tendril/lib/app/api';
/**
 * AuthResult indicates failure or success of an authentication attempt.
 */
export declare type AuthResult = Either<AuthFailedContext, UserData>;
/**
 * AuthFailedContext is merged into the view context when authentication fails.
 */
export declare type AuthFailedContext = Object;
/**
 * UserData is the pertinent details of the current user that is stored in
 * session to indicate successful authentication.
 */
export declare type UserData = Object;
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
    authenticate(req: Request): Future<Either<AuthFailedContext, UserData>>;
}
/**
 * AuthController provides a workflow for authenticating a user. It is designed
 * with the intention of serving an Single Page Application (SPA) but can be
 * used to authenticate a regular website as well.
 *
 * The actual details of determing whether an authentication request should be
 * honoured or not are left up to the provided authenticator.
 */
export declare abstract class AuthController {
    /**
     * views holds the various views used for this workflow
     */
    abstract views: {
        /**
         * index is the view used to render the index.
         */
        index: View;
        /**
         * auth is the view used to render the login form.
         */
        auth: View;
    };
    /**
     * urls used for redirecting.
     */
    abstract urls: {
        /**
         * auth is the url the user will be redirected to for authentication.
         */
        auth: string;
        /**
         * index is the url the user will be redirected to on successful
         * authentication.
         */
        index: string;
    };
    /**
     * authenticator used to authenticate users on request.
     */
    abstract authenticator: Authenticator;
    /**
     * userSessionKey is the session value to store the user data in.
     */
    userSessionKey: string;
    /**
     * authContextPRSKey is the PRS key used to store metadata between a failed
     * auth attempt and the login form.
     */
    authContextPRSKey: string;
    /**
     * checkAuth produces a filter that can be included in a route to ensure
     * the user is authenticated before proceeding.
     *
     * @param isXHR - If true, responds with a status code only on failure,
     *                redirects to the auth form otherwise.
     */
    checkAuth: (isXHR?: boolean) => (req: Request) => Action<void>;
    /**
     * onIndex displays the index page of the application if the user is properly
     * authenticated.
     *
     * If not, the user will be redirected to the login page.
     */
    onIndex(req: Request): Action<void>;
    /**
     * onAuthForm renders the login form.
     */
    onAuthForm(_: Request): Action<void>;
    /**
     * onAuthenticate handles the authentication request sent by the user.
     */
    onAuthenticate(req: Request): Action<void>;
    /**
     * onLogout destroys the user's authenticated session.
     */
    onLogout(req: Request): Action<undefined>;
}
