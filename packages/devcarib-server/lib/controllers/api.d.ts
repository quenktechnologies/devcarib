import * as mongo from 'mongodb';
import { Object } from '@quenk/noni/lib/data/jsonx';
import { BaseResource } from '@quenk/dback-resource-mongodb';
import { Model } from '@quenk/dback-model-mongodb';
import { QueryParams } from '../filters/query';
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
}
