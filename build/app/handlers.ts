import * as mongodb from 'mongodb';
import * as bcryptjs from 'bcryptjs';

import {
    insertOne,
    findOne,
    find
} from '@quenk/safe-mongodb/lib/database/collection';
import {
    show,
    redirect,
    created,
    conflict
} from '@quenk/tendril/lib/app/api/response';
import { fork } from '@quenk/tendril/lib/app/api/control';
import { checkout } from '@quenk/tendril/lib/app/api/pool';
import { Action, doAction } from '@quenk/tendril/lib/app/api';
import { Request } from '@quenk/tendril/lib/app/api/request';
import { isRecord } from '@quenk/noni/lib/data/record';
import { fromCallback } from '@quenk/noni/lib/control/monad/future';

import { check  } from '@board/checks/lib/candidatepost';

export const ERROR_AUTH_FAILED = 'Invalid Email or password! Try again.';

/**
 * SessionRequest
 *
 * This interface is a temporary hack until tendril has better session
 * support.
 */
interface SessionRequest extends Request {

    session: any

}

/**
 * showIndex of the site.
 *
 * For now this will redirect to the dashboard if the user is logged in
 * or to the login form if they are not.
 *
 * In a future iteration this will display recent job postings.
 */
export const showIndex = (r: Request): Action<undefined> => {

    let req = <SessionRequest>r;

    if (req.session.user == null) {

        return redirect('/login', 302);

    } else {

        return redirect('/dashboard', 302);

    }

}

/**
 * showLoginForm displays the user login form.
 */
export const showLoginForm = (r: Request): Action<undefined> =>
    show('login.html', (<SessionRequest>r).session);

/**
 * login attempts to authenticate a user so they can access the protected
 * resources of the application.
 *
 * It works like this:
 *
 * 1. The user submits an email and password.
 * 2. If we have no matching email in the database, we redirect and tell the
 *    user their attempt failed.
 * 3. If there is a matching email, we retreive the password hash for it.
 * 4. We then compare the provided password to the hash we have in the database.
 * 5. If the comparison is successful, we refres the session and store the
 *    user's id, then redirect to the dashboard.
 * 6. If the comparisson fails, we redirect the user and tell them their attempt
 *    failed.
 */
export const login = (req: Request): Action<undefined> =>
    doAction(function*() {

        //shut the compiler up.
        let r = <SessionRequest>req;

        //If a session does not exist, the user is probably not
        //using our form so we reject the request.
        if (r.session == null) return redirect('/login', 303);

        if (isRecord(r.body)) {

            let email = r.body.email;

            let password = <string>r.body.password;

            let db = yield getMain();

            let users = db.collection('users');

            let qry = { email: email };

            let mUser = yield fork(findOne(users, qry));

            if (mUser.isNothing()) {

                r.session.error = ERROR_AUTH_FAILED;

                return redirect('/login', 303);

            }

            let user = mUser.get();

            let didMatch = yield fork(compare(password, user.password));

            if (didMatch) {

                //regenerate the session to start a fresh.
                yield fork(fromCallback(cb => r.session.regenerate(cb)));

                r.session.user = user.id;

                return redirect('/dashboard', 303);

            } else {

                r.session.error = ERROR_AUTH_FAILED;

                return redirect('/login', 303);

            }

        } else {

            r.session.error = ERROR_AUTH_FAILED;

            return redirect('/login', 302);

        }

    })

const compare = (pwd: string, hash: string) =>
    fromCallback(cb => bcryptjs.compare(pwd, hash, cb));

/**
 * logout the user from the application.
 *
 * This basically destroys the session so we no longer know who the user is.
 */
export const logout = (req: Request): Action<undefined> =>
    doAction(function*() {

        let r = <SessionRequest>req;

        if (r.session != null)
            yield fork(fromCallback(cb => r.session.destroy(cb)));

        return redirect('/', 302);

    });

/**
 * createPost saves the submitted post data in the database for approval later.
 */
export const createPost = (r: Request): Action<undefined> =>
    doAction(function*() {

        let eResult = yield fork(check()(r.body));

        if (eResult.isRight()) {

            let data = eResult.takeRight();
            let db = yield getMain();
            let collection = db.collection('posts');

            data.approved = false;

            yield fork(insertOne(collection, data));

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

        let qry = { id, approved: true };

        let mResult = yield fork(findOne(collection, qry));

        if (mResult.isNothing())
            return show('errors/not-found.html', {}, 404);
        else
            return show('post.html', { post: mResult.get() });

    })

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

        let qry = { approved: true };

        let mResult = yield fork(
            find(collection, qry, { sort: { created_at: -1 }, limit: 50 }));

        let posts = mResult.isNothing() ? [] : mResult.get();

        return show('index.html', { posts: posts });

    });

/**
 * showPostJobPage displays the form for creating new posts on a new
 * page.
 */
export const showPostJobPage = (_: Request): Action<undefined> =>
    doAction(function*() {

        return show('post-form.html', {});

    });

//retrieves the main connection from the tendril pool.
const getMain = (): Action<mongodb.Db> => checkout('main');
