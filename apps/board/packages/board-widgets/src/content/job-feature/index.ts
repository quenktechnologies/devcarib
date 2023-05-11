import { Component } from '@quenk/wml';

import { HTMLElementAttrs } from '@quenk/wml-widgets';

import { JobFeatureView } from './views';

/**
 * JobFeatureAttrs
 */
export interface JobFeatureAttrs extends HTMLElementAttrs {

    /**
     * text display
     */
    text?: string

}

/**
 * JobFeature is used to display a feature of a job such as the job type.
 */
export class JobFeature extends Component<JobFeatureAttrs> {

    view = new JobFeatureView(this);

        className = 'devcarib-job-feature';

    text = this.attrs.text;

}
