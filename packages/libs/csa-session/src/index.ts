///<reference path='../../../node_modules/@types/express-session/index.d.ts'/>
import {
    Maybe,
    fromNullable,
    nothing,
    just
} from '@quenk/noni/lib/data/maybe';
import { Future, fromCallback } from '@quenk/noni/lib/control/monad/future';
import { Value } from '@quenk/noni/lib/data/json';
import { isRecord, merge } from '@quenk/noni/lib/data/record';
import { Request as BaseRequest } from '@quenk/tendril/lib/app/api/request';

export const SESSION_DATA_KEY = 'data';

/**
 * Callback type
 */
export type Callback = (e: Error, value: void) => void;

/**
 * Options for each key stored in the session.
 */
export interface Options {

    /**
     * timestamp records when the key was stored.
     */
    timestamp: number,

    /**
     * ttl indicates how long after creation the key should be expired.
     */
    ttl: number,

    /**
     * countdown is decremented by the filter for each request.
     *
     * When it reaches 0 the key is considered expired and
     * will be removed.
     *
     * If this value is set to -1 the value is never expired.
     */
    countdown: number

}

/**
 * Entries
 */
export interface Entries {

    [key: string]: Entry

}

/**
 * Entry
 */
export interface Entry {

    key: string,

    value: Value,

    options: Options

}

/**
 * Request
 */
export interface Request extends BaseRequest {

    /**
     * session value storage.
     */
    session: SessionHandle

}

/**
 * SessionHandle
 */
export interface SessionHandle extends Express.Session {

    save(cb: Callback): void

    destroy(cb: Callback): void

}

/**
 * Session provides a more uniform API for accessing session data than
 * the default express-session middleware.
 *
 * Data is restricted to being key value pairs and is stored in a hash table
 * under the name SESSION_DATA_KEY.
 *
 * Data can be configured to last for the session duration, until set time
 * has passed or a number of requests have occured. The last two depends on
 * the middleware function being installed to function correctly.
 */
export class Session {

    constructor(public data: Entries, public request: Request) { }

    /**
     * get a value from session data using its key.
     */
    get<T extends Value>(key: string): Maybe<T> {

        if (isRecord(this.data[key]))
            return just(<T>this.data[key].value);

        return nothing();

    }

    /**
     * set a value in the session.
     */
    set(key: string, value: Value, opts?: Partial<Options>): Session {

        let options = merge(defaultOptions(), opts || {});
        this.data[key] = { key, value, options };
        return this;

    }

    /**
     * remove a session key.
     */
    remove(key: string): Session {

        delete this.data[key];
        return this;

    }

    /**
     * exists tests if a key exists in the session data.
     */
    exists(key: string): boolean {

        return this.data.hasOwnProperty(key);

    }

    /**
     * save the state of the session data.
     *
     * This should be called after all modifications have
     * been made to the session data.
     */
    save(): Future<void> {

        this.request.session.data = this.data;

        return fromCallback((cb: Callback) =>
            this.request.session.save(cb));

    }

    /**
     * destroy the session.
     */
    destroy(): Future<void> {

        return fromCallback((cb: Callback) =>
            this.request.session.destroy(cb));

    }

}

const defaultOptions = () => ({

    timestamp: Date.now(),

    ttl: -1,

    countdown: -1

})

/**
 * fromRequest generates a session class from a Request
 * if session data exists.
 */
export const fromRequest = (req: BaseRequest): Maybe<Session> => {

    let maySession = fromNullable<{ data: Entries }>(<any>req.session);

    if (maySession.isNothing())
        return nothing();

    let e = maySession.get().data || {};

    return just(new Session(e, <Request>req));

}
