import * as dotenv from 'dotenv';
dotenv.config({ path: `${__dirname}/../../.env` });


import { assert } from '@quenk/test/lib/assert';
import { App } from '@quenk/tendril/lib/app';
import {
    toPromise,
    attempt,
    doFuture
} from '@quenk/noni/lib/control/monad/future';
import { interpolate } from '@quenk/noni/lib/data/string';
import { Response } from '@quenk/jhr/lib/response';

import { template } from '../../../../build/app';
import { newData } from '../../../fixtures/data/admin';
import { paths } from '../../../fixtures/agent';
import { testkit } from '../../../fixtures/database';
import {
    SearchConf,
    GetConf,
    RemoveConf,
    testCreate,
    testSearch,
    testUpdate,
    testGet,
    testRemove
} from './common/tests';

describe('admins', () => {

    let app = new App(template);

    beforeEach(() => toPromise(testkit.setUp()))

    beforeEach(() => toPromise(app.start()))

    afterEach(() => toPromise(testkit.tearDown()))

    afterEach(() => toPromise(app.stop()))

    afterEach(() => toPromise(testkit.setDown()))

    describe('/admin/r/admins', () => {

        describe('POST', () => {

            it('should create a new admin', () =>
                toPromise(testCreate({

                    paths: { create: paths.admin.admins },

                    authenticate: true,

                    expectedStatus: 201,

                    getCreateData: () => newData()[0],

                    afterCreate: () => doFuture(function*() {

                        let { email } = newData()[0];
                        let n = yield testkit.count('admins', { email });

                        return attempt(() => { assert(n).equal(1); });

                    })
                })))

            it('should require authentication', () =>
                toPromise(testCreate({

                    paths: { create: paths.admin.admins },

                    authenticate: false,

                    expectedStatus: 403,

                    getCreateData: () => newData()[0],

                    afterCreate: () => doFuture(function*() {

                        let { email } = newData()[0];
                        let n = yield testkit.count('admins', { email });

                        return attempt(() => { assert(n).equal(0); });

                    })
                })))
        })

        describe('GET', () => {

            it('should search admins', () =>
                toPromise(testSearch({

                    paths: { search: paths.admin.admins },

                    collection: 'admins',

                    testkit: testkit,

                    authenticate: true,

                    expectedStatus: 200,

                    getSearchData: () => newData(),

                    getSearchParams: () => ({ q: 'test@example.com' }),

                    afterSearch: (_: SearchConf, r: Response<any>) =>
                        doFuture(function*() {

                            return attempt(() => {

                                assert(r.body.data.length).equal(1);

                            });

                        })
                })))

            it('should require authentication', () =>
                toPromise(testSearch({

                    paths: { search: paths.admin.admins },

                    collection: 'admins',

                    testkit: testkit,

                    authenticate: false,

                    expectedStatus: 403,

                    getSearchData: () => newData(),

                    getSearchParams: () => ({ email: 'test@example.com' })

                })))
        })
    })

    describe('/admin/r/admins/:id', () => {

        describe('PATCH', () => {

            it('should update a admin', () =>
                toPromise(testUpdate({

                    paths: { update: interpolate(paths.admin.admin, { id: 2 }) },

                    collection: 'admins',

                    testkit: testkit,

                    authenticate: true,

                    expectedStatus: 200,

                    getUpdateData: () => newData(),

                    getUpdateParams: () => ({ password: 'password123' }),

                })))

            it('should require authentication', () =>
                toPromise(testUpdate({

                    paths: { update: interpolate(paths.admin.admin, { id: 2 }) },

                    collection: 'admins',

                    testkit: testkit,

                    authenticate: false,

                    expectedStatus: 403,

                    getUpdateData: () => newData(),

                    getUpdateParams: () => ({ password: 'password123' }),

                })))
        })

        describe('GET', () => {

            it('should get a admin', () =>
                toPromise(testGet({

                    paths: { get: interpolate(paths.admin.admin, { id: 2 }) },

                    collection: 'admins',

                    testkit: testkit,

                    authenticate: true,

                    expectedStatus: 200,

                    getGetData: () => newData(),

                    afterGet: (_: GetConf, r: Response<any>) =>
                        doFuture(function*() {

                            return attempt(() => {

                                assert(r.body.email).equal(newData()[0].email);

                            });

                        })
                })))

            it('should require authentication', () =>
                toPromise(testGet({

                    paths: { get: interpolate(paths.admin.admin, { id: 2 }) },

                    collection: 'admins',

                    testkit: testkit,

                    authenticate: false,

                    expectedStatus: 403,

                    getGetData: () => newData()

                })))
        })

        describe('DELETE', () => {

            it('should remove an admin', () =>
                toPromise(testRemove({

                    paths: { remove: interpolate(paths.admin.admin, { id: 2 }) },

                    collection: 'admins',

                    testkit: testkit,

                    authenticate: true,

                    expectedStatus: 200,

                    getRemoveData: () => newData(),

                    afterRemove: (_: RemoveConf) =>
                        doFuture(function*() {

                            let results = yield testkit.find('admins', {

                                email: newData()[0].email

                            });

                            return attempt(() => {

                                assert(results.length).equal(0);

                            });
                        })
                })))

            it('should require authentication', () =>
                toPromise(testRemove({

                    paths: { remove: interpolate(paths.admin.admin, { id: 2 }) },

                    collection: 'admins',

                    testkit: testkit,

                    authenticate: false,

                    expectedStatus: 403,

                    getRemoveData: () => newData(),

                })))
        })
    })
})
