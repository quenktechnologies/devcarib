import { Object, Value } from '@quenk/noni/lib/data/jsonx';
import { Column, CellContext } from '@quenk/wml-widgets/lib/data/table';
import { ActionSpec, ActionColumnView } from './columns/views/columns';
export { ActionSpec };
/**
 * ActionColumn displays a drop-down menu with actions that can be taken on a
 * table entry.
 */
export declare class ActionColumn<T extends Object> implements Column<Value, T> {
    actions: ActionSpec<T>[];
    constructor(actions: ActionSpec<T>[]);
    name: string;
    heading: string;
    cellFragment: (c: CellContext<Value, T>) => ActionColumnView<T>;
}
