import * as express from 'express';
/**
 * removeExpired removes all the entries from the session
 * whose countdown or ttl has reached 0.
 */
export declare const removeExpired: () => (req: express.Request, _: express.Response, next: Function) => void;
/**
 * decrementTTL decrements the ttl value for session entries
 * that are > 0.
 */
export declare const decrementTTL: () => (req: express.Request, _: express.Response, next: Function) => void;
