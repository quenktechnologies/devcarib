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
    data?: Event[];
}
/**
 * EventRankPanel displays a listing of ranked events.
 */
export declare class EventRankPanel extends Component<EventRankPanelAttrs> {
    view: EventRankPanelView;
    values: {
        events: Event[];
    };
    update(data: Event[]): void;
}
