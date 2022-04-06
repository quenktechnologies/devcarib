import { Attrs, Component } from '@quenk/wml';

import { Post } from '@converse/types/lib/post';

import { PostPanelView } from './views';

/**
 * PostPanelAttrs
 */
export interface PostPanelAttrs extends Attrs {
    /**
     * data to initialize the editor to.
     */
    data: Post
}

/**
 * PostPanel displays the contents of a post meant to be viewed as a stream.
 */
export class PostPanel extends Component<PostPanelAttrs> {

    view = new PostPanelView(this);

    values = {

        data: this.attrs.data

    }

}
