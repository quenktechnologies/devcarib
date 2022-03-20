"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compile = exports.compileSortString = exports.compileQueryString = void 0;
const type_1 = require("@quenk/noni/lib/data/type");
const either_1 = require("@quenk/noni/lib/data/either");
const api_1 = require("@quenk/tendril/lib/app/api");
const control_1 = require("@quenk/tendril/lib/app/api/control");
const response_1 = require("@quenk/tendril/lib/app/api/response");
const search_filters_mongodb_1 = require("@quenk/search-filters-mongodb");
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
 * compile shapes the query parameters of an incomming request so they can
 * be used in a mongodb query.
 *
 * This filter relies on the +policy tag being set to determine the correct
 * policy and fields document to use. Note that they must have the same value.
 */
const compile = (conf) => (req) => (0, api_1.doAction)(function* () {
    if (req.method !== 'GET')
        return (0, control_1.next)(req);
    let ptr = req.route.tags.policy;
    let policy = conf.policies[ptr];
    if (!policy) {
        yield (0, response_1.conflict)();
        return (0, control_1.abort)();
    }
    let page = (0, type_1.isNumber)(req.query.page) ? req.query.page : 1;
    let limit = (0, type_1.isNumber)(req.query.limit) ?
        req.query.limit :
        DEFAULT_PAGE_SIZE;
    let mQuery = (0, exports.compileQueryString)(policy, req.query.q);
    if (mQuery.isLeft()) {
        yield (0, response_1.badRequest)();
        return (0, control_1.abort)();
    }
    let query = mQuery.takeRight();
    let fields = conf.fields[ptr];
    if (!fields) {
        yield (0, response_1.badRequest)();
        return (0, control_1.abort)();
    }
    let sort = (0, exports.compileSortString)(fields, req.query.sort);
    req.query = { query, page, limit, sort, fields };
    return (0, control_1.next)(req);
});
exports.compile = compile;
//# sourceMappingURL=query.js.map