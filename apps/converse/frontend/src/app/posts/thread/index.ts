import * as api from '../../api';

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
    CreateHandler,
    CreateResult,
    GetHandler
} from '@quenk/jouvert/lib/app/remote/model';

import { Event as ControlEvent } from '@quenk/wml-widgets/lib/control';

import { Job } from '@board/types/lib/job';

import { Post } from '@converse/types/lib/post';
import { Comment } from '@converse/types/lib/comment';
import { Event } from '@converse/types/lib/event';

import { ConverseScene } from '../../common/scene';
import { PostThreadView } from './views';

class AfterPostLoadComments extends GetHandler<Post> {

    constructor(public thread: PostThread) { super(); }

    onComplete() {

        this.thread.loadComments();

    }

}

class AfterPostCommentReload extends CreateHandler {

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

    values = {

        onBack: () => { window.location.hash = '' },

        post: {

            data: <Post>{},

            onEdit: (post: Post) => {

                this.wait(<Future<void>><Future<unknown>>this.posts
                    .update(<number>this.values.post.data.id, post));

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

                    this.wait(<Future<void>><Future<unknown>>this.comment
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
                this.comments.create(this.values.comment.data))

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

    posts = this.app.getModel(
        api.posts,
        [

            new AfterGetSetData(data => doFuture(function*() {

                // @ts-ignore
                let that: PostThread = this;

                if (data) that.values.post.data = data

                yield that.recentPosts.search({ sort: '-created_on', limit: 5 });

                yield that.events.search({ sort: '-created_on', limit: 5 });

                yield that.jobs.search({ sort: '-created_on', limit: 5 });

                return voidPure;

            }.bind(this))),

            new OnCompleteShowData(this),

            new AfterPostLoadComments(this)

        ]);

    comments = this.app.getModel(api.comments, [

        new AfterSearchSetData(data => { this.values.comments.data = data }),

        new AfterSearchUpdateWidget(this.view, this.values.comments.id),

        new AfterPostCommentReload(this),

        new OnPatchCommentFailed(this)

    ], <Object>this.resume.request.params);

    comment = this.app.getModel(api.comments, [

        new OnPatchCommentFailed(this)

    ]);

    recentPosts = this.app.getModel(api.posts, [

        new AfterSearchSetData(data => { this.values.posts.recent.data = data }),

        new AfterSearchUpdateWidget(this.view, this.values.posts.recent.id)

    ]);

    jobs = this.app.getModel(api.jobs, [

        new AfterSearchSetData(data => { this.values.jobs.data = data }),

        new AfterSearchUpdateWidget(this.view, this.values.jobs.id)

    ]);

    events = this.app.getModel(api.events, [

        new AfterSearchSetData(data => { this.values.events.data = data }),

        new AfterSearchUpdateWidget(this.view, this.values.events.id)

    ]);

    /**
     * loadComments takes care of loading the comments.
     */
    loadComments() {

        this.wait(<Future<void>><Future<unknown>>this.comments.search({}));

    }

    run() {

        return this.posts.get(Number(this.resume.request.params.id));

    }

}
