import { Attrs, Component } from '@quenk/wml';

import { Comment } from '@converse/types/lib/comment';

import { CommentStreamView } from './views';

/**
 * CommentStreamAttrs
 */
export interface CommentStreamAttrs extends Attrs {

    /**
     * data is the comments to initialize the stream with.
     */
    data?: Comment[]

}

/**
 * CommentStream is used to display a stream of comments on a post.
 */
export class CommentStream extends Component<CommentStreamAttrs> {

    view = new CommentStreamView(this);

    values = {

        data: this.attrs.data?.slice() || [],

    }

    /**
     * update appends new comments to the stream.
     *
     * This will trigger a refresh of the view.
     */
    update(data: Comment[]) {

        this.values.data = [...this.values.data, ...data];

        this.view.invalidate();

    }

}
