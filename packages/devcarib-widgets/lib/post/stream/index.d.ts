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
    data?: Post[];
    /**
     * onPost if specified, is called when the user clicks on an area of
     * the stream that should take them to a post.
     */
    onPost?: (post: Post) => void;
}
/**
 * PostStream is used to display recent post activity in a list view fashion.
 */
export declare class PostStream extends Component<PostStreamAttrs> {
    view: PostStreamView;
    values: {
        data: Post[];
        getPostHref: (post: Post) => string;
        onClick: (idx: number) => () => void;
    };
    /**
     * update appends new posts to the stream.
     *
     * This will trigger a refresh of the view.
     */
    update(data: Post[]): void;
}
