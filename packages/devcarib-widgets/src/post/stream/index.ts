import { Attrs, Component } from '@quenk/wml';

import { Post } from '@converse/types/lib/post';

import { PostStreamView } from './views';

/**
 * PostStreamAttrs
 */
export interface PostStreamAttrs extends Attrs {

    /**
     * data is the posts initialize the stream with.
     */
    data?: Post[]

}

/**
 * PostStream is used to display recent post activity in a list view fashion.
 */
export class PostStream extends Component<PostStreamAttrs> {

    view = new PostStreamView(this);

    values = {

        data: this.attrs.data?.slice() || [],

        getAuthor: (post: Post) => post.created_by?.username,

        onClick: (_: number) => () => { }

    }

    /**
     * update appends new posts to the stream.
     *
     * This will trigger a refresh of the view.
     */
    update(data: Post[]) {

        this.values.data = [...this.values.data, ...data];

        this.view.invalidate();

    }

}
