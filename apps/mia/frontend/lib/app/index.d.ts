import { Future } from '@quenk/noni/lib/control/monad/future';
import { Value } from '@quenk/noni/lib/data/jsonx';
import { Address } from '@quenk/potoo/lib/actor/address';
import { Message } from '@quenk/potoo/lib/actor/message';
import { JApp, Template } from '@quenk/jouvert/lib/app';
import { View } from '@quenk/wml';
import { Column } from '@quenk/wml-widgets/lib/data/table';
import { Event } from '@quenk/wml-widgets/lib/control';
import { Job } from '@board/types/lib/job';
import { BoardAdminView } from './views/app';
export declare const ACTION_APPROVE = "approve";
export declare const ACTION_REMOVE = "remove";
export declare const ACTION_SHOW = "show";
export declare const RESOURCE_JOBS = "/admin/r/jobs";
export declare const RESOURCE_JOB = "/admin/r/jobs/{id}";
export declare const TIME_SEARCH_DEBOUNCE = 500;
/**
 * OkBody is the format we expect to receive our request results in.
 */
export interface OkBody<D> {
    data: D;
}
/**
 * BoardAdmin is the main class for the admin application.
 *
 * @param main    - The DOM node that the main application content will reside.
 * @param dialogs - The DOM node that will be used for dialogs.
 */
export declare class BoardAdmin extends JApp {
    main: Node;
    dialogs: Node;
    constructor(main: Node, dialogs: Node);
    /**
     * view is the WML content to display on the screen.
     */
    view: BoardAdminView;
    /**
     * modelFactory for producing RemoteModels on request.
     */
    modelFactory: any;
    /**
     * values contains various bits of information used to generate
     * the view.
     */
    values: {
        header: {
            links: {
                Logout: () => void;
            };
        };
        search: {
            onChange: import("@quenk/noni/lib/data/function").Function<Event<Value>, void>;
        };
        table: {
            id: string;
            data: Job[];
            columns: Column<Value, Job>[];
        };
    };
    onError: (e: Error) => void;
    static create(main: Node, dialogs: Node): BoardAdmin;
    /**
     * searchJobs in the database.
     *
     * Differs from loadJobs() by updating only the table, not the whole
     * view on success.
     *
     * @param qry - The query object to include in the GET request.
     */
    searchJobs(qry?: object): Future<void>;
    /**
     * loadInitialJobs from the database into the table.
     */
    loadInitialJobs(): Future<void>;
    /**
     * logout the user from the application.
     */
    logout(): Future<void>;
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
     * show a View on the application's screen.
     */
    show(view: View): void;
    /**
     * refresh reloads and displays the application.
     */
    refresh(): void;
    /**
     * runFuture is used to execute async work wrapped in the Future type.
     */
    runFuture(ft: Future<void>): void;
    /**
     * tell a message to an actor in the system.
     */
    tell(addr: Address, msg: Message): BoardAdmin;
    /**
     * spawn a root child actor given its Template.
     */
    spawn(t: Template): BoardAdmin;
    /**
     * @override
     */
    run(): void;
}
