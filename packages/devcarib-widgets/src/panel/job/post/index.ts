import { Value } from '@quenk/noni/lib/data/jsonx';

import { Component } from '@quenk/wml';

import { HTMLElementAttrs } from '@quenk/wml-widgets';
import { Event } from '@quenk/wml-widgets/lib/control';

import { Job } from '@board/types/lib/job';

import { PostJobFormPanelView } from './views/job';
import { PostJobFormCompanyPanelView } from './views/company';

/**
 * PostJobFormPanelAttrs
 */
export interface PostJobFormPanelAttrs extends HTMLElementAttrs {

    data: Job

    onChange: (e: Event<Value>) => void

}

/**
 * PostJobFormPanel displays the job details part of a form for creating
 * a new job.
 */
export class PostJobFormPanel extends Component<PostJobFormPanelAttrs> {

    view = new PostJobFormPanelView(this);

    typeOptions = [

            { label: 'Full-Time', value: 'Full-Time' },
            { label: 'Part-Time', value: 'Part-Time' },
            { label: 'Contractor', value: 'Contractor' },
            { label: 'Co-Founder', value: 'Co-Founder' },
            { label: 'Contributor', value: 'Contributor' },
            { label: 'Volunteer', value: 'Volunteer' },

        ];

}

/**
 * PostJobFormCompanyPanel displays the company fields in a panel on the post
 * job form.
 */
export class PostJobFormCompanyPanel
    extends
    Component<PostJobFormPanelAttrs> {

    view = new PostJobFormCompanyPanelView(this);

}
