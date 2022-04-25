import { Attrs, Component } from '@quenk/wml';
import { Comment } from '@converse/types/lib/comment';
import { CommentStreamView } from './views';
/**
 * CommentStreamAttrs
 */
export interface CommentStreamAttrs extends Attrs {
    /**
     * user if specified, is the id of the current user that will be used to
     * toggle the edit link of any comments created by the user.
     */
    user?: number;
    /**
     * data is the comments to initialize the stream with.
     */
    data?: Comment[];
    /**
     * onEdit is called when a comment has been inline edited.
     */
    onEdit?: (data: Comment) => void;
}
/**
 * CommentStream is used to display a stream of comments on a post.
 */
export declare class CommentStream extends Component<CommentStreamAttrs> {
    view: CommentStreamView;
    values: {
        user: number;
        data: Comment[];
        onEdit: ((data: Comment) => void) | undefined;
    };
    /**
     * update appends new comments to the stream.
     *
     * This will trigger a refresh of the view.
     */
    update(data: Comment[]): void;
}
