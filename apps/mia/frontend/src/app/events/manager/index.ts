import {
    Future,
    pure,
    doFuture
} from '@quenk/noni/lib/control/monad/future';
import { Value, Object } from '@quenk/noni/lib/data/jsonx';
import { debounce } from '@quenk/noni/lib/control/timer';

import { Column } from '@quenk/wml-widgets/lib/data/table';
import { Event as ControlEvent } from '@quenk/wml-widgets/lib/control';

import {
    OnCompleteShowData,
    ShiftingOnComplete,
    AfterSearchUpdateWidget
} from '@quenk/jouvert/lib/app/scene/remote/handlers';

import { Event } from '@mia/types/lib/event';

import {
    ActionColumn,
    TitleColumn,
    StartColumn,
    EndColumn,
    HostColumn
} from '../columns';
import { MiaManager } from '../../common/scene/manager';
import { AddEventDialog } from '../dialogs/add';
import { EditEventDialog } from '../dialogs/edit';
import { EventsManagerView } from './views';
import { EventRemoteModel } from '../../remote/models/event';
import { Result } from '@quenk/jouvert/lib/app/remote/model';

export const TIME_SEARCH_DEBOUNCE = 500;

/**
 * EventsManager provides the scene for managing events.
 */
export class EventsManager extends MiaManager<Event, void> {

    name = 'events';

    view = new EventsManagerView(this);

    values = {

        search: {

            onChange: debounce((e: ControlEvent<Value>) => {

                let qry = e.value === '' ? {} : { q: `title:"${e.value}"` };

                this.search(qry);

            }, TIME_SEARCH_DEBOUNCE)

        },

        table: {

            id: 'table',

            title: 'Events',

            data: <Event[]>[],

            add: () => this.spawn(() => new AddEventDialog(this.app, this.self())),

            pages: {
                current: 1,
                currentCount: 0,
                maxPerPage: 50,
                totalPages: 1,
                totalCount: 0
            },

            columns: <Column<Value, Event>[]>[

                new TitleColumn(event => this.editEvent(event)),

                new HostColumn(),

                new StartColumn(),

                new EndColumn(),

                new ActionColumn([
                    {

                        text: "Edit",

                        divider: false,

                        onClick: (data: Event) => this.editEvent(data)

                    },
                    {
                        text: "Remove",

                        divider: true,

                        onClick: (data: Event) =>
                            this.wait(this.removeEvent(<number>data.id))

                    }

                ])

            ]

        },

    }

    //XXX: Not worth the effort right now.
    model = new EventRemoteModel('remote.background', this, [

       // new AfterSearchSetData(data => { this.values.table.data = data }),

      //  new AfterSearchSetPagination(this.values.table),

        new ShiftingOnComplete<void | Result<Event>>([

            new OnCompleteShowData(this),

            new AfterSearchUpdateWidget(this.view, this.values.table.id)

        ])

    ]);

    /**
     * search for job postings that match the specified query criteria.
     *
     * The first time this method is called, results will populate and display
     * the view. Subsequent calls will only update the already displated table.
     */
    search(qry: Object): Future<Event[]> {

        return this.model.search(qry);

    }

    editEvent(job: Event) {

        this.spawn(() => {

            (<any>window).x = new EditEventDialog(this.app, this.self(), job);

            return (<any>window).x;

        });

    }

    removeEvent(id: number): Future<void> {

        let that = this;

        return doFuture<void>(function*() {

            let r = yield that.model.remove(id);

            if (r.code == 200) {

                alert('Event removed!');

                that.reload();

            } else {

                alert('Could not complete request!');

            }

            return pure(<void>undefined);

        });

    }

    run() {

        return this.search({});

    }

}
