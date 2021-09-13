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
    job: Job,

    /**
     * raw if true, will display the raw unescape html of the job.
     */
    raw?: boolean

}

/**
 * JobPanel displays detailed information about a job on the job's profile
 * page or preview.
 */
export class JobPanel extends Component<JobPanelAttrs> {

    view = new JobPanelView(this);

    values = {

        data: this.attrs.job,

        raw: this.attrs.raw

    }

    /**
     * setContent allows the content displayed in the JobPanel to be displayed.
     */
    setContent(html: string) {

        let mcontent = this.view.findById<HTMLElement>('content');

        if (mcontent.isJust())
            mcontent.get().innerHTML = html;

        console.error("---> ", mcontent.get().innerHTML);

    }

}