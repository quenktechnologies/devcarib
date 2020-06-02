import * as mongodb from 'mongodb';
import * as bcryptjs from 'bcryptjs';

import { insertOne, findOne, find } from '@quenk/safe-mongodb/lib/database/collection';
import {
    show,
    redirect,
    created,
    conflict
} from '@quenk/tendril/lib/app/api/action/response';
import { await } from '@quenk/tendril/lib/app/api/action/control';
import { checkout } from '@quenk/tendril/lib/app/api/action/pool';
import { ActionM } from '@quenk/tendril/lib/app/api/action';
import { Request } from '@quenk/tendril/lib/app/api/request';
import { DoFn, doN } from '@quenk/noni/lib/control/monad';
import { isRecord } from '@quenk/noni/lib/data/record';
import { fromCallback } from '@quenk/noni/lib/control/monad/future';

import { check as checkEmployer } from '@board/checks/lib/employer';
import { check as checkJob } from '@board/checks/lib/job';

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
export const showIndex = (r: Request): ActionM<undefined> => {

    let req = <SessionRequest>r;

    if (req.session.user == null) {

        return redirect('/login', 302);

    } else {

        return redirect('/dashboard', 302);

    }

}

/**
 * showDashboard displays the application dashboard.
 */
export const showDashboard = (_: Request): ActionM<undefined> =>
    show('dashboard.html', {});

/**
 * showLoginForm displays the user login form.
 */
export const showLoginForm = (r: Request): ActionM<undefined> =>
    show('login.html', (<SessionRequest>r).session);

/**
 * showRegistrationForm displays the employer regisration form.
 */
export const showRegistrationForm = (r: Request): ActionM<undefined> =>
    show('employer/registration/form.html', (<SessionRequest>r).session);

/**
 * createEmployer creates a new user account for an employer.
 *
 * It works like this:
 * 1. We apply the Employer check to the request body to see if its valid.
 * 2. If yes we save the employer in the "users" collection and redirect
 *    to the login page.
 * 3. If not, we store the errors in the session and redirect to the form.
 */
export const createEmployer = (req: Request): ActionM<undefined> =>
    doN(<DoFn<undefined, ActionM<undefined>>>function*() {

        let r = <SessionRequest>req;

        let eResult = yield await(() => checkEmployer(r.body));

        if (eResult.isRight()) {

            let data = eResult.takeRight();

            let db = yield getMain();

            let collection = db.collection('users');

            yield await(() => insertOne(collection, data));

            return redirect('/login', 303);

        } else {

            //TODO: expand the errors so they make sense.
            if (r.session != null)
                r.session.errors = eResult.takeLeft().explain();

            return redirect('/', 303);

        }

    })

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
export const login = (req: Request): ActionM<undefined> =>
    doN(<DoFn<undefined, ActionM<undefined>>>function*() {

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

            let mUser = yield await(() => findOne(users, qry));

            if (mUser.isNothing()) {

                r.session.error = ERROR_AUTH_FAILED;

                return redirect('/login', 303);

            }

            let user = mUser.get();

            let didMatch = yield await(() => compare(password, user.password));

            if (didMatch) {

                //regenerate the session to start a fresh.
                yield await(() => fromCallback(cb => r.session.regenerate(cb)));

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
export const logout = (req: Request): ActionM<undefined> =>
    doN(<DoFn<undefined, ActionM<undefined>>>function*() {

        let r = <SessionRequest>req;

        if (r.session != null)
            yield await(() => fromCallback(cb => r.session.destroy(cb)));

        return redirect('/', 302);

    });

/**
 * createJob
 *
 * Operates simllar to createEmployer except we are creating a job.
 * This handler is meant to be used by the dashboard's client side application.
 * The responses are in JSON.
 */
export const createJob = (r: Request): ActionM<undefined> =>
    doN(<DoFn<undefined, ActionM<undefined>>>function*() {

        let eResult = yield await(() => checkJob(r.body));

        if (eResult.isRight()) {

            let data = eResult.takeRight();

            let db = yield getMain();

            let collection = db.collection('jobs');

            data.employer = (<SessionRequest>r).session.user;

            yield await(() => insertOne(collection, data));

            return created({ id: data.id });

        } else {

            return conflict(eResult.takeLeft().explain());

        }

    })

/**
 * showProfile
 *
 * gets and id, then gets the jobs collection from the
 * database. Then searches through the jobs collection for
 * a job where the job's id is the same as the previously collected id
 * and displays the information related to that job.
 */
export const showProfile = (r: Request): ActionM<undefined> =>
    doN(<DoFn<undefined, ActionM<undefined>>>function*() {

        let id = r.params.id;

        let db = yield getMain();

        let collection = db.collection('jobs');

        let mResult = yield await(() => findOne(collection, { id: id }));

        if (mResult.isNothing())
            return show('errors/not-found.html', {}, 404);
        else
            return show('jobs/profile.html', { job: mResult.get() });

    })

/**
 * showJobs
 *
 * shows the recent 30 posts from the database to visitors of the site.
 */
export const showJobs = (_: Request): ActionM<undefined> =>
    doN(<DoFn<undefined, ActionM<undefined>>>function*() {

        let db = yield getMain();

        let collection = db.collection('jobs');

        let mResult = yield await(() => find(collection, {}, { sort: { created_at: -1 }, limit: 30 }));

        let jobs = mResult.isNothing() ? [] : mResult.get();

        return show('index.html', { jobs: jobs });

    });

/**
 * showPostJobPage displays the form for creating new posts on a new
 * page.
 */
export const showPostJobPage = (_: Request): ActionM<undefined> =>
    doN(<DoFn<undefined, ActionM<undefined>>>function*() {

        return show('post-form.html', {});

    });

//retrieves the main connection from the tendril pool.
const getMain = (): ActionM<mongodb.Db> => checkout('main');
