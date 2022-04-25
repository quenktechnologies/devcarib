import * as api from '../../api';

import { Record } from '@quenk/noni/lib/data/record';
import { Object, Value } from '@quenk/noni/lib/data/jsonx';
import { Future } from '@quenk/noni/lib/control/monad/future';

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

import { Event } from '@quenk/wml-widgets/lib/control';

import { Post } from '@converse/types/lib/post';
import { Comment } from '@converse/types/lib/comment';

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

        post: {

            data: <Post>{},

            onEdit: (post: Post) => {

                this.wait(<Future<void>><Future<unknown>>this.posts
                    .update(<number>this.values.post.data.id, post));

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

            onChange: (e: Event<Value>) => {

                this.values.comment.data[e.name] = e.value;

            },

            onPost: () => this.wait(<Future<void>><Future<unknown>>
                this.comments.create(this.values.comment.data))

        }

    };

    posts = this.app.getModel(
        api.posts,
        [

            new AfterGetSetData(data => {
                if (data)
                    this.values.post.data = data
            }),

            new OnCompleteShowData(this),

            new AfterPostLoadComments(this)

        ]);

    comments = this.app.getModel(api.comments, [

        new AfterSearchSetData(data => { this.values.comments.data = data}),

        new AfterSearchUpdateWidget(this.view, this.values.comments.id),

        new AfterPostCommentReload(this),

        new OnPatchCommentFailed(this)

    ], <Object>this.resume.request.params);

    comment = this.app.getModel(api.comments, [

        new OnPatchCommentFailed(this)

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
