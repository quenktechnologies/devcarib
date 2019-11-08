import * as mongodb from 'mongodb';
import { insertOne } from '@quenk/safe-mongodb/lib/database/collection';
import { show, redirect } from '@quenk/tendril/lib/app/api/action/response';
import { await } from '@quenk/tendril/lib/app/api/action/control';
import { checkout } from '@quenk/tendril/lib/app/api/action/pool';
import { ActionM } from '@quenk/tendril/lib/app/api/action';
import { Request } from '@quenk/tendril/lib/app/api/request';
import { DoFn, doN } from '@quenk/noni/lib/control/monad';
import { isObject } from '@quenk/noni/lib/data/type';

/**
 * showForm displays the employer regisration form.
 */
export const showForm = (_: Request): ActionM<undefined> =>
    show('employer/registration/form.html', {});

/**
 *   createEmployer creates the employer after registration.
*/
export const createEmployer = (r: Request): ActionM<undefined> =>
    doN(<DoFn<undefined, ActionM<undefined>>>function*() {

        if (isObject(r.body)) {

            let data = r.body;

            let db: mongodb.Db = yield checkout('main');

            let collection = db.collection('employers');

            yield await(() => insertOne(collection, data));

            return redirect('/dashboard', 302);

        } else {

            return redirect('/', 302);

        }

    })
