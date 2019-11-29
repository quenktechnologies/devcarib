import * as mongodb from 'mongodb';
import * as bcryptjs from 'bcryptjs';
import { insertOne, findOne } from '@quenk/safe-mongodb/lib/database/collection';
import { show, redirect, created, conflict } from '@quenk/tendril/lib/app/api/action/response';
import { await } from '@quenk/tendril/lib/app/api/action/control';
import { checkout } from '@quenk/tendril/lib/app/api/action/pool';
import { ActionM } from '@quenk/tendril/lib/app/api/action';
import { Request } from '@quenk/tendril/lib/app/api/request';
import { DoFn, doN } from '@quenk/noni/lib/control/monad';
import { check } from '@board/checks/lib/employer';
import { check as checkJob } from '@board/checks/lib/job';
import { isRecord } from '@quenk/noni/lib/data/record';
import { fromCallback } from '@quenk/noni/lib/control/monad/future';

interface SessionRequest extends Request {

    session: any

}

/**
 * showIndex of the site.
 */
export const showIndex = (r: Request): ActionM<undefined> => {

    let req = <SessionRequest>r;
    console.error(req.session);
    if (req.session.user == null) {

        return redirect('/login', 302);

    } else {

        return redirect('/dashboard', 302);

    }

}

/**
 * showRegistrationForm displays the employer regisration form.
 */
export const showRegistrationForm = (_: Request): ActionM<undefined> =>
    show('employer/registration/form.html', {});


export const showDashboard = (_: Request): ActionM<undefined> =>
    show('dashboard.html', {});

/**
 * showLoginForm displays the user login form.
 */
export const showLoginForm = (_: Request): ActionM<undefined> =>
    show('login.html', {});

/**
 *   createEmployer creates the employer after registration.
*/
export const createEmployer = (r: Request): ActionM<undefined> =>
    doN(<DoFn<undefined, ActionM<undefined>>>function*() {

        let eResult = yield await(() => check(r.body));

        if (eResult.isRight()) {

            let data = eResult.takeRight();

            let db: mongodb.Db = yield checkout('main');

            let collection = db.collection('users');

            yield await(() => insertOne(collection, data));

            return redirect('/login', 302);

        } else {

            console.log(eResult.takeLeft().explain());

            return redirect('/', 302);

        }

    })

export const authenticate = (r: Request): ActionM<undefined> =>
    doN(<DoFn<undefined, ActionM<undefined>>>function*() {

        if (isRecord(r.body)) {

            let email = r.body.email;

            let password = <string>r.body.password;

            let db: mongodb.Db = yield checkout('main');

            let users = db.collection('users');

            let qry = { email };

            let mUser = yield await(() => findOne(users, qry));

            if (mUser.isNothing())
                return redirect('/login', 302);

            let user = mUser.get();

            let didMatch = yield await(() => compare(password, user.password));

            if (didMatch) {

                (<SessionRequest>r).session.user = user.id;

                return redirect('/dashboard', 302);

            } else {

                return redirect('/login', 302);

            }

        } else {

            return redirect('/login', 302);

        }
    })

const compare = (pwd: string, hash: string) =>
    fromCallback(cb => bcryptjs.compare(pwd, hash, cb));

/**
 * logout the user from the system.
 *
 * Clears the session property.
 */
export const logout = (r: Request): ActionM<undefined> => {

    (<SessionRequest>r).session = {};

    return redirect('/', 302);

}

export const createJob = (r: Request): ActionM<undefined> =>
    doN(<DoFn<undefined, ActionM<undefined>>>function*() {

        let eResult = yield await(() => checkJob(r.body));

        if (eResult.isRight()) {

            let data = eResult.takeRight();

            let db: mongodb.Db = yield checkout('main');

            let collection = db.collection('jobs');

            data.employer = (<SessionRequest>r).session.user;

            yield await(() => insertOne(collection, data));

            return created();

        } else {

            return conflict(eResult.takeLeft().explain());

        }

    })
