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
    title?: string;
    /**
     * data is the list of Posts to initialize the widget with.
     */
    data?: Post[];
}
/**
 * PostRankPanel displays a listing of recent jobs.
 */
export declare class PostRankPanel extends Component<PostRankPanelAttrs> {
    view: PostRankPanelView;
    values: {
        title: string;
        posts: Post[];
    };
    update(data: Post[]): void;
}
