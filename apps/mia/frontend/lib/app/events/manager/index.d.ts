import { Future } from '@quenk/noni/lib/control/monad/future';
import { Value, Object } from '@quenk/noni/lib/data/jsonx';
import { Column } from '@quenk/wml-widgets/lib/data/table';
import { Event as ControlEvent } from '@quenk/wml-widgets/lib/control';
import { Event } from '@mia/types/lib/event';
import { MiaManager } from '../../common/scene/manager';
import { EventsManagerView } from './views';
export declare const TIME_SEARCH_DEBOUNCE = 500;
/**
 * EventsManager provides the scene for managing events.
 */
export declare class EventsManager extends MiaManager<Event, void> {
    name: string;
    view: EventsManagerView;
    values: {
        search: {
            onChange: import("@quenk/noni/lib/data/function").Function<ControlEvent<Value>, void>;
        };
        table: {
            id: string;
            title: string;
            data: Event[];
            add: () => string;
            pagination: {
                current: {
                    count: number;
                    page: number;
                    limit: number;
                };
                total: {
                    count: number;
                    pages: number;
                };
            };
            columns: Column<Value, Event>[];
        };
    };
    model: import("@quenk/jouvert/lib/app/remote/model").RemoteModel<Object>;
    /**
     * search for job postings that match the specified query criteria.
     *
     * The first time this method is called, results will populate and display
     * the view. Subsequent calls will only update the already displated table.
     */
    search(qry: Object): Future<Event[]>;
    editEvent(job: Event): void;
    removeEvent(id: number): Future<void>;
    run(): Future<Event[]>;
}
