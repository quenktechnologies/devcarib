import { Value, Object } from '@quenk/noni/lib/data/jsonx';
import { Future } from '@quenk/noni/lib/control/monad/future';
import { Request } from '@quenk/tendril/lib/app/api/request';
import { Precondition } from '@quenk/preconditions';
import { Maybe } from '@quenk/noni/lib/data/maybe';
import { AuthResult } from '../controllers/auth';
/**
 * BaseAuthenticator provides a base Authenticator implementation for
 * authenitcating a user.
 */
export declare abstract class BaseAuthenticator<T extends Object> {
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
    authenticate(req: Request): Future<AuthResult>;
}
