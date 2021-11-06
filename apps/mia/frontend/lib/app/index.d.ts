import { Future } from '@quenk/noni/lib/control/monad/future';
import { Address } from '@quenk/potoo/lib/actor/address';
import { Message } from '@quenk/potoo/lib/actor/message';
import { RemoteModelFactory } from '@quenk/jouvert/lib/app/remote/model/factory';
import { DApplication } from '@quenk/dfront/lib/app';
import { HashRouter } from '@quenk/frontend-routers/lib/hash';
import { MiaView } from './views/app';
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
 * Mia is the main class for the admin application.
 *
 * @param main    - The DOM node that the main application content will reside.
 * @param dialogs - The DOM node that will be used for dialogs.
 */
export declare class Mia extends DApplication {
    main: HTMLElement;
    dialogs: HTMLElement;
    constructor(main: HTMLElement, dialogs: HTMLElement);
    /**
     * view is the WML content to display on the screen.
     */
    view: MiaView;
    /**
     * modelFactory for producing RemoteModels on request.
     */
    modelFactory: RemoteModelFactory<import("@quenk/noni/lib/data/jsonx").Object>;
    router: HashRouter;
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
    };
    onError: (e: Error) => void;
    static create(main: HTMLElement, dialogs: HTMLElement): Mia;
    /**
     * logout the user from the application.
     */
    logout(): Future<void>;
    /**
     * runFuture is used to execute async work wrapped in the Future type.
     */
    runFuture(ft: Future<void>): void;
    /**
     * tell a message to an actor in the system.
     */
    tell(addr: Address, msg: Message): Mia;
    run(): void;
}
