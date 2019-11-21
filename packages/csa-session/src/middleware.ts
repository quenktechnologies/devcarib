import * as express from 'express';
import { filter, map } from '@quenk/noni/lib/data/record';
import { Entries, Entry } from './';

/**
 * removeExpired removes all the entries from the session
 * whose countdown or ttl has reached 0.
 */
export const removeExpired =
    () => (req: express.Request, _: express.Response, next: Function) => {

        if (req.session && req.session.data)
            req.session.data = filter(req.session.data, (e: Entry) => {

                if (e.options.ttl === 0) return false;

                if ((e.options.countdown !== -1) &&
                    (Date.now() - e.options.countdown) === 0)
                    return false;

                return true;

            });

        next();

    }

/**
 * decrementTTL decrements the ttl value for session entries
 * that are > 0.
 */
export const decrementTTL =
    () => (req: express.Request, _: express.Response, next: Function) => {

        if (req.session && req.session.data) {

            let data: Entries = req.session.data;

            req.session.data = map(data, (e: Entry) => {

                if ((e.options.ttl !== -1) && (e.options.ttl !== 0))
                    e.options.ttl = e.options.ttl - 1;

                return e;

            });

        }
        next();

    }
