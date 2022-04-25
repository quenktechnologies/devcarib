import { Attrs, Component } from '@quenk/wml';

import { TextChangedEvent } from '@quenk/wml-widgets/lib/control/text-field';

import { Post } from '@converse/types/lib/post';

import { PostEditorView } from './views';

/**
 * Errors are errors encountered while trying to save the editor for each
 * editable field.
 */
export interface Errors {

    [key: string]: string

}

/**
 * PostEditorAttrs
 */
export interface PostEditorAttrs extends Attrs {

    /**
     * notitle if true will hide the title section.
     */
    notitle?: boolean,

    /**
     * allowCancel if true will show the button to cancel editing.
     */
    allowCancel?: boolean,

    /**
     * value to initialize the editor to.
     */
    value?: Post

    /**
     * errors to display in the editor.
     */
    errors?: Errors,

    /**
     * onChange handler.
     */
    onChange?: (e: TextChangedEvent) => void,

    /**
     * onPost is called when the user submits the post.
     */
    onPost?: () => void,

    /**
     * onCancel is called when the user cancels editing.
     */
    onCancel?: () => void

}

/**
 * PostEditor is used by the user to add a new [[Post]] to the system.
 */
export class PostEditor extends Component<PostEditorAttrs> {

    view = new PostEditorView(this);

    values = {

        title: {

            hide: this.attrs.notitle,

            value: this.attrs.value?.title || '',

            error: this.attrs.errors?.title,

            onChange: this.attrs.onChange

        },

        body: {

            value: this.attrs.value?.body,

            error: this.attrs.errors?.body,

            onChange: this.attrs.onChange

        },

        post: {

            allowCancel: this.attrs.allowCancel,

            onPost: this.attrs.onPost,

            onCancel: this.attrs.onCancel

        }

    }

}
