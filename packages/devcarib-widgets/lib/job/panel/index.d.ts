import { Component } from '@quenk/wml';
import { HTMLElementAttrs } from '@quenk/wml-widgets';
import { Job } from '@board/types/lib/job';
import { JobPanelView } from './panel';
/**
 * JobPanelAttrs for the JobPanel
 */
export interface JobPanelAttrs extends HTMLElementAttrs {
    /**
     * job to display in the panel.
     */
    job: Job;
    /**
     * raw if true, will display the raw unescape html of the job.
     */
    raw?: boolean;
}
/**
 * JobPanel displays detailed information about a job on the job's profile
 * page or preview.
 */
export declare class JobPanel extends Component<JobPanelAttrs> {
    view: JobPanelView;
    className: string;
    data: Job;
    raw: boolean | undefined;
    contentClassName: string;
    timestampClassName: string;
    paymentClassName: string;
    body: {
        id: string;
        className: string;
    };
    /**
     * setContent allows the content displayed in the JobPanel to be displayed.
     */
    setContent(html: string): void;
}
