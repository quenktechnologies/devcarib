import * as mongodb from 'mongodb';
import * as jobStatus from '@board/common/lib/data/job';

import {
    insertOne,
    findOne,
    find
} from '@quenk/noni-mongodb/lib/database/collection';

import {
    created,
    conflict
} from '@quenk/tendril/lib/app/api/response';
import { fork } from '@quenk/tendril/lib/app/api/control';
import { checkout } from '@quenk/tendril/lib/app/api/pool';
import { tell } from '@quenk/tendril/lib/app/api/control/actor';
import { Action, doAction } from '@quenk/tendril/lib/app/api';
import { Request } from '@quenk/tendril/lib/app/api/request';

import { render } from '@quenk/tendril-show-wml';

import { check } from '@board/checks/lib/candidate-post';

import { NotFoundErrorView } from '@board/views/lib/error/404';
import { PostFormView } from '@board/views/lib/post-form';
import { PostView } from '@board/views/lib/post';
import { IndexView } from '@board/views';

import { OutgoingMessage } from '@board/server/lib/actors/mail/server';

export const ERROR_AUTH_FAILED = 'Invalid Email or password! Try again.';

/**
 * showPosts currently approved.
 *
 * This only shows the most recent 50 posts. In future we will refactor if
 * needed to show more.
 */
export const showPosts = (_: Request): Action<undefined> =>
    doAction(function*() {

        let db = yield getMain();

        let collection = db.collection('posts');

        let qry = { status: jobStatus.JOB_STATUS_ACTIVE };

        let posts = yield fork(find(
            collection,
            qry,
            { sort: { created_on: -1 }, limit: 50 }
        ));

        return <Action<undefined>>render(new IndexView({ posts }));

    });

/**
 * showPostJobPage displays the form for creating new posts on a new
 * page.
 */
export const showPostJobPage = (_: Request): Action<undefined> =>
    <Action<undefined>>render(new PostFormView({}));

/**
 * createPost saves the submitted post data in the database for approval later.
 */
export const createPost = (r: Request): Action<undefined> =>
    doAction(function*() {

        let eResult = yield fork(check(r.body));

        if (eResult.isRight()) {

            let data = eResult.takeRight();
            let db = yield getMain();
            let collection = db.collection('posts');

            // XXX: This is important to prevent the user from being able to
            // set the status. In the future we should split out the
            // validation for post again.
            data.status = jobStatus.JOB_STATUS_NEW;

            data.created_on = new Date();

            yield fork(insertOne(collection, data));

            if (process.env.ADMIN_EMAIL)
                yield tell('/mail', new OutgoingMessage(process.env.ADMIN_EMAIL,
                    'New post', 'Someone posted *a new job* to board!'));



            return created({ id: data.id });

        } else {

            return conflict({ errors: eResult.takeLeft().explain() });

        }

    })

/**
 * showPost displays a page for a single approved post.
 */
export const showPost = (r: Request): Action<undefined> =>
    doAction(function*() {

        let id = Number(r.params.id); //XXX: this could be done with a check.

        let db = yield getMain();

        let collection = db.collection('posts');

        let qry = { id, status: jobStatus.JOB_STATUS_ACTIVE };

        let mResult = yield fork(findOne(collection, qry));

        if (mResult.isNothing()) {
            return <Action<undefined>>render(new NotFoundErrorView({}), 404);
        } else {

            let post = mResult.get();

            return <Action<undefined>>render(new PostView({
                post,

                // TODO: Move this to a library function
                meta: [
                    {
                        property: 'og:site_name',
                        content: 'Caribbean Developers'
                    },
                    { property: 'og:type', content: 'article' },
                    { property: 'og:image', content: "https://jobs.caribbeandevelopers.org/ogimg.png" },
                    { property: 'og:title', content: post.title },
                    { property: 'og:description', content: post.type }
                ]
            }));

        }

    })

//retrieves the main connection from the tendril pool.
const getMain = (): Action<mongodb.Db> => checkout('main');
