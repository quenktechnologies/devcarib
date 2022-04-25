import { Future } from '@quenk/noni/lib/control/monad/future';
import { DevCarib } from '@devcarib/frontend/lib/app';
import { MiaView } from './views/app';
/**
 * Mia application main class.
 */
export declare class Mia extends DevCarib {
    view: MiaView;
    routes: import("@quenk/jouvert/lib/app/service/director").RoutingTable<import("@quenk/frontend-routers/lib/hash").Request>;
    values: {
        header: {
            /**
             * links for the main navigation area.
             */
            links: {
                Jobs: string;
                Users: string;
                Events: string;
            };
            logout: () => void;
        };
    };
    onError: (e: Error) => void;
    static create(appNode: HTMLElement, dialogNode: HTMLElement): Mia;
    /**
     * logout the user from the application.
     *
     * TODO: better
     */
    logout(): Future<void>;
    /**
     * runFuture is used to execute async work wrapped in the Future type.
     */
    runFuture(ft: Future<void>): void;
}
