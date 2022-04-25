import { Attrs, Component } from '@quenk/wml';

import { concat } from '@quenk/wml-widgets/lib/util';

import { RankPanelView } from './views';

/**
 * RankPanelAttrs
 */
export interface RankPanelAttrs extends Attrs {

    /**
     * className to append to the root.
     */
    className?: string,

    /**
     * title to display in the panel.
     */
    title?: string

}

/**
 * RankPanel is used to display a listing of recent activity in a sidebar.
 *
 * This is used for posts,jobs,events etc.
 */
export class RankPanel
    extends
    Component<RankPanelAttrs> {

    view = new RankPanelView(this);

    values = {

        title: this.attrs.title,

        className: concat('devcarib-rank-panel', <string>this.attrs.className)

    }

}
