import { View } from '@quenk/wml';

import { Record } from '@quenk/noni/lib/data/record';

import { Conf } from '@quenk/potoo/lib/actor/system/vm/conf';
import { Address } from '@quenk/potoo/lib/actor/address';
import { Message } from '@quenk/potoo/lib/actor/message';

import {
    Display,
    HTMLElementViewDelegate,
} from '@quenk/jouvert/lib/app/service/display';

import { Director, RoutingTable } from '@quenk/jouvert/lib/app/service/director';
import { Remote } from '@quenk/jouvert/lib/app/remote';
import { Jouvert, Template } from '@quenk/jouvert';

import { DefaultRequest, HashRouter } from '@quenk/frontend-routers/lib/hash';

import { createAgent } from '@quenk/jhr/lib/browser';

const defaultConf: Partial<Conf> = {
    log_level: Number(process.env.PVM_LOG_LEVEL) || 1,
    long_sink: console
}

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
        public conf = defaultConf) { super(conf); }

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
     * init spawns all the services needed by the application
     */
    init() {

        // TODO: Replace this with library calls once available.
        let viewDelegate = new HTMLElementViewDelegate(this.main);

        viewDelegate.set(this.view);

        this.spawn({

            id: 'views',

            create: () => new Display(new HTMLElementViewDelegate(
                this.view.findById<HTMLDivElement>('content').get()), this)

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

    }

    /**
     * run the application.
     */
    run() {

        this.init();

        this.router.start();

        setTimeout(() => this.router.handleEvent(new Event('hashchanged')), 100);

    }
}
