import * as moment from 'moment';

import { Value } from '@quenk/noni/lib/data/jsonx';

import { Column, CellContext } from '@quenk/wml-widgets/lib/data/table';

import { Event } from '@mia/types/lib/event';

import { TitleColumnView, ActionSpec, ActionColumnView } from './views';

export { ActionSpec }

/**
 * TitleColumnAction is a function invoked when the title of a event is clicked
 * on.
 */
export type TitleColumnAction = (e: Event) => void;

/**
 * TitleColumn displays the title of the event.
 */
export class TitleColumn implements Column<Value, Event> {

    constructor(public action: TitleColumnAction) { }

    name = 'title';

    heading = 'Title';

    cellFragment = (c: CellContext<Value, Event>) => new TitleColumnView({

        event: c.datum,

        onClick: () => this.action(c.datum)

    });

}

/**
 * StartColumn
 */
export class StartColumn implements Column<Value, Event> {

    name = 'startDateTime';

    heading = 'Start';

    format = (val: Value) => moment(<string>val).calendar();

    sort = 'start'

}

/**
 * EndColumn
 */
export class EndColumn implements Column<Value, Event> {

    name = 'endDateTime';

    heading = 'End';

    format = (val: Value) => val ? moment(<string>val).calendar() : '';

    sort = 'event'

}

/**
 * HostColumn
 */
export class HostColumn implements Column<Value, Event> {

    name = 'host';

    heading = 'Host';

}


/**
 * ActionColumn displays a drop-down menu with actions that can be taken on a
 * single event.
 */
export class ActionColumn implements Column<Value, Event> {

    constructor(public actions: ActionSpec[]) { }

    name = '';

    heading = 'Actions';

    cellFragment = (c: CellContext<Value, Event>) => new ActionColumnView({

        actions: this.actions,

        event: c.datum

    });

}
