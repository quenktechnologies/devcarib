import { View } from '@quenk/wml';

import { Record } from '@quenk/noni/lib/data/record';
import { Object } from '@quenk/noni/lib/data/jsonx';

import { Address } from '@quenk/potoo/lib/actor/address';
import { Message } from '@quenk/potoo/lib/actor/message';

import {
    Display,
    HTMLElementViewDelegate,
    WMLLayoutViewDelegate
} from '@quenk/jouvert/lib/app/service/display';
import {
    CompleteHandlerSpec,
    RemoteModelFactory
} from '@quenk/jouvert/lib/app/remote/model/factory';
import { Director, RoutingTable } from '@quenk/jouvert/lib/app/service/director';
import { Remote } from '@quenk/jouvert/lib/app/remote';
import { Jouvert, Template } from '@quenk/jouvert';

import { MainLayout } from '@quenk/wml-widgets/lib/layout/main';

import { DefaultRequest, HashRouter } from '@quenk/frontend-routers/lib/hash';

import { createAgent } from '@quenk/jhr/lib/browser';

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
export abstract class DevCarib extends Jouvert {

    constructor(
        public main: HTMLElement,
        public dialogs: HTMLElement,
        public conf = { log: { level: 1, logger: console } }) { super(conf); }

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
    agent = createAgent();

    /**
     * router for various screens of the application.
     */
    router = new HashRouter(window, {});

    /**
     * services keeps the address of service actors within the system.
     */
    services: Record<Address> = {};

    /**
     * @private
     */
    get models() {
        return RemoteModelFactory
            .getInstance(this, this.services['remote.background']);
    }

    /**
     * getModel is a factory method for creating [[RemoteModel]] instances.
     */
    getModel<T extends Object>(path: string, handler?: CompleteHandlerSpec<T>) {

        return this.models.create(path, handler);

    }

    /**
     * spawn an actor directly from the root.
     *
     * Any actor spawned here is automatically added to the services map.
     */
    spawn(t: Template): Address {

        let addr = super.spawn(t);

        this.services[<string>t.id] = addr;

        return addr;

    }

    /**
     * tell a message to an actor in the system.
     */
    tell(addr: Address, msg: Message): DevCarib {

        this.vm.tell(addr, msg);

        return this;

    }

    /**
     * run puts up the applications base view and spawns all the needed service
     * actors for routing, remote requests etc.
     */
    run() {

        // TODO: Replace this with library calls once available.
        let viewDelegate = new HTMLElementViewDelegate(this.main);

        viewDelegate.set(this.view);

        this.spawn({

            id: 'views',

            create: () => new Display(new WMLLayoutViewDelegate(
                this.view.findById<MainLayout>('content').get()), this)

        });

        this.spawn({

            id: 'dialogs',

            create: () => new Display(
                new HTMLElementViewDelegate(this.dialogs), this)

        });

        this.spawn({

            id: 'remote.background',

            create: () => new Remote(this.agent, this)

        });

        this.spawn({

            id: 'router',

            create: () => new Director(this.services.views,
                this.router, {}, this.routes, this)

        });

        this.router.start();

        setTimeout(() => this.router.handleEvent(new Event('hashchanged')), 100);

    }

}
