import { Attrs, Component } from '@quenk/wml';
import { TextChangedEvent } from '@quenk/wml-widgets/lib/control/text-field';
import { Comment } from '@converse/types/lib/comment';
import { CommentPanelView, EditCommentPanelView } from './views';
/**
 * CommentPanelAttrs
 */
export interface CommentPanelAttrs extends Attrs {
    /**
     * editable if true means the comment can be edited.
     */
    editable?: boolean;
    /**
     * data to initialize panel with.
     */
    data: Comment;
    /**
     * onEdit if specified is called when the user submits changes to the
     * comment.
     */
    onEdit?: (changes: Comment) => void;
}
/**
 * CommentPanel displays a comment left by a user.
 */
export declare class CommentPanel extends Component<CommentPanelAttrs> {
    readView: CommentPanelView;
    editView: EditCommentPanelView;
    view: CommentPanelView;
    values: {
        editable: boolean | undefined;
        editing: boolean;
        data: Comment;
        editor: {
            data: Comment;
            onChange: (evt: TextChangedEvent) => void;
            onPost: () => void;
            onCancel: () => void;
            show: () => void;
        };
    };
}
