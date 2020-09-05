"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminsCtrl = exports.postsCtl = exports.PostsController = exports.AdminsController = exports.BaseController = exports.AdminModel = exports.PostModel = void 0;
const prs = require("@quenk/tendril/lib/app/api/storage/prs");
const session = require("@quenk/tendril/lib/app/api/storage/session");
const adminChecks = require("@board/checks/lib/admin");
const type_1 = require("@quenk/noni/lib/data/type");
const regex_1 = require("@quenk/noni/lib/data/string/regex");
const api_1 = require("@quenk/tendril/lib/app/api");
const pool_1 = require("@quenk/tendril/lib/app/api/pool");
const control_1 = require("@quenk/tendril/lib/app/api/control");
const response_1 = require("@quenk/tendril/lib/app/api/response");
const dback_resource_mongodb_1 = require("@quenk/dback-resource-mongodb");
const dback_model_mongodb_1 = require("@quenk/dback-model-mongodb");
const post_1 = require("@board/checks/lib/post");
const messages = {
    minLength: '{$key} must be {target} or more characters!',
    maxLength: '{$key} must be less than {target} characters!',
    notNull: '{$key} is required!'
};
/**
 * PostModel
 */
class PostModel extends dback_model_mongodb_1.BaseModel {
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
 * AdminModel
 */
class AdminModel extends dback_model_mongodb_1.BaseModel {
    constructor() {
        super(...arguments);
        this.id = 'id';
    }
    static getInstance(db) {
        return new AdminModel(db, db.collection('admins'));
    }
}
exports.AdminModel = AdminModel;
/**
 * BaseController for admin routes.
 */
class BaseController extends dback_resource_mongodb_1.BaseResource {
    /**
     * before ensures the client has permission to access this api.
     */
    before(r) {
        return api_1.doAction(function* () {
            let madmin = yield session.get('admin');
            if (madmin.isNothing())
                return response_1.forbidden();
            return control_1.value(r);
        });
    }
    /**
     * beforeCreate validates the request body before updating.
     */
    beforeCreate(r) {
        let that = this;
        return api_1.doAction(function* () {
            let eBody = yield control_1.fork(that.checkCreate(r.body));
            if (eBody.isLeft()) {
                let errors = eBody.takeLeft().explain(that.messages);
                return response_1.conflict({ errors });
            }
            r.body = eBody.takeRight();
            return control_1.value(r);
        });
    }
    /**
     * beforeUpdate validates the request body before updating.
     */
    beforeUpdate(r) {
        let that = this;
        return api_1.doAction(function* () {
            let eBody = yield control_1.fork(that.checkUpdate(r.body));
            if (eBody.isLeft()) {
                let errors = eBody.takeLeft().explain(that.messages);
                return response_1.conflict({ errors });
            }
            r.body = eBody.takeRight();
            return control_1.value(r);
        });
    }
}
exports.BaseController = BaseController;
/**
 * AdminsController provides the handlers for the /admin/r/admins routes.
 */
class AdminsController extends BaseController {
    constructor() {
        super(...arguments);
        this.messages = messages;
        this.checkCreate = adminChecks.post;
        this.checkUpdate = adminChecks.patch;
    }
    getModel() {
        return api_1.doAction(function* () {
            let db = yield pool_1.checkout('main');
            return control_1.value(AdminModel.getInstance(db));
        });
    }
    beforeSearch(r) {
        return api_1.doAction(function* () {
            let qry = {};
            if (type_1.isString(r.query.q)) {
                let filter = { $regex: regex_1.escape(r.query.q), $options: 'i' };
                qry = { email: filter };
            }
            yield prs.set("resource.mongodb.search.query" /* query */, qry);
            return control_1.value(r);
        });
    }
}
exports.AdminsController = AdminsController;
/**
 * PostsController provides the handlers for the /admin/r/posts routes.
 */
class PostsController extends BaseController {
    constructor() {
        super(...arguments);
        this.messages = messages;
        this.checkCreate = post_1.adminCheckPost;
        this.checkUpdate = post_1.adminCheckPatch;
    }
    getModel() {
        return api_1.doAction(function* () {
            let db = yield pool_1.checkout('main');
            return control_1.value(PostModel.getInstance(db));
        });
    }
    beforeSearch(r) {
        return api_1.doAction(function* () {
            let qry = {};
            if (type_1.isString(r.query.q)) {
                let filter = { $regex: regex_1.escape(r.query.q), $options: 'i' };
                qry = { $or: [{ title: filter }, { company: filter }] };
            }
            yield prs.set("resource.mongodb.search.query" /* query */, qry);
            return control_1.value(r);
        });
    }
}
exports.PostsController = PostsController;
exports.postsCtl = new PostsController();
exports.adminsCtrl = new AdminsController();
//# sourceMappingURL=handlers.js.map