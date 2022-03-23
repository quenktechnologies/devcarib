import * as mongo from 'mongodb';

import {
    getUserConnection,
    unsafeGetUserConnection
} from '@quenk/tendril/lib/app/connection';

/**
 * getConnection from tendril's internal connection pool by id.
 */
export const getConnection = (id = 'main') => getUserConnection<mongo.Db>(id);

/**
 * unsafeGetConnection form tendril's internal connection pool by id.
 *
 * This can cause the app to crash if the id was not found.
 */
export const unsafeGetConnection = (id = 'main') =>
    unsafeGetUserConnection<mongo.Db>(id)
