import { View } from '@quenk/wml';
import { Request } from '@quenk/tendril/lib/app/api/request';
import { Action } from '@quenk/tendril/lib/app/api';
import { Authenticator, AuthFailedContext } from '../auth';
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
        index: (req: Request) => View;
        /**
         * auth is the view used to render the login form.
         */
        auth: (req: Request, ctx: AuthFailedContext) => View;
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
     * authContextKey is the session key used to store metadata between a failed
     * auth attempt and the login form.
     */
    authContextKey: string;
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
    onAuthForm(req: Request): Action<void>;
    /**
     * onAuthenticate handles the authentication request sent by the user.
     */
    onAuthenticate(req: Request): Action<void>;
    /**
     * onLogout destroys the user's authenticated session.
     */
    onLogout(req: Request): Action<undefined>;
}
