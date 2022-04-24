import { Attrs, Component } from '@quenk/wml';

import { Job } from '@board/types/lib/job';

import { RecentJobsPanelView } from './views';

/**
 * RecentJobsPanelAttrs
 */
export interface RecentJobsPanelAttrs extends Attrs {

    /**
     * data is the list of jobs recently posted.
     */
    data?: Job[]

}

/**
 * RecentJobsPanel displays a listing of recent jobs.
 */
export class RecentJobsPanel extends Component<RecentJobsPanelAttrs> {

    view = new RecentJobsPanelView(this);

    values = {

        jobs: this.attrs.data || []

    }

    update(data: Job[]) {

        this.values.jobs = data;

        this.view.invalidate();

    }

}
