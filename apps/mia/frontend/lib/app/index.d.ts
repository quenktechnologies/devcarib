import { Record } from '@quenk/noni/lib/data/record';
import { Object } from '@quenk/noni/lib/data/jsonx';
import { Future } from '@quenk/noni/lib/control/monad/future';
import { Address } from '@quenk/potoo/lib/actor/address';
import { Message } from '@quenk/potoo/lib/actor/message';
import { CompleteHandlerSpec, RemoteModelFactory } from '@quenk/jouvert/lib/app/remote/model/factory';
import { Jouvert, Template } from '@quenk/jouvert';
import { HashRouter } from '@quenk/frontend-routers/lib/hash';
import { MiaView } from './views/app';
/**
 * Mia is the main class for the admin application.
 *
 * @param appNode    - The DOM node for the base application content (layout).
 * @param dialogNode - The DOM node that will be used for dialogs.
 */
export declare class Mia extends Jouvert {
    appNode: HTMLElement;
    dialogNode: HTMLElement;
    constructor(appNode: HTMLElement, dialogNode: HTMLElement);
    /**
     * view is the WML content to display on the screen.
     */
    view: MiaView;
    /**
     * router for various application views.
     */
    router: HashRouter;
    /**
     * services map used to look up service actors.
     */
    services: Record<Address>;
    get models(): RemoteModelFactory<Object>;
    /**
     * values contains various bits of information used to generate
     * the view.
     */
    values: {
        header: {
            /**
             * links for the main navigation area.
             */
            links: {
                Jobs: string;
                Users: string;
            };
            logout: () => void;
        };
    };
    onError: (e: Error) => void;
    static create(appNode: HTMLElement, dialogNode: HTMLElement): Mia;
    /**
     * getModel provides a RemoteModel instance for the specified path.
     */
    getModel<T extends Object>(path: string, handler?: CompleteHandlerSpec<T>): import("@quenk/jouvert/lib/app/remote/model").RemoteModel<Object>;
    /**
     * logout the user from the application.
     */
    logout(): Future<void>;
    /**
     * runFuture is used to execute async work wrapped in the Future type.
     */
    runFuture(ft: Future<void>): void;
    /**
     * Any actor spawned by the app directly's address is stored in the services
     * map.
     */
    spawn(t: Template): Address;
    /**
     * tell a message to an actor in the system.
     */
    tell(addr: Address, msg: Message): Mia;
    /**
     * run puts up the applications base view and spawns all the needed service
     * actors for routing, remote requests etc.
     */
    run(): void;
}
