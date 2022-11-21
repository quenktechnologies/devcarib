import { Component } from '@quenk/wml';

import { HTMLElementAttrs } from '@quenk/wml-widgets';

import { Job } from '@board/types/lib/job';

import { JobPageView } from './views';

/**
 * JobPageAttrs
 */
export interface JobPageAttrs extends HTMLElementAttrs {

    /**
     * data is the Job to display.
     */
    data: Job

}

/**
 * JobPage renders the page for a job.
 *
 * This is used for the a job page as well as for previews.
 */
export class JobPage extends Component<JobPageAttrs> {

    view = new JobPageView(this);

}
