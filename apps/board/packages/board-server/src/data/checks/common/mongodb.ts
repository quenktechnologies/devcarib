import * as mongodb from 'mongodb';

import { Future } from '@quenk/noni/lib/control/monad/future';

import {  unsafeGetUserConnection } from '@quenk/tendril/lib/app/connection';

import { CollectionName, CollectionProvider } from '@quenk/backend/lib/app/db/mongodb/checks';

/**
 * GetCollection is a function that produces a CollectionProvider given the
 * name.
 */
export type GetCollection = (name:CollectionName) => CollectionProvider;

const getMain = ()=> unsafeGetUserConnection<mongodb.Db>('main');

/**
 * getCollection provides a mongodb collection using the tendril pool.
 */
export const getCollection:GetCollection = (name: CollectionName) => ()=> Future.do(async ()=> {

    let db = await getMain();

    return db.collection(name);

});
