import { Value } from '@quenk/noni/lib/data/jsonx';
import { Column, CellContext } from '@quenk/wml-widgets/lib/data/table';
import { Job } from '@board/types/lib/job';
import { TitleColumnView, ActionSpec, ActionColumnView } from './views';
export { ActionSpec };
/**
 * TitleColumnAction is a function invoked when the title of a job is clicked
 * on.
 */
export type TitleColumnAction = (p: Job) => void;
/**
 * TitleColumn displays the title of the job.
 */
export declare class TitleColumn implements Column<Value, Job> {
    action: TitleColumnAction;
    constructor(action: TitleColumnAction);
    name: string;
    heading: string;
    cellFragment: (c: CellContext<Value, Job>) => TitleColumnView;
}
/**
 * CompanyColumn displays the company name.
 */
export declare class CompanyColumn implements Column<Value, Job> {
    name: string;
    heading: string;
}
/**
 * StatusColumn displays the approval status of the job.
 */
export declare class StatusColumn implements Column<Value, Job> {
    name: string;
    heading: string;
}
/**
 * ActionColumn displays a drop-down menu with actions that can be taken on a
 * single job.
 */
export declare class ActionColumn implements Column<Value, Job> {
    actions: ActionSpec[];
    constructor(actions: ActionSpec[]);
    name: string;
    heading: string;
    cellFragment: (c: CellContext<Value, Job>) => ActionColumnView;
}
