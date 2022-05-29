import { Attrs, Component } from '@quenk/wml';

import { Post } from '@converse/types/lib/post';

import { PostStreamView } from './views';
import { concat } from '@quenk/wml-widgets/lib/util';

/**
 * PostStreamAttrs
 */
export interface PostStreamAttrs extends Attrs {

    /**
     * className list to append to the root element.
     */
    className?: string

    /**
     * data is the posts initialize the stream with.
     */
    data?: Post[],

    /**
     * onPost if specified, is called when the user clicks on an area of
     * the stream that should take them to a post.
     */
    onPost?: (post: Post) => void

}

/**
 * PostStream is used to display recent post activity in a list view fashion.
 */
export class PostStream extends Component<PostStreamAttrs> {

    view = new PostStreamView(this);

    values = {

        className: concat('devcarib-post-stream', this.attrs.className),

        data: this.attrs.data?.slice() || [],

        getPostHref: (post: Post) => `#/posts/${post.id}`,

        onClick: (idx: number) => () => {

            this.attrs.onPost && this.attrs.onPost(this.values.data[idx]);

        }

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
