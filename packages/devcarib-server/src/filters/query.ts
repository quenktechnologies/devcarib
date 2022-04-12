import { Object } from '@quenk/noni/lib/data/jsonx';
import { isNumber, isString } from '@quenk/noni/lib/data/type';
import { Record } from '@quenk/noni/lib/data/record';
import { Except } from '@quenk/noni/lib/control/error';
import { left, right } from '@quenk/noni/lib/data/either';
import { interpolate } from '@quenk/noni/lib/data/string';

import { Action, doAction } from '@quenk/tendril/lib/app/api';
import { Request } from '@quenk/tendril/lib/app/api/request';
import { abort, next } from '@quenk/tendril/lib/app/api/control';
import { badRequest } from '@quenk/tendril/lib/app/api/response';

import { sanitize } from '@quenk/search-filters';

import {
    EnabledPolicies,
    MongoDBFilterCompiler
} from '@quenk/search-filters-mongodb';

import {
    DefaultParamsFactory,
    SearchParams
} from '@quenk/dback-resource-mongodb';

const DEFAULT_PAGE_SIZE = 100;

/**
 * CompileQueryConf provies the configuration for compile().
 */
export interface CompileQueryConf {

    /**
     * policies is a Record of all filter policies used by the app for reach
     * target route.
     */
    policies: Record<EnabledPolicies>

    /**
     * fields is a Record of all mongodb project specifiers used by the app for
     * each target route.
     */
    fields: Record<Record<number>>

}

/**
 * QueryParams provides the additional parameters for the _SUGR operations.
 */
export class QueryParams extends DefaultParamsFactory {

    /**
     * search relies on the results of the compile filter to shape the query
     * property properly.
     *
     * This should NOT be used without the filter installed!
     */
    search(req: Request) {

        return <SearchParams><object>req.query;

    }

}

const mfc = new MongoDBFilterCompiler();

/**
 * compileQueryString compiles the "q" query parameter into a filter object that
 * can be used with mongodb queries.
 *
 * Works via the @quenk/search-filters-mongodb module.
 */
export const compileQueryString = (policies: EnabledPolicies, q: string)
    : Except<Object> => {

    if (!isString(q) || q === '') return right({});

    let ret = mfc.compile(policies, q);

    if (ret.isLeft())
        return left(new Error(`compileQueryString: ${ret.takeLeft()}`));

    let o = ret.takeRight();

    return right(o);

}

/**
 * compileSortString turns a sort indicator string into an object that could be
 * used in a mongodb query.
 *
 * Only one field can be sorted on at a time and it must be in the policy ref
 * document provided.
 */
export const compileSortString = (refs: { [key: string]: number }, sort: string)
    : Object => {

    if (!isString(sort) || sort === '') return {};

    let key: string = sort;
    let dir = (key[0] === '-') ? -1 : 1;

    key = ((key[0] === '+') || (key[0] === '-')) ? key.slice(1) : key;

    if (!refs.hasOwnProperty(key)) return {};

    return { [key]: dir };

}

/**
 * compile shapes the query parameters of an incomming request so they can
 * be used in a mongodb query.
 *
 * This filter relies on the +policy tag being set to determine the correct
 * policy and fields document to use. Note that they must have the same value.
 *
 * Additional restrictions can be placed on the parsed query via the +query
 * tag which will be interpolated against the request then parsed into a
 * separate filter. This filter will be included via $and to ensure it's
 * conditions are met when executing a query.
 *
 * Use this to restrict the scope of user submitted queries.
 */
export const compile = (conf: CompileQueryConf) =>
    (req: Request): Action<void> => doAction(function*() {

        if (req.method !== 'GET') return next(req);

        let ptr = <string>req.route.tags.policy;

        let additionalFilters = <string>req.route.tags.query;

        let policy = conf.policies[ptr];

        if (!policy && !additionalFilters) {

            // Do not allow the parsed query object to be used if there are no
            // policies.
            req.query = {};

            return next(req);

        }

        let page = isNumber(req.query.page) ? req.query.page : 1;

        let limit = isNumber(req.query.limit) ?
            req.query.limit :
            DEFAULT_PAGE_SIZE;

        let mQuery = compileQueryString(policy, <string>req.query.q);

        if (mQuery.isLeft()) {

            yield badRequest({ error: 'ERR_BAD_QUERY' });

            return abort();

        }

        let query = mQuery.takeRight();

        if (additionalFilters) {

            let mAdditionalQuery = compileQueryString(policy,
                interpolate(additionalFilters, req, { transform: sanitize }));

            if (mAdditionalQuery.isLeft()) {
                console.error('--> ', conf,ptr,policy, mAdditionalQuery.takeLeft());
                yield badRequest({ error: 'ERR_QUERY_MISCONFIGURED' });

                return abort();

            }

            query = { $and: [mAdditionalQuery.takeRight(), query] };

        }

        let fields = <Object>conf.fields[ptr];

        if (!fields) {

            yield badRequest();

            return abort();

        }

        let sort = compileSortString(<{ [key: string]: number }>fields,
            <string>req.query.sort);

        req.query = { query, page, limit, sort, fields }

        return next(req);

    })
