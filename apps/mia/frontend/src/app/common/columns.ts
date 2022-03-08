import { Object, Value } from '@quenk/noni/lib/data/jsonx';

import { Column, CellContext } from '@quenk/wml-widgets/lib/data/table';

import { ActionSpec, ActionColumnView } from './columns/views/columns';

export { ActionSpec }

/**
 * ActionColumn displays a drop-down menu with actions that can be taken on a
 * table entry.
 */
export class ActionColumn<T extends Object> implements Column<Value, T> {

    constructor(public actions: ActionSpec<T>[]) { }

    name = '';

    heading = 'Actions';

    cellFragment = (c: CellContext<Value, T>) => new ActionColumnView({

        actions: this.actions,

        data: c.datum

    });

}
