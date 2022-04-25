import { Object } from '@quenk/noni/lib/data/jsonx';
import { isNumber, isString } from '@quenk/noni/lib/data/type';
import { Record } from '@quenk/noni/lib/data/record';
import { Except } from '@quenk/noni/lib/control/error';
import { left, right } from '@quenk/noni/lib/data/either';
import { interpolate } from '@quenk/noni/lib/data/string';

import { Action, doAction } from '@quenk/tendril/lib/app/api';
import { Request } from '@quenk/tendril/lib/app/api/request';
import { abort, next } from '@quenk/tendril/lib/app/api/control';
import { badRequest, error } from '@quenk/tendril/lib/app/api/response';

import { sanitize } from '@quenk/search-filters';

import {
    EnabledPolicies,
    MongoDBFilterCompiler
} from '@quenk/search-filters-mongodb';
import { unsafeGet } from '@quenk/noni/lib/data/record/path';

const DEFAULT_PAGE_SIZE = 100;

/**
 * CompileQueryTagConf provies the configuration for compileQueryTag().
 */
export interface CompileQueryTagConf {

    /**
     * policies is a Record of all filter policies used by the app for reach
     * target route.
     */
    policies: Record<EnabledPolicies>

}

/**
 * CompileSearchTagConf provies the configuration for compileSearchTag().
 */
export interface CompileSearchTagConf extends CompileQueryTagConf {

    /**
     * fields is a Record of all mongodb project specifiers used by the app for
     * each target route.
     */
    fields: Record<Record<number>>

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
 * compile combines the compileSearchTag, compileQueryTag and compileGetTag into
 * one filter.
 */
export const compile =
    (conf: CompileSearchTagConf) => (req: Request): Action<void> => {

        if (req.method === 'GET') {

            if (req.route.tags.search)
                return compileSearchTag(conf)(req);
            else if (req.route.tags.get)
                return compileGetTag(conf)(req);

        } else if ((req.method === 'PATCH') || (req.method === 'DELETE')) {

            return compileQueryTag(conf)(req);

        }

        return next(req);

    }

/**
 * compileSearchTag shapes the query parameters of an incoming search request so
 * they can be used in a mongodb query.
 *
 * This filter relies on the +search tag to determine the correct
 * policy and fields from the provided configuration to use. The configuration
 * should therefore have them under the same name.
 *
 * Additional restrictions can be placed on the parsed query via the +query
 * tag which will be interpolated against the request then parsed into a
 * separate filter which is finally combined with the user query via $and.
 *
 * This can be taken advantage of to restrict the scope of user submitted
 * queries easily.
 */
export const compileSearchTag =
    (conf: CompileSearchTagConf) => (req: Request): Action<void> =>
        doAction(function*() {

            if ((req.method !== 'GET') || (req.route.tags.get)) return next(req);

            let ptr = <string>req.route.tags.search;

            if (!ptr) {

                req.query = {};

                return next(req);

            }

            let policy = conf.policies[ptr];

            if (!policy) {

                yield error(new Error('ERR_NO_POLICY'));

                abort();

            }

            let filters = <string>req.route.tags.query;

            let page = Number(req.query.page);

            page = isNumber(page) ? page : 1;

            let limit = Number(req.query.limit);

            limit = isNumber(limit) ? limit :                DEFAULT_PAGE_SIZE;

            let mQuery = compileQueryString(policy, <string>req.query.q);

            if (mQuery.isLeft()) {

                yield badRequest({ error: 'ERR_BAD_QUERY' });

                return abort();

            }

            let query = mQuery.takeRight();

            if (filters) {

                let mAdditionalQuery = compileQueryString(policy,
                    expandTemplate(req, filters));

                if (mAdditionalQuery.isLeft()) {

                    yield error(new Error('ERR_QUERY_MISCONFIGURED'));

                    return abort();

                }

                query = { $and: [mAdditionalQuery.takeRight(), query] };

            }

            let fields = <Object>conf.fields[ptr];

            if (!fields) {

                yield error(new Error('ERR_NO_FIELDS'));

                return abort();

            }

            let sort = compileSortString(<{ [key: string]: number }>fields,
                <string>req.query.sort);

            req.query = { query, page, limit, sort, fields }

            return next(req);

        })

/**
 * compileQueryTag compiles the string specified in the +query tag into the
 * request.query property for PATCH and DELETE requests for routes it is
 * configured for.
 *
 * It uses the +policy or +model tags to determine which policy to use
 * The +query value is first interpolated with the Request object.
 */
export const compileQueryTag =
    (conf: CompileQueryTagConf) => (req: Request): Action<void> =>
        doAction(function*() {

            if ((req.method !== 'PATCH') && (req.method !== 'DELETE'))
                return next(req);

            req.query = {}; // Clear any user supplied query.

            let filters = <string>req.route.tags.query;

            if (!filters) return next(req);

            let ptr = <string>(req.route.tags.policy || req.route.tags.model);

            let policy = conf.policies[ptr];

            if (!policy) {

                yield error(new Error('ERR_NO_POLICY'));

                return abort();

            }

            let mQuery = compileQueryString(policy,
                expandTemplate(req, filters));

            if (mQuery.isLeft()) {

                console.error(mQuery.takeLeft());

                yield error(new Error('ERR_BAD_QUERY_CONF'));

                return abort();

            }

            req.query = mQuery.takeRight();

            return next(req);

        })

/**
 * compileGetTag shapes the query parameters of an incoming get request so
 * it can be used in a mongodb query.
 *
 * This filter relies on the +get tag to determine the correct field set to set
 * the query.fields property to. A query filter can optionally be specified via
 * the +query parameter which will be parsed and set to query.query if
 * successful.
 *
 * The +get value is first interpolated with the Request object.
 */
export const compileGetTag =
    (conf: CompileSearchTagConf) => (req: Request): Action<void> =>
        doAction(function*() {

            if ((req.method !== 'GET') || (req.route.tags.search))
                return next(req);

            req.query = {}; // Clear any user supplied queries.

            let ptr = <string>req.route.tags.get;

            let fields = conf.fields[ptr];

            if (!ptr) return next(req);

            if (!fields) {

                yield error(new Error('ERR_NO_FIELDS'));

                return abort();

            }

            let filters = <string>req.route.tags.query;

            let query = {};

            if (filters) {

                let policy = conf.policies[ptr];

                if (!policy) {

                    yield error(new Error('ERR_NO_POLICY'));

                    return abort();

                }

                let mquery = compileQueryString(policy,
                    expandTemplate(req, filters));

                if (mquery.isLeft()) {

                    yield error(new Error('ERR_QUERY_MISCONFIGURED'));

                    return abort();

                }

                query = mquery.takeRight();

            }

            req.query = { query, fields }

            return next(req);

        })

const expandTemplate = (req: Request, str: string) =>
    interpolate(str, req, {

        transform: sanitize,

        getter: (_, key) => {

            let paths = key.split('.');

            return <string>((paths[0] === 'session') ?
                req.session.getOrElse(paths.slice(1).join('.'), '') :
                unsafeGet(key, <any>req));

        }

    })
