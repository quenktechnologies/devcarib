import * as devcaribServerLibFiltersQuery from '@devcarib/server/lib/filters/query'; 
import * as miaFilterPolicies from '@mia/filter-policies'; 
import * as miaFields from '@mia/fields'; 
//@ts-ignore: 6133
import {System} from '@quenk/potoo/lib/actor/system';
//@ts-ignore: 6133
import * as _json from '@quenk/noni/lib/data/jsonx';
//@ts-ignore: 6133
import {Template} from '@quenk/tendril/lib/app/module/template';
//@ts-ignore: 6133
import {Module} from '@quenk/tendril/lib/app/module';
//@ts-ignore: 6133
import {Request} from '@quenk/tendril/lib/app/api/request;'
//@ts-ignore: 6133
import {RouteConf as $RouteConf} from '@quenk/tendril/lib/app/module';
import {App as App} from '@quenk/tendril/lib/app';



import * as mongodb from 'mongodb';
import * as prs from '@quenk/tendril/lib/app/api/storage/prs';
import * as session from '@quenk/tendril/lib/app/api/storage/session';
import * as adminChecks from '@mia/checks/lib/admin';
import * as usersChecks from '@mia/checks/lib/user';

import { isString } from '@quenk/noni/lib/data/type';
import { escape } from '@quenk/noni/lib/data/string/regex';
import { Object, Value } from '@quenk/noni/lib/data/jsonx';
import { Future, pure } from '@quenk/noni/lib/control/monad/future';

import { conflict, forbidden } from '@quenk/tendril/lib/app/api/response';
/* @ts-ignore: 2300 */
import { Request } from '@quenk/tendril/lib/app/api/request';
import { Action, doAction } from '@quenk/tendril/lib/app/api';
import { value, fork, abort } from '@quenk/tendril/lib/app/api/control';

import { Precondition } from '@quenk/preconditions/lib/async';

import {
    BaseResource,
    DefaultParamsFactory,
    KEY_SEARCH_PARAMS,
    SearchParams
} from '@quenk/dback-resource-mongodb';

import { Job } from '@mia/types/lib/job';
import { User } from '@mia/types/lib/user';

import { AdminModel } from '@mia/models/lib/admin';
import { JobModel } from '@mia/models/lib/job';
import { UserModel } from '@mia/models/lib/user';

import { check, checkPartial } from '@mia/checks/lib/job';

const messages = {

    minLength: '{$key} must be {target} or more characters!',

    maxLength: '{$key} must be less than {target} characters!',

    notNull: '{$key} is required!'

};

/**
 * QueryParams provides the additional parameters for the _SUGR operations.
 */
export class QueryParams extends DefaultParamsFactory {

    /**
     * search relies on the @devcarib/server/lib/filters/query#compile filter
     * to shape the query property properly.
     *
     * This should NOT be used without that middleware.
     */
    search(req: Request) {

        return <SearchParams><object>req.query;

    }

}

/**
 * BaseController for admin routes.
 */
export abstract class BaseController<T extends Object>
    extends
    BaseResource<T> {

    /**
     * messages used in the explanation of Precondition Failures.
     */
    abstract messages: object;

    /**
     * checkCreate is applied to the body before creating new <T> records.
     */
    abstract checkCreate: Precondition<Value, T>;

    /**
     * checkUpdate is applied to the body before update an existing <T> record.
     */
    abstract checkUpdate: Precondition<Value, T>;

    /**
     * beforeSearch must be implemented to properly setup searches.
     */
    abstract beforeSearch(r: Request): Action<Request>;

    params = new QueryParams();

    /**
     * before ensures the client has permission to access this api.
     */
    before(r: Request): Action<Request> {

        return doAction(function*() {

            let madmin = yield session.get('admin');

            if (madmin.isNothing()) {

                yield forbidden();

                yield abort();

            }

            return value(r);

        });

    }

    /**
     * beforeCreate validates the request body before updating.
     */
    beforeCreate(r: Request): Action<Request> {

        let that = this;

        return doAction(function*() {

            let eBody = yield fork(that.checkCreate(r.body));

            if (eBody.isLeft()) {

                let errors = eBody.takeLeft().explain(that.messages);

                yield conflict({ errors });

                yield abort();

            } else {

                r.body = yield fork(that.afterCreateChecked(eBody.takeRight()));

            }

            return value(r);

        });

    }

    /**
     * afterCreateChecked is a hook that allows the validated and check data
     * to be modified one last time before it used to create a new record.
     */
    afterCreateChecked(data: T): Future<T> {

        return pure(data);

    }

    /**
     * beforeUpdate validates the request body before updating.
     */
    beforeUpdate(r: Request): Action<Request> {

        let that = this;

        return doAction(function*() {

            let eBody = yield fork(that.checkUpdate(r.body));

            if (eBody.isLeft()) {

                let errors = eBody.takeLeft().explain(that.messages);

                yield conflict({ errors });

                yield abort();

            }

            r.body = eBody.takeRight();

            return value(r);

        });

    }

}

