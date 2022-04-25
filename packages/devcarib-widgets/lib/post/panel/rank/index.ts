import { Attrs, Component } from '@quenk/wml';

import { Post } from '@converse/types/lib/post';

import { PostRankPanelView } from './views';

/**
 * PostRankPanelAttrs
 */
export interface PostRankPanelAttrs extends Attrs {

    /**
     * title to display.
     */
    title?: string,

    /**
     * data is the list of Posts to initialize the widget with.
     */
    data?: Post[]

}

/**
 * PostRankPanel displays a listing of recent jobs.
 */
export class PostRankPanel extends Component<PostRankPanelAttrs> {

    view = new PostRankPanelView(this);

    values = {

        title: this.attrs.title || 'Posts',

        posts: this.attrs.data || []

    }

    update(data: Post[]) {

        this.values.posts = data;

        this.view.invalidate();

    }

}
