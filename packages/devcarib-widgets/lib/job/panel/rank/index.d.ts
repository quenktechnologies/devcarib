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
    data?: Job[];
}
/**
 * JobRankPanel displays a listing of recent jobs.
 */
export declare class JobRankPanel extends Component<JobRankPanelAttrs> {
    view: JobRankPanelView;
    values: {
        jobs: Job[];
    };
    update(data: Job[]): void;
}
