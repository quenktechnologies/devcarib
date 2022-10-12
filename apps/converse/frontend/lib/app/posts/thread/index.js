"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostThread = void 0;
const future_1 = require("@quenk/noni/lib/control/monad/future");
const response_1 = require("@quenk/jhr/lib/response");
const handlers_1 = require("@quenk/jouvert/lib/app/scene/remote/handlers");
const result_1 = require("@quenk/jouvert/lib/app/remote/model/handlers/result");
const tag_1 = require("@quenk/jouvert/lib/app/remote/model/handlers/tag");
const scene_1 = require("../../common/scene");
const views_1 = require("./views");
class AfterPostLoadComments extends result_1.GetResultHandler {
    constructor(thread) {
        super();
        this.thread = thread;
    }
    onComplete() {
        this.thread.loadComments();
    }
}
class AfterPostCommentReload extends result_1.CreateResultHandler {
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
            onBack: () => { window.location.hash = ''; },
            post: {
                data: {},
                onEdit: (post) => {
                    this.wait(this.posts
                        .update(this.id, post));
                }
            },
            posts: {
                recent: {
                    id: 'recent-posts',
                    data: []
                }
            },
            comments: {
                id: 'comments',
                data: [],
                onEdit: (comment) => {
                    let target = this.values.comments.data.find(c => c.id === comment.id);
                    if (target) {
                        this.wait(this.comments
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
                onPost: () => this.wait(this.posts.createComment(this.id, this.values.comment.data))
            },
            jobs: {
                id: 'jobs',
                data: []
            },
            events: {
                id: 'events',
                data: []
            }
        };
        this.posts = this.models.create('post', tag_1.TaggedHandler.create([
            ['method', 'get', [
                    new handlers_1.AfterGetSetData(data => {
                        this.values.post.data = data;
                        this.wait(this.loadSidebar());
                    }),
                    new handlers_1.OnCompleteShowData(this),
                    new AfterPostLoadComments(this)
                ]],
            ['target', 'recentPosts', [
                    new handlers_1.AfterSearchSetData(data => {
                        this.values.posts.recent.data = data;
                    }),
                    new handlers_1.AfterSearchUpdateWidget(this.view, this.values.posts.recent.id)
                ]],
            ['method', 'getComments', [
                    new handlers_1.AfterSearchSetData(data => { this.values.comments.data = data; }),
                    new handlers_1.AfterSearchUpdateWidget(this.view, this.values.comments.id),
                    new AfterPostCommentReload(this),
                    new OnPatchCommentFailed(this)
                ]],
            ['method', 'createComment', [
                    new AfterPostCommentReload(this),
                ]]
        ]));
        this.comments = this.models.create('comment', [
            new OnPatchCommentFailed(this)
        ]);
        this.jobs = this.models.create('job', [
            new handlers_1.AfterSearchSetData(data => { this.values.jobs.data = data; }),
            new handlers_1.AfterSearchUpdateWidget(this.view, this.values.jobs.id)
        ]);
        this.events = this.models.create('event', [
            new handlers_1.AfterSearchSetData(data => { this.values.events.data = data; }),
            new handlers_1.AfterSearchUpdateWidget(this.view, this.values.events.id)
        ]);
    }
    get id() {
        return this.values.post.data.id;
    }
    /**
     * loadComments for the post.
     */
    loadComments() {
        this.wait(this.posts.getComments(this.resume.request.params.id));
    }
    loadSidebar() {
        let that = this;
        return (0, future_1.doFuture)(function* () {
            yield that.posts.search({
                $tags: { target: 'recentPosts' },
                sort: '-created_on',
                limit: 5
            });
            yield that.events.search({ sort: '-created_on', limit: 5 });
            yield that.jobs.search({ sort: '-created_on', limit: 5 });
            return future_1.voidPure;
        });
    }
    run() {
        return this.posts.get(Number(this.resume.request.params.id));
    }
}
exports.PostThread = PostThread;
//# sourceMappingURL=index.js.map