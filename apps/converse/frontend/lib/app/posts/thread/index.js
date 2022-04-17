"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostThread = void 0;
const api = require("../../api");
const response_1 = require("@quenk/jhr/lib/response");
const handlers_1 = require("@quenk/jouvert/lib/app/scene/remote/handlers");
const model_1 = require("@quenk/jouvert/lib/app/remote/model");
const scene_1 = require("../../common/scene");
const views_1 = require("./views");
class AfterPostLoadComments extends model_1.GetHandler {
    constructor(thread) {
        super();
        this.thread = thread;
    }
    onComplete() {
        this.thread.loadComments();
    }
}
class AfterPostCommentReload extends model_1.CreateHandler {
    constructor(thread) {
        super();
        this.thread = thread;
    }
    onComplete(res) {
        if (res instanceof response_1.Created)
            this.thread.loadComments();
    }
    onClientError(res) {
        // XXX: To be improved, promise!
        if (res instanceof response_1.Conflict)
            alert('Could not post the commment for some reason!');
    }
}
class OnPatchCommentFailed extends AfterPostCommentReload {
    onComplete() { }
}
/**
 * PostThread serves as the main view for a single post.
 *
 * It displays the original post as well as subsequent comments.
 */
class PostThread extends scene_1.ConverseScene {
    constructor() {
        super(...arguments);
        this.name = 'post-thread';
        this.view = new views_1.PostThreadView(this);
        this.values = {
            post: {
                data: {}
            },
            comments: {
                id: 'comments',
                data: [],
                onEdit: (comment) => {
                    let target = this.values.comments.data.find(c => c.id === comment.id);
                    if (target) {
                        this.wait(this.comment
                            .update(comment.id, { body: comment.body }));
                    }
                }
            },
            comment: {
                id: 'comment',
                data: {},
                errors: {},
                onChange: (e) => {
                    this.values.comment.data[e.name] = e.value;
                },
                onPost: () => this.wait(this.comments.create(this.values.comment.data))
            }
        };
        this.posts = this.app.getModel(api.posts, {}, [
            new handlers_1.AfterGetSetData(data => this.values.post.data = data),
            new handlers_1.OnCompleteShowData(this),
            new AfterPostLoadComments(this)
        ]);
        this.comments = this.app.getModel(api.comments, this.resume.request.params, [
            new handlers_1.AfterSearchSetData(data => this.values.comments.data = data),
            new handlers_1.AfterSearchUpdateWidget(this.view, this.values.comments.id),
            new AfterPostCommentReload(this),
            new OnPatchCommentFailed(this)
        ]);
        this.comment = this.app.getModel(api.comments, {}, [
            new OnPatchCommentFailed(this)
        ]);
    }
    /**
     * loadComments takes care of loading the comments.
     */
    loadComments() {
        this.wait(this.comments.search({}));
    }
    run() {
        return this.posts.get(Number(this.resume.request.params.id));
    }
}
exports.PostThread = PostThread;
//# sourceMappingURL=index.js.map