/**
 * AdminsController provides the handlers for the /admin/r/admins routes.
 */
export class AdminsController extends BaseController<Job> {

    messages = messages;

    checkCreate = adminChecks.check;

    checkUpdate = adminChecks.checkPartial;

    getModel(db: mongodb.Db): AdminModel {

        return AdminModel.getInstance(db);

    };

    beforeSearch(r: Request): Action<Request> {

        return doAction(function*() {

            let qry: Object = {};

            if (isString(r.query.q)) {

                let filter = { $regex: escape(r.query.q), $options: 'i' };

                qry = { email: filter };

            }

            yield prs.set(`${KEY_SEARCH_PARAMS}.query`, qry);

            return value(r);

        });

    }

}

/**
 * JobsController provides the handlers for the /admin/r/jobs routes.
 */
export class JobsController extends BaseController<Job> {

    messages = messages;

    checkCreate = check;

    checkUpdate = checkPartial;

    getModel(db: mongodb.Db): JobModel {

        return JobModel.getInstance(db);

    }

    beforeSearch(r: Request): Action<Request> {

        return doAction(function*() {

            let qry: Object = {};

            if (isString(r.query.q)) {

                let filter = { $regex: escape(r.query.q), $options: 'i' };

                qry = { $or: [{ title: filter }, { company: filter }] };

            }

            yield prs.set(`${KEY_SEARCH_PARAMS}.query`, qry);

            return value(r);

        });

    }

}

/**
 * UsersController for the users endpoint.
 */
export class UsersController extends BaseController<User> {

    messages = messages;

    checkCreate = usersChecks.check;

    checkUpdate = usersChecks.checkPartial;

    getModel(db: mongodb.Db): UserModel {

        return UserModel.getInstance(db);

    }

    beforeSearch(r: Request): Action<Request> {

        return doAction(function*() {

            let qry: Object = {};

            if (isString(r.query.q)) {

                let filter = { $regex: escape(r.query.q), $options: 'i' };

                qry = { username: filter };

            }

            yield prs.set(`${KEY_SEARCH_PARAMS}.query`, qry);

            return value(r);

        });

    }

}

//@ts-ignore: 6133
export const template = ($app: App): Template => (
 {'id': `r`,
'app': {'dirs': {'self': `/apps/mia/build/r`},
'filters': [devcaribServerLibFiltersQuery.compile({'policies': miaFilterPolicies.policiesEnabled,
'fields': miaFields.fields})],
'routes': //@ts-ignore: 6133
($module:Module) => {

let $routes:$RouteConf[] = [];
let adminsCtrl = new AdminsController();
let jobsCtrl = new JobsController();
let usersCtrl = new UsersController();

$routes.push({
method:'post',
path:'/admins',
filters:[adminsCtrl.create.bind(adminsCtrl)],tags:{}});

$routes.push({
method:'get',
path:'/admins',
filters:[adminsCtrl.search.bind(adminsCtrl)],tags:{policy: `admin` }});

$routes.push({
method:'get',
path:'/admins/:id',
filters:[adminsCtrl.get.bind(adminsCtrl)],tags:{}});

$routes.push({
method:'patch',
path:'/admins/:id',
filters:[adminsCtrl.update.bind(adminsCtrl)],tags:{}});

$routes.push({
method:'delete',
path:'/admins/:id',
filters:[adminsCtrl.remove.bind(adminsCtrl)],tags:{}});

$routes.push({
method:'post',
path:'/jobs',
filters:[jobsCtrl.create.bind(jobsCtrl)],tags:{}});

$routes.push({
method:'get',
path:'/jobs',
filters:[jobsCtrl.search.bind(jobsCtrl)],tags:{policy: `job` }});

$routes.push({
method:'patch',
path:'/jobs/:id',
filters:[jobsCtrl.update.bind(jobsCtrl)],tags:{}});

$routes.push({
method:'get',
path:'/jobs/:id',
filters:[jobsCtrl.get.bind(jobsCtrl)],tags:{}});

$routes.push({
method:'delete',
path:'/jobs/:id',
filters:[jobsCtrl.remove.bind(jobsCtrl)],tags:{}});

$routes.push({
method:'post',
path:'/users',
filters:[usersCtrl.create.bind(usersCtrl)],tags:{}});

$routes.push({
method:'get',
path:'/users',
filters:[usersCtrl.search.bind(usersCtrl)],tags:{policy: `user` }});

$routes.push({
method:'patch',
path:'/users/:id',
filters:[usersCtrl.update.bind(usersCtrl)],tags:{}});

$routes.push({
method:'get',
path:'/users/:id',
filters:[usersCtrl.get.bind(usersCtrl)],tags:{}});

$routes.push({
method:'delete',
path:'/users/:id',
filters:[usersCtrl.remove.bind(usersCtrl)],tags:{}});
return $routes;
}},
'create': 
//@ts-ignore: 6133 
(s:System) => new Module(<App>s)})
