import { Attrs, Component } from '@quenk/wml';

import { Comment } from '@converse/types/lib/comment';

import { CommentPanelView } from './views';

/**
 * CommentPanelAttrs
 */
export interface CommentPanelAttrs extends Attrs {

    /**
     * data to initialize panel with.
     */
    data: Comment
}

/**
 * CommentPanel displays a comment left by a user.
 */
export class CommentPanel extends Component<CommentPanelAttrs> {

    view = new CommentPanelView(this);

    values = {

        data: this.attrs.data

    }

}
