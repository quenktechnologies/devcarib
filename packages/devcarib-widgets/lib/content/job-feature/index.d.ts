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
    text?: string;
}
/**
 * JobFeature is used to display a feature of a job such as the job type.
 */
export declare class JobFeature extends Component<JobFeatureAttrs> {
    view: JobFeatureView;
    className: string;
    text: string | undefined;
}
