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
}
/**
 * PostStream is used to display recent post activity in a list view fashion.
 */
export declare class PostStream extends Component<PostStreamAttrs> {
    view: PostStreamView;
    values: {
        data: Post[];
        getAuthor: (post: Post) => string | undefined;
        onClick: (_: number) => () => void;
    };
    /**
     * update appends new posts to the stream.
     *
     * This will trigger a refresh of the view.
     */
    update(data: Post[]): void;
}
