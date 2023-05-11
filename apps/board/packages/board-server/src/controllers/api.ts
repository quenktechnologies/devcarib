import * as mongo from 'mongodb';

import { Object } from '@quenk/noni/lib/data/jsonx';

import { Request } from '@quenk/tendril/lib/app/api/request';
import { Action, doAction } from '@quenk/tendril/lib/app/api';
import { checkout } from '@quenk/tendril/lib/app/api/pool';
import { fork, next } from '@quenk/tendril/lib/app/api/control';

import {
    BaseResource,
    DefaultParamsFactory,
    GetParams,
    RemoveParams,
    SearchParams,
    UpdateParams
} from '@quenk/dback-resource-mongodb';

import { Model } from '@quenk/dback-model-mongodb';

/**
 * QueryParams provides the additional parameters for the _SUGR operations.
 *
 * These methods rely on the compileSearchTag and compileQueryTag filters and
 * should not be used without them installed!
 */
export class QueryParams extends DefaultParamsFactory {

    search(req: Request) {

        return <SearchParams><object>req.query;

    }

    update({ query }: Request) {

        return <UpdateParams><object>{ changes: {}, query };

    }

    get(req: Request) {

        return <GetParams><object>req.query;

    }

    remove({ query }: Request) {

        return <RemoveParams><object>{ query };

    }

}

/**
 * ApiController provides a default implementation of the dback mongodb
 * resource.
 *
 * It uses [[QueryParams]] to supply search params by default and should only
 * be used with the appropriate filters installed.
 */
export class ApiController<T extends Object>
    extends
    BaseResource<T> {

    constructor(
        public modelGetter: (db: mongo.Db) => Model<T>,
        public conn: string = 'main'
    ) { super(conn); }

    params = new QueryParams();

    getModel(db: mongo.Db): Model<T> {

        return this.modelGetter(db);

    }

    /**
     * increment a counter property on the target record identified by
     * `req.param.id`.
     */
    increment = (req: Request, key:string): Action<void> => {

        let that = this;

        return doAction(function*() {

            let db = yield checkout(that.conn);

            let model = that.getModel(db);

            yield fork(model.unsafeUpdate({ id: Number(req.params.id) },
                { $inc: { [key]: 1 } }));

            return next(req);

        });

    }

}
