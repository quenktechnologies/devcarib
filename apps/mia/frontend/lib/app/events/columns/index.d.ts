import { Value } from '@quenk/noni/lib/data/jsonx';
import { Column, CellContext } from '@quenk/wml-widgets/lib/data/table';
import { Event } from '@mia/types/lib/event';
import { TitleColumnView, ActionSpec, ActionColumnView } from './views';
export { ActionSpec };
/**
 * TitleColumnAction is a function invoked when the title of a event is clicked
 * on.
 */
export declare type TitleColumnAction = (e: Event) => void;
/**
 * TitleColumn displays the title of the event.
 */
export declare class TitleColumn implements Column<Value, Event> {
    action: TitleColumnAction;
    constructor(action: TitleColumnAction);
    name: string;
    heading: string;
    cellFragment: (c: CellContext<Value, Event>) => TitleColumnView;
}
/**
 * StartColumn
 */
export declare class StartColumn implements Column<Value, Event> {
    name: string;
    heading: string;
    format: (val: Value) => string;
    sort: string;
}
/**
 * EndColumn
 */
export declare class EndColumn implements Column<Value, Event> {
    name: string;
    heading: string;
    format: (val: Value) => string;
    sort: string;
}
/**
 * HostColumn
 */
export declare class HostColumn implements Column<Value, Event> {
    name: string;
    heading: string;
}
/**
 * ActionColumn displays a drop-down menu with actions that can be taken on a
 * single event.
 */
export declare class ActionColumn implements Column<Value, Event> {
    actions: ActionSpec[];
    constructor(actions: ActionSpec[]);
    name: string;
    heading: string;
    cellFragment: (c: CellContext<Value, Event>) => ActionColumnView;
}
