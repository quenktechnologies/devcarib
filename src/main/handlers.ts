import * as mongodb from 'mongodb';
import { insertOne } from '@quenk/safe-mongodb/lib/database/collection';
import { show, redirect } from '@quenk/tendril/lib/app/api/action/response';
import { await } from '@quenk/tendril/lib/app/api/action/control';
import { checkout } from '@quenk/tendril/lib/app/api/action/pool';
import { ActionM } from '@quenk/tendril/lib/app/api/action';
import { Request } from '@quenk/tendril/lib/app/api/request';
import { DoFn, doN } from '@quenk/noni/lib/control/monad';
import { check } from './checks/employer';

/**
 * showForm displays the employer regisration form.
 */
export const showForm = (_: Request): ActionM<undefined> =>
    show('employer/registration/form.html', {});

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

            return redirect('/dashboard', 302);

        } else {

            console.log(eResult.takeLeft().explain());

            return redirect('/', 302);

        }

    })
