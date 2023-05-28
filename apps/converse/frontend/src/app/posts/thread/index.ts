import { Record } from '@quenk/noni/lib/data/record';
import { Object, Value } from '@quenk/noni/lib/data/jsonx';
import {
    Future,
    doFuture,
    voidPure
} from '@quenk/noni/lib/control/monad/future';

import {
    AfterGetSetData,
    AfterSearchUpdateWidget,
    AfterPatchOk,
    AfterCreated,
    AfterConflict
} from '@quenk/jouvert/lib/app/scene/remote/handlers';
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
import { JobRemoteModel } from '../../remote/models/job';
import { EventRemoteModel } from '../../remote/models/event';
import { CommentRemoteModel } from '../../remote/models/comment';
import { Result } from '@quenk/jouvert/lib/app/remote/model';

/**
 * PostThread serves as the main view for a single post.
 *
 * It displays the original post as well as subsequent comments.
 */
export class PostThread extends ConverseScene<void> {

    _initialized = false; // flag indicating comments and sidebar loaded.

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

    posts = <PostRemoteModel>new PostRemoteModel('remote.background', this,
        TaggedHandler.create<Result<Object>>([

            ['method', 'get', [

                new AfterGetSetData(() => {

                    this.show();

                })

            ]],

            ['target', 'recentPosts', [

                new AfterSearchUpdateWidget(this.view,
                    this.values.posts.recent.id)

            ]],

            ['method', 'getComments', [

                new AfterSearchUpdateWidget(this.view, this.values.comments.id),

            ]],

            ['method', 'createComment', [

                new AfterCreated(() => this.loadComments()),

                new AfterConflict(() =>
                    alert('Could not post the commment for some reason!'))
            ]],

            ['method', 'update', new AfterPatchOk(() => this.load())]

        ]));

    comments = new CommentRemoteModel('remote.background', this,  [

        new AfterPatchOk(() => this.loadComments()),

        new AfterConflict(() =>
            alert('Could not update commment for some reason!'))

    ]);

    jobs = new JobRemoteModel('remote.background', this,  [

        new AfterSearchUpdateWidget(this.view, this.values.jobs.id)

    ]);

    events = new EventRemoteModel('event', this, [

        new AfterSearchUpdateWidget(this.view, this.values.events.id)

    ]);

    /**
     * load the initial post data that is the main thing displayed.
     */
    load() {

        return this.posts.get(Number(this.resume.request.params.id)).
            map(mdata => { this.values.post.data = mdata.get() });

    }

    /**
     * loadSidebar content.
     */
    loadSidebar() {

        let that = this;

        return doFuture(function*() {

            that.values.posts.recent.data = yield that.posts.search({

                $tags: { target: 'recentPosts' },

                sort: '-created_on',

                limit: 5

            });

            that.values.events.data =
                yield that.events.search({ sort: '-created_on', limit: 5 });

            that.values.jobs.data =
                yield that.jobs.search({ sort: '-created_on', limit: 5 });

            return voidPure;

        });

    }

    /**
     * loadComments into the page.
     */
    loadComments() {

        return this.posts.getComments(<number>this.resume.request.params.id)
            .map(data => { this.values.comments.data = data });

    }

    afterViewShown() {

        let that = this;

        return doFuture(function*() {

            if (!that._initialized) {

                yield that.loadSidebar();

                yield that.loadComments();

            }

            that._initialized = true;

            return voidPure;

        });

    }

    run() {

        return this.load();

    }

}
