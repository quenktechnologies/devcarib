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
    data: Job;
    onChange: (e: Event<Value>) => void;
}
/**
 * PostJobFormPanel displays the job details part of a form for creating
 * a new job.
 */
export declare class PostJobFormPanel extends Component<PostJobFormPanelAttrs> {
    view: PostJobFormPanelView;
    typeOptions: {
        label: string;
        value: string;
    }[];
}
/**
 * PostJobFormCompanyPanel displays the company fields in a panel on the post
 * job form.
 */
export declare class PostJobFormCompanyPanel extends Component<PostJobFormPanelAttrs> {
    view: PostJobFormCompanyPanelView;
}
