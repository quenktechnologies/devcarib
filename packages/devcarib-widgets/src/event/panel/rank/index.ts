import { Attrs, Component } from '@quenk/wml';

import { Event } from '@converse/types/lib/event';

import { EventRankPanelView } from './views';

/**
 * EventRankPanelAttrs
 */
export interface EventRankPanelAttrs extends Attrs {

    /**
     * data is the list used to initalize the widget.
     */
    data?: Event[]

}

/**
 * EventRankPanel displays a listing of ranked events.
 */
export class EventRankPanel extends Component<EventRankPanelAttrs> {

    view = new EventRankPanelView(this);

    values = {

        events: this.attrs.data || []

    }

    update(data: Event[]) {

        this.values.events = data;

        this.view.invalidate();

    }

}
