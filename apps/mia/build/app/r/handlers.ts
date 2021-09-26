import * as mongodb from 'mongodb';
import * as prs from '@quenk/tendril/lib/app/api/storage/prs';
import * as session from '@quenk/tendril/lib/app/api/storage/session';
import * as adminChecks from '@board/checks/lib/admin';

import { isString } from '@quenk/noni/lib/data/type';
import { escape } from '@quenk/noni/lib/data/string/regex';
import { Object, Value } from '@quenk/noni/lib/data/jsonx';

import { conflict, forbidden } from '@quenk/tendril/lib/app/api/response';
import { Request } from '@quenk/tendril/lib/app/api/request';
import { Action, doAction } from '@quenk/tendril/lib/app/api';
import { value, fork, abort } from '@quenk/tendril/lib/app/api/control';

import { Precondition } from '@quenk/preconditions/lib/async';

import {
    BaseResource,
    KEY_SEARCH_PARAMS
} from '@quenk/dback-resource-mongodb';

import { BaseModel } from '@quenk/dback-model-mongodb';

import { Job } from '@board/types/lib/job';
import { Admin } from '@board/types/lib/admin';

import { check, checkPartial } from '@board/checks/lib/job';

const messages = {

    minLength: '{$key} must be {target} or more characters!',

    maxLength: '{$key} must be less than {target} characters!',

    notNull: '{$key} is required!'

};

/**
 * PostModel
 */
export class PostModel extends BaseModel<Job> {

    id = 'id';

    static getInstance(db: mongodb.Db): PostModel {

        return new PostModel(db, db.collection('posts'));

    }

}

/**
 * AdminModel
 */
export class AdminModel extends BaseModel<Admin> {

    id = 'id';

    static getInstance(db: mongodb.Db): AdminModel {

        return new AdminModel(db, db.collection('admins'));

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

            }

            r.body = eBody.takeRight();

            return value(r);

        });

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

    getModel(db: mongodb.Db): PostModel {

        return PostModel.getInstance(db);

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

export const jobCtrl = new JobsController();
export const adminsCtrl = new AdminsController();
