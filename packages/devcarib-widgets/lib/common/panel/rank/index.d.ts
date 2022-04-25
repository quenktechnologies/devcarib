import { Attrs, Component } from '@quenk/wml';
import { RankPanelView } from './views';
/**
 * RankPanelAttrs
 */
export interface RankPanelAttrs extends Attrs {
    /**
     * className to append to the root.
     */
    className?: string;
    /**
     * title to display in the panel.
     */
    title?: string;
}
/**
 * RankPanel is used to display a listing of recent activity in a sidebar.
 *
 * This is used for posts,jobs,events etc.
 */
export declare class RankPanel extends Component<RankPanelAttrs> {
    view: RankPanelView;
    values: {
        title: string | undefined;
        className: string;
    };
}
