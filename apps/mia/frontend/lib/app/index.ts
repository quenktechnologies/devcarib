import { Future, pure } from '@quenk/noni/lib/control/monad/future';
import { noop } from '@quenk/noni/lib/data/function';

import { Address } from '@quenk/potoo/lib/actor/address';
import { Message } from '@quenk/potoo/lib/actor/message';

import {
    ViewService,
    HTMLElementViewDelegate,
} from '@quenk/jouvert/lib/app/service/view';
import { RemoteModelFactory } from '@quenk/jouvert/lib/app/remote/model/factory';
import { Director } from '@quenk/jouvert/lib/app/director';
import { Remote } from '@quenk/jouvert/lib/app/remote';

import { DApplication } from '@quenk/dfront/lib/app';

import { HashRouter } from '@quenk/frontend-routers/lib/hash';

import { createAgent } from '@quenk/jhr/lib/browser';

import { MiaView } from './views/app';
import { routes } from './routes';

export const ACTION_APPROVE = 'approve';
export const ACTION_REMOVE = 'remove';
export const ACTION_SHOW = 'show';

export const RESOURCE_JOBS = '/admin/r/jobs';
export const RESOURCE_JOB = '/admin/r/jobs/{id}';

export const TIME_SEARCH_DEBOUNCE = 500;

const agent = createAgent();

/**
 * OkBody is the format we expect to receive our request results in.
 */
export interface OkBody<D> {

    data: D

}

/**
 * Mia is the main class for the admin application.
 *
 * @param main    - The DOM node that the main application content will reside.
 * @param dialogs - The DOM node that will be used for dialogs.
 */
export class Mia extends DApplication {

    constructor(
        public main: HTMLElement,
        public dialogs: HTMLElement) { super(main); }

    /**
     * view is the WML content to display on the screen.
     */
    view = new MiaView(this);

    /**
     * modelFactory for producing RemoteModels on request.
     */
    modelFactory = RemoteModelFactory.getInstance(this, 'remote.background');

    router = new HashRouter(window, {});

    /**
     * values contains various bits of information used to generate
     * the view.
     */
    values = {

        header: {

            links: {

                Logout: () => this.runFuture(this.logout())

            }

        },

    };

    onError = (e: Error) => {

        console.error(e);
        alert('An error has occurred! Details have been logged to the console.');

    }

    static create(main: HTMLElement, dialogs: HTMLElement): Mia {

        return new Mia(main, dialogs);

    }

    /**
     * logout the user from the application.
     */
    logout(): Future<void> {

        return confirm('Do you want to logout now?') ?
            agent
                .post('/admin/logout', {})
                .chain(() => {

                    window.location.href = '/admin';
                    return pure(<void>undefined);

                }) :
            pure(<void>undefined);

    }

    /**
     * runFuture is used to execute async work wrapped in the Future type.
     */
    runFuture(ft: Future<void>): void {

        ft.fork(this.onError, noop);

    }

    /**
     * tell a message to an actor in the system.
     */
    tell(addr: Address, msg: Message): Mia {

        this.vm.tell(addr, msg);

        return this;

    }

    run() {

        this.spawn({

            id: 'views',

            create: () => new ViewService(
                new HTMLElementViewDelegate(this.main), this)

        });

        this.spawn({

            id: 'dialogs',

            create: () => new ViewService(
                new HTMLElementViewDelegate(this.dialogs), this)

        });

        this.spawn({

            id: 'remote.background',

            create: () => new Remote(agent, this)

        });

        this.spawn({

            id: 'router',

            create: () => new Director(this.services.views,
                this.router, {}, routes, this)

        });

        this.router.start();

        setTimeout(() => this.router.handleEvent(new Event('hashchanged')), 100);

    }

}
