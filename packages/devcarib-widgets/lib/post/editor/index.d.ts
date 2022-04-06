import { Attrs, Component } from '@quenk/wml';
import { TextChangedEvent } from '@quenk/wml-widgets/lib/control/text-field';
import { Post } from '@converse/types/lib/post';
import { PostEditorView } from './views';
/**
 * Errors are errors encountered while trying to save the editor for each
 * editable field.
 */
export interface Errors {
    [key: string]: string;
}
/**
 * PostEditorAttrs
 */
export interface PostEditorAttrs extends Attrs {
    /**
     * value to initialize the editor to.
     */
    value?: Post;
    /**
     * errors to display in the editor.
     */
    errors?: Errors;
    /**
     * onChange handler.
     */
    onChange?: (e: TextChangedEvent) => void;
    /**
     * onPost is called when the user submits the post.
     */
    onPost?: () => void;
}
/**
 * PostEditor is used by the user to add a new [[Post]] to the system.
 */
export declare class PostEditor extends Component<PostEditorAttrs> {
    view: PostEditorView;
    values: {
        title: {
            value: string;
            error: string | undefined;
            onChange: ((e: TextChangedEvent) => void) | undefined;
        };
        body: {
            value: string | undefined;
            error: string | undefined;
            onChange: ((e: TextChangedEvent) => void) | undefined;
        };
        post: {
            onClick: (() => void) | undefined;
        };
    };
}
