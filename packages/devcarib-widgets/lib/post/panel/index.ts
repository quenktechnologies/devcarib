import { Attrs, Component } from '@quenk/wml';

import { clone } from '@quenk/noni/lib/data/record';

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
    editable?: boolean,

    /**
     * data to initialize panel with.
     */
    data: Post,

    /**
     * onEdit if specified is called when the user submits changes to the
     * comment.
     */
    onEdit?: (changes: Post) => void
}

/**
 * PostPanel displays a post made by a user.
 */
export class PostPanel extends Component<PostPanelAttrs> {

    readView = new PostPanelView(this);

    editView = new EditPostPanelView(this);

    view = this.readView;

    values = {

        editable: this.attrs.editable,

        editing: false,

        data: this.attrs.data,

        editor: {

            data: clone(this.attrs.data),

            onChange: (evt: TextChangedEvent) => {

                this.values.editor.data[evt.name] = evt.value;

            },

            onPost: () => {

                this.values.data = clone(this.values.editor.data);

                if (this.attrs.onEdit)
                    this.attrs.onEdit(clone(this.values.editor.data));

                (<Element>this.view.tree).replaceWith(this.readView.render());

                this.view = this.readView;

            },

            onCancel: ()=> {

                this.values.editor.data = clone(this.values.data);

                (<Element>this.view.tree).replaceWith(this.readView.render());

                this.view = this.readView;

            },

            show: () => {

                (<Element>this.view.tree).replaceWith(this.editView.render());

                this.view = this.editView;

            }

        }

    }

}
