import { Component } from '@quenk/wml';
import { HTMLElementAttrs } from '@quenk/wml-widgets';
import { Path } from '@quenk/noni/lib/data/record/path';
import { Job } from '@board/types/lib/job';
import { JobSummaryPanelView } from './views';
/**
 * JobSummaryPanelAttrs
 */
export interface JobSummaryPanelAttrs extends HTMLElementAttrs {
    /**
     * job to display a summary for.
     */
    job: Job;
    /**
     * url if specified will be used in constructing the url for the job.
     *
     * This should be a template that will be interpolat()'d against the job.
     */
    url?: Path;
}
/**
 * JobSummaryPanel is used to display details of a job posting usually in a list.
 */
export declare class JobSummaryPanel extends Component<JobSummaryPanelAttrs> {
    view: JobSummaryPanelView;
    values: {
        className: string;
        job: Job;
        url: string;
        meta: {
            className: string;
        };
    };
}
