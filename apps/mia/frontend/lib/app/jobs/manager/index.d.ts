import { Future } from '@quenk/noni/lib/control/monad/future';
import { Value, Object } from '@quenk/noni/lib/data/jsonx';
import { Column } from '@quenk/wml-widgets/lib/data/table';
import { Event } from '@quenk/wml-widgets/lib/control';
import { Job } from '@board/types/lib/job';
import { MiaManager } from '../../common/scene/manager';
import { JobsManagerView } from './views/jobs';
export declare const TIME_SEARCH_DEBOUNCE = 500;
/**
 * JobsManager provides the screen for managing job posts.
 */
export declare class JobsManager extends MiaManager<Job, void> {
    name: string;
    view: JobsManagerView;
    values: {
        search: {
            onChange: import("@quenk/noni/lib/data/function").Function<Event<Value>, void>;
        };
        table: {
            id: string;
            title: string;
            add: () => void;
            data: Job[];
            pagination: {
                current: {
                    count: number;
                    page: number;
                    limit: number;
                };
                total: {
                    count: number;
                    pages: number;
                };
            };
            columns: Column<Value, Job>[];
        };
    };
    model: import("@quenk/jouvert/lib/app/remote/model").RemoteModel<Object>;
    /**
     * search for job postings that match the specified query criteria.
     *
     * The first time this method is called, results will populate and display
     * the view. Subsequent calls will only update the already displated table.
     */
    search(qry: Object): Future<Job[]>;
    /**
     * showJob displays a single Job in a dialog.
     */
    showJob(data: Job): void;
    /**
     * approveJob sets the approved flag on a job to true.
     *
     * Once this is done the job will show on the site.
     */
    approveJob(id: number): Future<void>;
    /**
     * editJob brings up the dialog editor to quickly edit the title and body
     * of a job.
     */
    editJob(job: Job): void;
    /**
     * removeJob permenantly removes a job from the site.
     */
    removeJob(id: number): Future<void>;
    run(): Future<Job[]>;
}
