import * as dotenv from 'dotenv';
dotenv.config({ path: `${__dirname}/../../.env` });

import * as postData from '../../../fixtures/data/post';

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
import { paths } from '../../../fixtures/agent';
import { testkit } from '../../../fixtures/database';
import {
    SearchConf,
    UpdateConf,
    GetConf,
    RemoveConf,
    testCreate,
    testSearch,
    testUpdate,
    testGet,
    testRemove
} from './common/tests';

describe('posts', () => {

    let app = new App(template);

    beforeEach(() => toPromise(testkit.setUp()))

    beforeEach(() => toPromise(app.start()))

    afterEach(() => toPromise(testkit.tearDown()))

    afterEach(() => toPromise(app.stop()))

    afterEach(() => toPromise(testkit.setDown()))

    describe('/admin/r/posts', () => {

        describe('POST', () => {

            it('should create a new post', () =>
                toPromise(testCreate({

                    paths: { create: paths.admin.posts },

                    authenticate: true,

                    expectedStatus: 201,

                    getCreateData: () => postData.newData()[0],

                    afterCreate: () => doFuture(function*() {

                        let post = postData.newData()[0];
                        let n = yield testkit.count('posts', {

                            $and: [{ title: post.title }, { approved: false }]

                        });

                        return attempt(() => { assert(n).equal(1); });

                    })
                })))

            it('should require authentication', () =>
                toPromise(testCreate({

                    paths: { create: paths.admin.posts },

                    authenticate: false,

                    expectedStatus: 403,

                    getCreateData: () => postData.newData()[0],

                    afterCreate: () => doFuture(function*() {

                        let post = postData.newData()[0];
                        let n = yield testkit.count('posts', {

                            $and: [{ title: post.title }, { approved: false }]

                        });

                        return attempt(() => { assert(n).equal(0); });

                    })
                })))
        })

        describe('GET', () => {

            it('should search posts', () =>
                toPromise(testSearch({

                    paths: { search: paths.admin.posts },

                    collection: 'posts',

                    testkit: testkit,

                    authenticate: true,

                    expectedStatus: 200,

                    getSearchData: () => postData.newData(),

                    getSearchParams: () => ({ q: 'Quenk' }),

                    afterSearch: (_: SearchConf, r: Response<any>) =>
                        doFuture(function*() {

                            return attempt(() => {

                                assert(r.body.data.length).equal(2);

                            });

                        })
                })))

            it('should require authentication', () =>
                toPromise(testSearch({

                    paths: { search: paths.admin.posts },

                    collection: 'posts',

                    testkit: testkit,

                    authenticate: false,

                    expectedStatus: 403,

                    getSearchData: () => postData.newData(),

                    getSearchParams: () => ({ q: 'Quenk' })

                })))
        })
    })

    describe('/admin/r/posts/:id', () => {

        describe('PATCH', () => {

            it('should update a post', () =>
                toPromise(testUpdate({

                    paths: { update: interpolate(paths.admin.post, { id: 1 }) },

                    collection: 'posts',

                    testkit: testkit,

                    authenticate: true,

                    expectedStatus: 200,

                    getUpdateData: () => postData.newData(),

                    getUpdateParams: () => ({ title: 'Ramajay Needed' }),

                    afterUpdate: (info: UpdateConf) =>
                        doFuture(function*() {

                            let mposts = yield info.testkit.find(
                                'posts',
                                info.getUpdateParams()
                            );

                            return attempt(() => {

                                assert(mposts.length).equal(1);

                            });

                        })
                })))

            it('should require authentication', () =>
                toPromise(testUpdate({

                    paths: { update: interpolate(paths.admin.post, { id: 1 }) },

                    collection: 'posts',

                    testkit: testkit,

                    authenticate: false,

                    expectedStatus: 403,

                    getUpdateData: () => postData.newData(),

                    getUpdateParams: () => ({ title: 'Ramajay Needed' }),

                    afterUpdate: (info: UpdateConf) =>
                        doFuture(function*() {

                            let mposts = yield info.testkit.find(
                                'posts',
                                info.getUpdateParams()
                            );

                            return attempt(() => {

                                assert(mposts.length).equal(0);

                            });

                        })
                })))
        })

        describe('GET', () => {

            it('should get a post', () =>
                toPromise(testGet({

                    paths: { get: interpolate(paths.admin.post, { id: 1 }) },

                    collection: 'posts',

                    testkit: testkit,

                    authenticate: true,

                    expectedStatus: 200,

                    getGetData: () => postData.newData(),

                    afterGet: (_: GetConf, r: Response<any>) =>
                        doFuture(function*() {

                            return attempt(() => {

                                assert(r.body.title)
                                    .equal(postData.newData()[0].title);

                            });

                        })
                })))

            it('should require authentication', () =>
                toPromise(testGet({

                    paths: { get: interpolate(paths.admin.post, { id: 1 }) },

                    collection: 'posts',

                    testkit: testkit,

                    authenticate: false,

                    expectedStatus: 403,

                    getGetData: () => postData.newData()

                })))
        })

        describe('DELETE', () => {

            it('should remove a post', () =>
                toPromise(testRemove({

                    paths: { remove: interpolate(paths.admin.post, { id: 1 }) },

                    collection: 'posts',

                    testkit: testkit,

                    authenticate: true,

                    expectedStatus: 200,

                    getRemoveData: () => postData.newData(),

                    afterRemove: (_: RemoveConf) =>
                        doFuture(function*() {

                            let results = yield testkit.find('posts', {

                                title: postData.newData()[0].title

                            });

                            return attempt(() => {

                                assert(results.length).equal(0);

                            });
                        })
                })))

            it('should require authentication', () =>
                toPromise(testRemove({

                    paths: { remove: interpolate(paths.admin.post, { id: 1 }) },

                    collection: 'posts',

                    testkit: testkit,

                    authenticate: false,

                    expectedStatus: 403,

                    getRemoveData: () => postData.newData(),

                })))
        })
    })
})
