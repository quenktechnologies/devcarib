"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsCtl = exports.adminCtl = exports.AdminController = exports.PostsController = exports.PostModel = void 0;
const prs = require("@quenk/tendril/lib/app/api/storage/prs");
const type_1 = require("@quenk/noni/lib/data/type");
const regex_1 = require("@quenk/noni/lib/data/string/regex");
const api_1 = require("@quenk/tendril/lib/app/api");
const pool_1 = require("@quenk/tendril/lib/app/api/pool");
const control_1 = require("@quenk/tendril/lib/app/api/control");
const response_1 = require("@quenk/tendril/lib/app/api/response");
const backdey_resource_mongodb_1 = require("@quenk/backdey-resource-mongodb");
const backdey_model_mongodb_1 = require("@quenk/backdey-model-mongodb");
const post_1 = require("@board/checks/lib/post");
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
 * PostsController provides the handlers for the /admin/r/posts routes.
 */
class PostsController extends backdey_resource_mongodb_1.BaseResource {
    constructor() {
        super(...arguments);
        /**
         * runSearch executes a search using the "q" query variable
         * as an argument for
         */
        this.runSearch = (r) => {
            let that = this;
            return api_1.doAction(function* () {
                let qry = {};
                if (type_1.isString(r.query.q)) {
                    let filter = { $regex: regex_1.escape(r.query.q), $options: 'i' };
                    qry = { $or: [{ title: filter }, { company: filter }] };
                }
                yield prs.set("resource.mongodb.search.query" /* query */, qry);
                return that.search(r);
            });
        };
        /**
         * runUpdate valdiates and applies an update to a post.
         */
        this.runUpdate = (r) => {
            let that = this;
            return api_1.doAction(function* () {
                let eBody = yield control_1.fork(post_1.patch(r.body));
                if (eBody.isLeft())
                    return response_1.conflict({ errors: eBody.takeLeft() });
                r.body = eBody.takeRight();
                return that.update(r);
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
exports.PostsController = PostsController;
/**
 * AdminController serves the UI for the admin section.
 *
 * All the routes here should only be accessible to authenticated admin level
 * users!
 */
class AdminController {
    constructor() {
        /**
         * showIndex displays the admin app page to the user.
         *
         * Note: This is not a JSON endpoint!
         */
        this.showIndex = (_) => {
            return response_1.show('admin.html');
        };
    }
}
exports.AdminController = AdminController;
exports.adminCtl = new AdminController();
exports.postsCtl = new PostsController();
//# sourceMappingURL=handlers.js.map