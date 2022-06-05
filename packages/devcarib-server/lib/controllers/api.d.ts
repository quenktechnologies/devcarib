import * as mongo from 'mongodb';
import { Object } from '@quenk/noni/lib/data/jsonx';
import { Request } from '@quenk/tendril/lib/app/api/request';
import { Action } from '@quenk/tendril/lib/app/api';
import { BaseResource, DefaultParamsFactory, GetParams, RemoveParams, SearchParams, UpdateParams } from '@quenk/dback-resource-mongodb';
import { Model } from '@quenk/dback-model-mongodb';
/**
 * QueryParams provides the additional parameters for the _SUGR operations.
 *
 * These methods rely on the compileSearchTag and compileQueryTag filters and
 * should not be used without them installed!
 */
export declare class QueryParams extends DefaultParamsFactory {
    search(req: Request): SearchParams;
    update({ query }: Request): UpdateParams;
    get(req: Request): GetParams;
    remove({ query }: Request): RemoveParams;
}
/**
 * ApiController provides a default implementation of the dback mongodb
 * resource.
 *
 * It uses [[QueryParams]] to supply search params by default and should only
 * be used with the appropriate filters installed.
 */
export declare class ApiController<T extends Object> extends BaseResource<T> {
    modelGetter: (db: mongo.Db) => Model<T>;
    conn: string;
    constructor(modelGetter: (db: mongo.Db) => Model<T>, conn?: string);
    params: QueryParams;
    getModel(db: mongo.Db): Model<T>;
    /**
     * increment a counter property on the target record identified by
     * `req.param.id`.
     */
    increment: (req: Request, key: string) => Action<void>;
}
