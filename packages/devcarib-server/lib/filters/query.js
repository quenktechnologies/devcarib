"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileGetTag = exports.compileQueryTag = exports.compileSearchTag = exports.compile = exports.compileSortString = exports.compileQueryString = void 0;
const type_1 = require("@quenk/noni/lib/data/type");
const either_1 = require("@quenk/noni/lib/data/either");
const string_1 = require("@quenk/noni/lib/data/string");
const api_1 = require("@quenk/tendril/lib/app/api");
const control_1 = require("@quenk/tendril/lib/app/api/control");
const response_1 = require("@quenk/tendril/lib/app/api/response");
const search_filters_1 = require("@quenk/search-filters");
const search_filters_mongodb_1 = require("@quenk/search-filters-mongodb");
const path_1 = require("@quenk/noni/lib/data/record/path");
const DEFAULT_PAGE_SIZE = 100;
const mfc = new search_filters_mongodb_1.MongoDBFilterCompiler();
/**
 * compileQueryString compiles the "q" query parameter into a filter object that
 * can be used with mongodb queries.
 *
 * Works via the @quenk/search-filters-mongodb module.
 */
const compileQueryString = (policies, q) => {
    if (!(0, type_1.isString)(q) || q === '')
        return (0, either_1.right)({});
    let ret = mfc.compile(policies, q);
    if (ret.isLeft())
        return (0, either_1.left)(new Error(`compileQueryString: ${ret.takeLeft()}`));
    let o = ret.takeRight();
    return (0, either_1.right)(o);
};
exports.compileQueryString = compileQueryString;
/**
 * compileSortString turns a sort indicator string into an object that could be
 * used in a mongodb query.
 *
 * Only one field can be sorted on at a time and it must be in the policy ref
 * document provided.
 */
const compileSortString = (refs, sort) => {
    if (!(0, type_1.isString)(sort) || sort === '')
        return {};
    let key = sort;
    let dir = (key[0] === '-') ? -1 : 1;
    key = ((key[0] === '+') || (key[0] === '-')) ? key.slice(1) : key;
    if (!refs.hasOwnProperty(key))
        return {};
    return { [key]: dir };
};
exports.compileSortString = compileSortString;
/**
 * compile combines the compileSearchTag, compileQueryTag and compileGetTag into
 * one filter.
 */
const compile = (conf) => (req) => {
    if (req.method === 'GET') {
        if (req.route.tags.search)
            return (0, exports.compileSearchTag)(conf)(req);
        else if (req.route.tags.get)
            return (0, exports.compileGetTag)(conf)(req);
    }
    else if ((req.method === 'PATCH') || (req.method === 'DELETE')) {
        return (0, exports.compileQueryTag)(conf)(req);
    }
    return (0, control_1.next)(req);
};
exports.compile = compile;
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
const compileSearchTag = (conf) => (req) => (0, api_1.doAction)(function* () {
    if ((req.method !== 'GET') || (req.route.tags.get))
        return (0, control_1.next)(req);
    let ptr = req.route.tags.search;
    if (!ptr) {
        req.query = {};
        return (0, control_1.next)(req);
    }
    let policy = conf.policies[ptr];
    if (!policy) {
        yield (0, response_1.error)(new Error('ERR_NO_POLICY'));
        (0, control_1.abort)();
    }
    let filters = req.route.tags.query;
    let page = Number(req.query.page);
    page = (0, type_1.isNumber)(page) ? page : 1;
    let limit = Number(req.query.limit);
    limit = (0, type_1.isNumber)(limit) ? limit : DEFAULT_PAGE_SIZE;
    let mQuery = (0, exports.compileQueryString)(policy, req.query.q);
    if (mQuery.isLeft()) {
        yield (0, response_1.badRequest)({ error: 'ERR_BAD_QUERY' });
        return (0, control_1.abort)();
    }
    let query = mQuery.takeRight();
    if (filters) {
        let mAdditionalQuery = (0, exports.compileQueryString)(policy, expandTemplate(req, filters));
        if (mAdditionalQuery.isLeft()) {
            yield (0, response_1.error)(new Error('ERR_QUERY_MISCONFIGURED'));
            return (0, control_1.abort)();
        }
        query = { $and: [mAdditionalQuery.takeRight(), query] };
    }
    let fields = conf.fields[ptr];
    if (!fields) {
        yield (0, response_1.error)(new Error('ERR_NO_FIELDS'));
        return (0, control_1.abort)();
    }
    let sort = (0, exports.compileSortString)(fields, req.query.sort);
    req.query = { query, page, limit, sort, fields };
    return (0, control_1.next)(req);
});
exports.compileSearchTag = compileSearchTag;
/**
 * compileQueryTag compiles the string specified in the +query tag into the
 * request.query property for PATCH and DELETE requests for routes it is
 * configured for.
 *
 * It uses the +policy or +model tags to determine which policy to use
 * The +query value is first interpolated with the Request object.
 */
const compileQueryTag = (conf) => (req) => (0, api_1.doAction)(function* () {
    if ((req.method !== 'PATCH') && (req.method !== 'DELETE'))
        return (0, control_1.next)(req);
    req.query = {}; // Clear any user supplied query.
    let filters = req.route.tags.query;
    if (!filters)
        return (0, control_1.next)(req);
    let ptr = (req.route.tags.policy || req.route.tags.model);
    let policy = conf.policies[ptr];
    if (!policy) {
        yield (0, response_1.error)(new Error('ERR_NO_POLICY'));
        return (0, control_1.abort)();
    }
    let mQuery = (0, exports.compileQueryString)(policy, expandTemplate(req, filters));
    if (mQuery.isLeft()) {
        console.error(mQuery.takeLeft());
        yield (0, response_1.error)(new Error('ERR_BAD_QUERY_CONF'));
        return (0, control_1.abort)();
    }
    req.query = mQuery.takeRight();
    return (0, control_1.next)(req);
});
exports.compileQueryTag = compileQueryTag;
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
const compileGetTag = (conf) => (req) => (0, api_1.doAction)(function* () {
    if ((req.method !== 'GET') || (req.route.tags.search))
        return (0, control_1.next)(req);
    req.query = {}; // Clear any user supplied queries.
    let ptr = req.route.tags.get;
    let fields = conf.fields[ptr];
    if (!ptr)
        return (0, control_1.next)(req);
    if (!fields) {
        yield (0, response_1.error)(new Error('ERR_NO_FIELDS'));
        return (0, control_1.abort)();
    }
    let filters = req.route.tags.query;
    let query = {};
    if (filters) {
        let policy = conf.policies[ptr];
        if (!policy) {
            yield (0, response_1.error)(new Error('ERR_NO_POLICY'));
            return (0, control_1.abort)();
        }
        let mquery = (0, exports.compileQueryString)(policy, expandTemplate(req, filters));
        if (mquery.isLeft()) {
            yield (0, response_1.error)(new Error('ERR_QUERY_MISCONFIGURED'));
            return (0, control_1.abort)();
        }
        query = mquery.takeRight();
    }
    req.query = { query, fields };
    return (0, control_1.next)(req);
});
exports.compileGetTag = compileGetTag;
const expandTemplate = (req, str) => (0, string_1.interpolate)(str, req, {
    transform: search_filters_1.sanitize,
    getter: (_, key) => {
        let paths = key.split('.');
        return ((paths[0] === 'session') ?
            req.session.getOrElse(paths.slice(1).join('.'), '') :
            (0, path_1.unsafeGet)(key, req));
    }
});
//# sourceMappingURL=query.js.map