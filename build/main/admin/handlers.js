"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminCtl = exports.AdminController = exports.PostModel = void 0;
const prs = require("@quenk/tendril/lib/app/api/storage/prs");
const type_1 = require("@quenk/noni/lib/data/type");
const api_1 = require("@quenk/tendril/lib/app/api");
const pool_1 = require("@quenk/tendril/lib/app/api/pool");
const control_1 = require("@quenk/tendril/lib/app/api/control");
const response_1 = require("@quenk/tendril/lib/app/api/response");
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
 * AdminController serves the UI and endpoints for the admin section.
 *
 * All the routes here should only be accessible to authenticated admin level
 * users!
 */
class AdminController extends backdey_resource_mongodb_1.BaseResource {
    constructor() {
        super(...arguments);
        /**
         * showIndex displays the admin app page to the user.
         *
         * Note: This is not a JSON endpoint!
         */
        this.showIndex = (_) => {
            return response_1.show('admin.html');
        };
        this.setQuery = (r) => {
            return api_1.doAction(function* () {
                yield prs.set("resource.mongodb.search.query" /* query */, type_1.isString(r.query.q) ?
                    { title: r.query.q } : {});
                return control_1.next(r);
            });
        };
    }
    getModel() {
        return api_1.doAction(function* () {
            let db = yield pool_1.checkout('main');
            return control_1.value(PostModel.getInstance(db));
        });
    }
}
exports.AdminController = AdminController;
exports.adminCtl = new AdminController();
//# sourceMappingURL=handlers.js.map