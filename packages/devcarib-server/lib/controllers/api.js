"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiController = void 0;
const dback_resource_mongodb_1 = require("@quenk/dback-resource-mongodb");
const query_1 = require("../filters/query");
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
        this.params = new query_1.QueryParams();
    }
    getModel(db) {
        return this.modelGetter(db);
    }
}
exports.ApiController = ApiController;
//# sourceMappingURL=api.js.map