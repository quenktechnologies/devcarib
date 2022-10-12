import { View } from '@quenk/wml';
import { Record } from '@quenk/noni/lib/data/record';
import { Object } from '@quenk/noni/lib/data/jsonx';
import { Conf } from '@quenk/potoo/lib/actor/system/vm/conf';
import { Address } from '@quenk/potoo/lib/actor/address';
import { Message } from '@quenk/potoo/lib/actor/message';
import { CompleteHandlerSpec, RemoteModelFactory } from '@quenk/jouvert/lib/app/remote/model/factory';
import { Paths } from '@quenk/jouvert/lib/app/remote/model';
import { RoutingTable } from '@quenk/jouvert/lib/app/service/director';
import { Jouvert, Template } from '@quenk/jouvert';
import { DefaultRequest, HashRouter } from '@quenk/frontend-routers/lib/hash';
/**
 * DevCarib serves as the parent class for the various frontend SPAs.
 *
 * This class sets up the actor system, view management and routing so
 * extending classes don't have to repeat the same steps across apps.
 *
 * @param main       - DOM node for the application content.
 * @param dialogs    - DOM node for dialogs.
 * @param conf       - Potoo compatiable configuration object.
 */
export declare abstract class DevCarib extends Jouvert {
    main: HTMLElement;
    dialogs: HTMLElement;
    conf: Partial<Conf>;
    constructor(main: HTMLElement, dialogs: HTMLElement, conf?: Partial<Conf>);
    /**
     * view is the main view of the application.
     *
     * This view should have an element with the id "content" that will be
     * used to generate the main content.
     */
    abstract view: View;
    /**
     * routes table for the router.
     */
    abstract routes: RoutingTable<DefaultRequest>;
    /**
     * agent used to make the main XHR requests.
     */
    agent: import("@quenk/jhr/lib/agent").Agent<object, import("@quenk/noni/lib/data/json").Object>;
    /**
     * router for various screens of the application.
     */
    router: HashRouter;
    /**
     * services keeps the address of service actors within the system.
     */
    services: Record<Address>;
    /**
     * @private
     */
    get models(): RemoteModelFactory<Object>;
    /**
     * getModel is a factory method for creating [[RemoteModel]] instances.
     */
    getModel<T extends Object>(paths: Paths, handler?: CompleteHandlerSpec<T>, _context?: Object): import("@quenk/jouvert/lib/app/remote/model").RemoteModel<Object>;
    /**
     * spawn an actor directly from the root.
     *
     * Any actor spawned here is automatically added to the services map.
     */
    spawn(t: Template): Address;
    /**
     * tell a message to an actor in the system.
     */
    tell(addr: Address, msg: Message): DevCarib;
    /**
     * init spawns all the services needed by the application
     */
    init(): void;
    /**
     * run the application.
     */
    run(): void;
}
