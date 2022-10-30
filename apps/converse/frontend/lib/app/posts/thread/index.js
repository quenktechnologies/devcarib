"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostThread = void 0;
const future_1 = require("@quenk/noni/lib/control/monad/future");
const handlers_1 = require("@quenk/jouvert/lib/app/scene/remote/handlers");
const tag_1 = require("@quenk/jouvert/lib/app/remote/model/handlers/tag");
const scene_1 = require("../../common/scene");
const views_1 = require("./views");
/**
 * PostThread serves as the main view for a single post.
 *
 * It displays the original post as well as subsequent comments.
 */
class PostThread extends scene_1.ConverseScene {
    constructor() {
        super(...arguments);
        this._initialized = false; // flag indicating comments and sidebar loaded.
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
                    new handlers_1.AfterGetSetData(() => {
                        this.show();
                    })
                ]],
            ['target', 'recentPosts', [
                    new handlers_1.AfterSearchUpdateWidget(this.view, this.values.posts.recent.id)
                ]],
            ['method', 'getComments', [
                    new handlers_1.AfterSearchUpdateWidget(this.view, this.values.comments.id),
                ]],
            ['method', 'createComment', [
                    new handlers_1.AfterCreated(() => this.loadComments()),
                    new handlers_1.AfterConflict(() => alert('Could not post the commment for some reason!'))
                ]],
            ['method', 'update', new handlers_1.AfterPatchOk(() => this.load())]
        ]));
        this.comments = this.models.create('comment', [
            new handlers_1.AfterPatchOk(() => this.loadComments()),
            new handlers_1.AfterConflict(() => alert('Could not update commment for some reason!'))
        ]);
        this.jobs = this.models.create('job', [
            new handlers_1.AfterSearchUpdateWidget(this.view, this.values.jobs.id)
        ]);
        this.events = this.models.create('event', [
            new handlers_1.AfterSearchUpdateWidget(this.view, this.values.events.id)
        ]);
    }
    get id() {
        return this.values.post.data.id;
    }
    /**
     * load the initial post data that is the main thing displayed.
     */
    load() {
        return this.posts.get(Number(this.resume.request.params.id)).
            map(mdata => { this.values.post.data = mdata.get(); });
    }
    /**
     * loadSidebar content.
     */
    loadSidebar() {
        let that = this;
        return (0, future_1.doFuture)(function* () {
            that.values.posts.recent.data = yield that.posts.search({
                $tags: { target: 'recentPosts' },
                sort: '-created_on',
                limit: 5
            });
            that.values.events.data =
                yield that.events.search({ sort: '-created_on', limit: 5 });
            that.values.jobs.data =
                yield that.jobs.search({ sort: '-created_on', limit: 5 });
            return future_1.voidPure;
        });
    }
    /**
     * loadComments into the page.
     */
    loadComments() {
        return this.posts.getComments(this.resume.request.params.id)
            .map(data => { this.values.comments.data = data; });
    }
    afterViewShown() {
        let that = this;
        return (0, future_1.doFuture)(function* () {
            if (!that._initialized) {
                yield that.loadSidebar();
                yield that.loadComments();
            }
            that._initialized = true;
            return future_1.voidPure;
        });
    }
    run() {
        return this.load();
    }
}
exports.PostThread = PostThread;
//# sourceMappingURL=index.js.map