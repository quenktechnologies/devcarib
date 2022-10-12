"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentRemoteModel = void 0;
const remoteModel = require("@quenk/jouvert/lib/app/remote/model");
/**
 * CommentRemoteModel
 *
 * AUTO-GENERATED, DO NOT EDIT DIRECTLY, CHANGES WILL BE LOST!
 */
class CommentRemoteModel extends remoteModel.RemoteModel {
    constructor() {
        super(...arguments);
        this.paths = CommentRemoteModel.paths;
    }
}
exports.CommentRemoteModel = CommentRemoteModel;
CommentRemoteModel.paths = { "search": "/r/comments", "get": "/r/comments/{id}" };
//# sourceMappingURL=comment.js.map