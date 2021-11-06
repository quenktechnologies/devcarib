import { Future } from '@quenk/noni/lib/control/monad/future';
import { Value, Object } from '@quenk/noni/lib/data/jsonx';
import { SearchResult } from '@quenk/jouvert/lib/app/remote/model';
import { Column } from '@quenk/wml-widgets/lib/data/table';
import { Event } from '@quenk/wml-widgets/lib/control';
import { ExecOnComplete } from '@quenk/dfront/lib/app/scene/remote/handlers';
import { Job } from '@board/types/lib/job';
import { MiaManager } from '../../common/scene/manager';
import { JobsManagerView } from './views/jobs';
export declare const ACTION_APPROVE = "approve";
export declare const ACTION_REMOVE = "remove";
export declare const ACTION_SHOW = "show";
export declare const TIME_SEARCH_DEBOUNCE = 500;
/**
 * OkBody is the format we expect to receive our request results in.
 */
export interface OkBody<D> {
    data: D;
}
/**
 * AlertOnSearchNoData tells the user their search yielded no results.
 */
export declare class AlertOnSearchNoData<D extends Object> extends ExecOnComplete<SearchResult<D>> {
    constructor();
}
/**
 * JobsManager provides the screen for managing job posts created within
 * the system.
 */
export declare class JobsManager extends MiaManager<void> {
    /**
     * view is the WML content to display on the screen.
     */
    view: JobsManagerView;
    jobsModel: import("@quenk/jouvert/lib/app/remote/model").RemoteModel<Object>;
    values: {
        search: {
            onChange: import("@quenk/noni/lib/data/function").Function<Event<Value>, void>;
        };
        table: {
            id: string;
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
    onError: (e: Error) => void;
    /**
     * search for job postings that match the specified query criteria.
     *
     * The first time this method is called, results will populate and display
     * the view. Subsequent calls will only update the already displated table.
     */
    search(qry: object): Future<void>;
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
    editJob(data: Job): void;
    /**
     * removeJob permenantly removes a job from the site.
     */
    removeJob(id: number): Future<void>;
    /**
     * runFuture is used to execute async work wrapped in the Future type.
     */
    runFuture<T>(ft: Future<T>): void;
    run(): Future<void>;
}
