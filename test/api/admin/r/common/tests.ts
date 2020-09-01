import * as dotenv from 'dotenv';
dotenv.config({ path: `${__dirname}/../../../.env` });

import { assert } from '@quenk/test/lib/assert';
import { Type } from '@quenk/noni/lib/data/type';
import {
    Future,
    pure,
    attempt,
    doFuture
} from '@quenk/noni/lib/control/monad/future';
import { Response } from '@quenk/jhr/lib/response';
import { Agent } from '@quenk/jhr/lib/agent';
import { Testkit } from '@quenk/dback-mongodb-testkit';

import {
    createHTMLAgent,
    createJSONAgent,
    loginAdmin
} from '../../../../fixtures/agent';

/**
 * Conf for a test.
 *
 * This is the base interface which carries the common properties.
 */
export interface Conf {

    /**
     * authenticate if true, indicates the test should login as admin first.
     */
    authenticate?: boolean

}

/**
 * CreateConf for testing record creation.
 */
export interface CreateConf extends Conf {

    paths: { create: string },

    expectedStatus: number,

    getCreateData: () => object,

    afterCreate?: (info: CreateConf) => Future<void>

}

/**
 * SearchConf for testing search of records.
 */
export interface SearchConf extends Conf {

    paths: { search: string },

    collection: string,

    testkit: Testkit,

    expectedStatus: number,

    getSearchData: () => object[],

    getSearchParams: () => object,

    afterSearch?: (info: SearchConf, r: Response<Type>) => Future<void>

}

/**
 * UpdateConf for testing updating a record.
 */
export interface UpdateConf extends Conf {

    paths: { update: string },

    collection: string,

    testkit: Testkit,

    expectedStatus: number,

    getUpdateData: () => object[],

    getUpdateParams: () => object,

    afterUpdate?: (info: UpdateConf) => Future<void>

}

/**
 * GetConf for testing the retrieval of a single record.
 */
export interface GetConf extends Conf {

    paths: { get: string },

    collection: string,

    testkit: Testkit,

    expectedStatus: number,

    getGetData: () => object[],

    afterGet?: (info: GetConf, r: Response<Type>) => Future<void>

}

/**
 * RemoveConf for testing the removal of a single record.
 */
export interface RemoveConf extends Conf {

    paths: { remove: string },

    collection: string,

    testkit: Testkit,

    expectedStatus: number,

    getRemoveData: () => object[],

    afterRemove?: (info: RemoveConf) => Future<void>

}

/**
 * testCreate tests the creation of a record using an endpoint.
 */
export const testCreate = (info: CreateConf) => doFuture(function*() {

    let htmlAgent = createHTMLAgent();
    let jsonAgent = createJSONAgent();
    let data = info.getCreateData();

    yield ensureAuthOrCSRFToken(info, htmlAgent, jsonAgent);

    let r = yield jsonAgent.post(info.paths.create, data);

    yield attempt(() => assert(r.code).equal(info.expectedStatus));

    if (info.afterCreate)
        yield info.afterCreate(info);

    return pure(undefined);

});

/**
 * testSearch test searching for records using an endpoint.
 */
export const testSearch = (info: SearchConf) => doFuture(function*() {

    let htmlAgent = createHTMLAgent();
    let jsonAgent = createJSONAgent();
    let data = info.getSearchData();
    let params = info.getSearchParams();
    let { collection, testkit } = info;

    yield testkit.populate(collection, data);
    yield ensureAuthOrCSRFToken(info, htmlAgent, jsonAgent);

    let r = yield jsonAgent.get(info.paths.search, params);

    yield attempt(() => assert(r.code).equal(info.expectedStatus));

    if (info.afterSearch)
        yield info.afterSearch(info, r);

    return pure(undefined);

});

/**
 * testUpdate tests the updating of a record using an endpoint.
 */
export const testUpdate = (info: UpdateConf) => doFuture(function*() {

    let htmlAgent = createHTMLAgent();
    let jsonAgent = createJSONAgent();
    let data = info.getUpdateData();
    let params = info.getUpdateParams();
    let { testkit, collection } = info;

    yield testkit.populate(collection, data);
    yield ensureAuthOrCSRFToken(info, htmlAgent, jsonAgent);

    let r = yield jsonAgent.patch(info.paths.update, params);

    yield attempt(() => assert(r.code).equal(info.expectedStatus));

    if (info.afterUpdate)
        yield info.afterUpdate(info);

    return pure(undefined);

});

/**
 * testGet tests the retrieval of a single record using an endpoint.
 */
export const testGet = (info: GetConf) => doFuture(function*() {

    let htmlAgent = createHTMLAgent();
    let jsonAgent = createJSONAgent();
    let data = info.getGetData();
    let { testkit, collection } = info;

    yield testkit.populate(collection, data);
    yield ensureAuthOrCSRFToken(info, htmlAgent, jsonAgent);

    let r = yield jsonAgent.get(info.paths.get);

    yield attempt(() => assert(r.code).equal(info.expectedStatus));

    if (info.afterGet)
        yield info.afterGet(info, r);

    return pure(undefined);

});

/**
 * testRemove tests the removal of a single record using an endpoint.
 */
export const testRemove = (info: RemoveConf) => doFuture(function*() {

    let htmlAgent = createHTMLAgent();
    let jsonAgent = createJSONAgent();
    let data = info.getRemoveData();
    let { testkit, collection } = info;

    yield ensureAuthOrCSRFToken(info, htmlAgent, jsonAgent);
    yield testkit.populate(collection, data);

    let r = yield jsonAgent.delete(info.paths.remove);

    yield attempt(() => assert(r.code).equal(info.expectedStatus));

    if (info.afterRemove)
        yield info.afterRemove(info);

    return pure(undefined);

});

const ensureAuthOrCSRFToken =
    (info: Conf, html: Agent<Type, Type>, json: Agent<Type, Type>) =>
        doFuture(function*() {

            if (info.authenticate)
                yield loginAdmin(html);
            else
                yield html.get('/admin/login');

            json.cookies = html.cookies;

            return pure(undefined);

        });
