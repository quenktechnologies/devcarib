import { Attrs, Component } from '@quenk/wml';

import { Job } from '@board/types/lib/job';

import { JobRankPanelView } from './views';

/**
 * JobRankPanelAttrs
 */
export interface JobRankPanelAttrs extends Attrs {

    /**
     * data is the list of jobs recently posted.
     */
    data?: Job[]

}

/**
 * JobRankPanel displays a listing of recent jobs.
 */
export class JobRankPanel extends Component<JobRankPanelAttrs> {

    view = new JobRankPanelView(this);

    values = {

        jobs: this.attrs.data || []

    }

    update(data: Job[]) {

        this.values.jobs = data;

        this.view.invalidate();

    }

}
