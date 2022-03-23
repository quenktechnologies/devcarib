import * as mongo from 'mongodb';
/**
 * getConnection from tendril's internal connection pool by id.
 */
export declare const getConnection: (id?: string) => import("@quenk/noni/lib/control/monad/future").Future<import("@quenk/wml").Maybe<mongo.Db>>;
/**
 * unsafeGetConnection form tendril's internal connection pool by id.
 *
 * This can cause the app to crash if the id was not found.
 */
export declare const unsafeGetConnection: (id?: string) => import("@quenk/noni/lib/control/monad/future").Future<mongo.Db>;
