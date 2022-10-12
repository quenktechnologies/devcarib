"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRemoteModel = void 0;
const remoteModel = require("@quenk/jouvert/lib/app/remote/model");
const future_1 = require("@quenk/noni/lib/control/monad/future");
const string_1 = require("@quenk/noni/lib/data/string");
const request = require("@quenk/jhr/lib/request");
/**
 * PostRemoteModel
 *
 * AUTO-GENERATED, DO NOT EDIT DIRECTLY, CHANGES WILL BE LOST!
 */
class PostRemoteModel extends remoteModel.RemoteModel {
    constructor() {
        super(...arguments);
        this.paths = PostRemoteModel.paths;
    }
    createComment(id, data) {
        let that = this;
        return (0, future_1.doFuture)(function* () {
            let path = (0, string_1.interpolate)('/r/posts/{id}/comments', { id });
            let res = yield that.send(new request.Post(path, data, {
                tags: {
                    path,
                    verb: 'post',
                    method: 'createComment'
                }
            }));
            return (0, future_1.pure)(res.body.data.id);
        });
    }
    getComments(id, qry = {}) {
        let that = this;
        return (0, future_1.doFuture)(function* () {
            let path = (0, string_1.interpolate)('/r/posts/{id}/comments', { id });
            let res = yield that.send(new request.Get(path, qry, {
                tags: {
                    path,
                    verb: 'post',
                    method: 'getComments'
                }
            }));
            return (0, future_1.pure)((res.code === 204) ? [] : res.body.data);
        });
    }
}
exports.PostRemoteModel = PostRemoteModel;
PostRemoteModel.paths = { "search": "/r/posts", "get": "/r/posts/{id}", "comments": "/r/posts/{id}/comments" };
//# sourceMappingURL=post.js.map