import { Record } from '@quenk/noni/lib/data/record';
import { Object, Value } from '@quenk/noni/lib/data/jsonx';
import { Future, doFuture, voidPure } from '@quenk/noni/lib/control/monad/future';

import { Conflict, Created, Response } from '@quenk/jhr/lib/response';

import {
    AfterGetSetData,
    AfterSearchSetData,
    AfterSearchUpdateWidget,
    OnCompleteShowData,
} from '@quenk/jouvert/lib/app/scene/remote/handlers';
import {
    CreateResult,
} from '@quenk/jouvert/lib/app/remote/model/response';
import {
    CreateResultHandler,
    GetResultHandler
} from '@quenk/jouvert/lib/app/remote/model/handlers/result';
import {
    TaggedHandler
} from '@quenk/jouvert/lib/app/remote/model/handlers/tag';

import { Event as ControlEvent } from '@quenk/wml-widgets/lib/control';

import { Job } from '@board/types/lib/job';

import { Post } from '@converse/types/lib/post';
import { Comment } from '@converse/types/lib/comment';
import { Event } from '@converse/types/lib/event';

import { ConverseScene } from '../../common/scene';
import { PostThreadView } from './views';
import { PostRemoteModel } from '../../remote/models/post';

class AfterPostLoadComments extends GetResultHandler<Post> {

    constructor(public thread: PostThread) { super(); }

    onComplete() {

        this.thread.loadComments();

    }

}

class AfterPostCommentReload extends CreateResultHandler {

    constructor(public thread: PostThread) { super(); }

    onComplete(res: Response<CreateResult>) {

        if (res instanceof Created) this.thread.loadComments();

    }

    onClientError(res: Response<Object>) {

        // XXX: To be improved, promise!
        if (res instanceof Conflict)
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
export class PostThread extends ConverseScene<void> {

    name = 'post-thread';

    view = new PostThreadView(this);

    get id() {

        return <number>this.values.post.data.id;

    }

    values = {

        onBack: () => { window.location.hash = '' },

        post: {

            data: <Post>{},

            onEdit: (post: Post) => {

                this.wait(<Future<void>><Future<unknown>>this.posts
                    .update(<number>this.id, post));

            }

        },

        posts: {

            recent: {

                id: 'recent-posts',

                data: <Post[]>[]

            }

        },

        comments: {

            id: 'comments',

            data: <Comment[]>[],

            onEdit: (comment: Comment) => {

                let target = this.values.comments.data.find(c =>
                    c.id === comment.id);

                if (target) {

                    this.wait(<Future<void>><Future<unknown>>this.comments
                        .update(<number>comment.id, { body: comment.body }));


                }

            }

        },

        comment: {

            id: 'comment',

            data: <Comment>{},

            errors: <Record<string>>{},

            onChange: (e: ControlEvent<Value>) => {

                this.values.comment.data[e.name] = e.value;

            },

            onPost: () => this.wait(<Future<void>><Future<unknown>>
                this.posts.createComment(this.id, this.values.comment.data))

        },

        jobs: {

            id: 'jobs',

            data: <Job[]>[]

        },

        events: {

            id: 'events',

            data: <Event[]>[]

        }

    };

    posts = <PostRemoteModel>this.models.create('post', TaggedHandler.create([

        ['method', 'get', [

            new AfterGetSetData(data => {

                this.values.post.data = <Post>data;

                this.wait(this.loadSidebar());

            }),

            new OnCompleteShowData(this),

            new AfterPostLoadComments(this)

        ]],

        ['target', 'recentPosts', [

            new AfterSearchSetData(data => {

                this.values.posts.recent.data = data

            }),

            new AfterSearchUpdateWidget(this.view, this.values.posts.recent.id)

        ]],

        ['method', 'getComments', [

            new AfterSearchSetData(data => { this.values.comments.data = data }),

            new AfterSearchUpdateWidget(this.view, this.values.comments.id),

            new AfterPostCommentReload(this),

            new OnPatchCommentFailed(this)

        ]],

        ['method', 'createComment', [

            new AfterPostCommentReload(this),

        ]]

    ]));

    comments = this.models.create('comment', [

        new OnPatchCommentFailed(this)

    ]);

    jobs = this.models.create('job', [

        new AfterSearchSetData(data => { this.values.jobs.data = data }),

        new AfterSearchUpdateWidget(this.view, this.values.jobs.id)

    ]);

    events = this.models.create('event', [

        new AfterSearchSetData(data => { this.values.events.data = data }),

        new AfterSearchUpdateWidget(this.view, this.values.events.id)

    ]);

    /**
     * loadComments for the post.
     */
    loadComments() {

        this.wait(<Future<void>><Future<unknown>>
            this.posts.getComments(<number>this.resume.request.params.id));

    }

    loadSidebar() {

        let that = this;

        return doFuture(function*() {

            yield that.posts.search({

                $tags: { target: 'recentPosts' },

                sort: '-created_on',

                limit: 5

            });

            yield that.events.search({ sort: '-created_on', limit: 5 });

            yield that.jobs.search({ sort: '-created_on', limit: 5 });

            return voidPure;

        });

    }

    run() {

        return this.posts.get(Number(this.resume.request.params.id));

    }

}
