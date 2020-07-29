"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postAPI = exports.PostApiController = exports.PostModel = void 0;
const pool_1 = require("@quenk/tendril/lib/app/api/pool");
const api_1 = require("@quenk/tendril/lib/app/api");
const control_1 = require("@quenk/tendril/lib/app/api/control");
const backdey_resource_mongodb_1 = require("@quenk/backdey-resource-mongodb");
const backdey_model_mongodb_1 = require("@quenk/backdey-model-mongodb");
/**
 * PostModel
 */
class PostModel extends backdey_model_mongodb_1.BaseModel {
    constructor() {
        super(...arguments);
        this.id = 'id';
    }
    static getInstance(db) {
        return new PostModel(db, db.collection('posts'));
    }
}
exports.PostModel = PostModel;
/**
 * PostAPIController provides the endpoints for post management.
 *
 * This should only be accessible to authenticated admin level users!
 */
class PostApiController extends backdey_resource_mongodb_1.BaseResource {
    getModel() {
        return api_1.doAction(function* () {
            let db = yield pool_1.checkout('main');
            return control_1.value(PostModel.getInstance(db));
        });
    }
}
exports.PostApiController = PostApiController;
exports.postAPI = new PostApiController();
//# sourceMappingURL=handlers.js.map