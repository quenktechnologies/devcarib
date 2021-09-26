import { Value } from '@quenk/noni/lib/data/jsonx';

import { Column, CellContext } from '@quenk/wml-widgets/lib/data/table';

import { Job } from '@board/types/lib/job';

import { TitleColumnView, ActionSpec, ActionColumnView } from './views';

export { ActionSpec }

/**
 * TitleColumnAction is a function invoked when the title of a job is clicked
 * on.
 */
export type TitleColumnAction = (p: Job) => void;

/**
 * TitleColumn displays the title of the job.
 */
export class TitleColumn implements Column<Value, Job> {

    constructor(public action: TitleColumnAction) { }

    name = 'title';

    heading = 'Title';

    cellFragment = (c: CellContext<Value, Job>) => new TitleColumnView({

        job: c.datum,

        onClick: () => this.action(c.datum)

    });

}

/**
 * CompanyColumn displays the company name.
 */
export class CompanyColumn implements Column<Value, Job> {

    name = 'company';

    heading = 'Company';

}

/**
 * StatusColumn displays the approval status of the job.
 */
export class StatusColumn implements Column<Value, Job> {

    name = 'status';

    heading = 'Status';

}

/**
 * ActionColumn displays a drop-down menu with actions that can be taken on a
 * single job.
 */
export class ActionColumn implements Column<Value, Job> {

    constructor(public actions: ActionSpec[]) { }

    name = '';

    heading = 'Actions';

    cellFragment = (c: CellContext<Value, Job>) => new ActionColumnView({

        actions: this.actions,

        job: c.datum

    });

}
