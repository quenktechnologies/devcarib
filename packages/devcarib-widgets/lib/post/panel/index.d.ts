import { Attrs, Component } from '@quenk/wml';
import { TextChangedEvent } from '@quenk/wml-widgets/lib/control/text-field';
import { Post } from '@converse/types/lib/post';
import { PostPanelView, EditPostPanelView } from './views';
/**
 * PostPanelAttrs
 */
export interface PostPanelAttrs extends Attrs {
    /**
     * editable if true means the comment can be edited.
     */
    editable?: boolean;
    /**
     * data to initialize panel with.
     */
    data: Post;
    /**
     * onEdit if specified is called when the user submits changes to the
     * comment.
     */
    onEdit?: (changes: Post) => void;
}
/**
 * PostPanel displays a post made by a user.
 */
export declare class PostPanel extends Component<PostPanelAttrs> {
    readView: PostPanelView;
    editView: EditPostPanelView;
    view: PostPanelView;
    values: {
        editable: boolean | undefined;
        editing: boolean;
        data: Post;
        editor: {
            data: Post;
            onChange: (evt: TextChangedEvent) => void;
            onPost: () => void;
            onCancel: () => void;
            show: () => void;
        };
    };
}
