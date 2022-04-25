"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiController = exports.QueryParams = void 0;
const dback_resource_mongodb_1 = require("@quenk/dback-resource-mongodb");
/**
 * QueryParams provides the additional parameters for the _SUGR operations.
 *
 * These methods rely on the compileSearchTag and compileQueryTag filters and
 * should not be used without them installed!
 */
class QueryParams extends dback_resource_mongodb_1.DefaultParamsFactory {
    search(req) {
        return req.query;
    }
    update({ query }) {
        return { changes: {}, query };
    }
    get(req) {
        return req.query;
    }
    remove({ query }) {
        return { query };
    }
}
exports.QueryParams = QueryParams;
/**
 * ApiController provides a default implementation of the dback mongodb
 * resource.
 *
 * It uses [[QueryParams]] to supply search params by default and should only
 * be used with the appropriate filters installed.
 */
class ApiController extends dback_resource_mongodb_1.BaseResource {
    constructor(modelGetter, conn = 'main') {
        super(conn);
        this.modelGetter = modelGetter;
        this.conn = conn;
        this.params = new QueryParams();
    }
    getModel(db) {
        return this.modelGetter(db);
    }
}
exports.ApiController = ApiController;
//# sourceMappingURL=api.js.map