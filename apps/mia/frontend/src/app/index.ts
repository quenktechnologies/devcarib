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
 * Mia is the main class for the admin application.
 *
 * @param appNode    - The DOM node for the base application content (layout).
 * @param dialogNode - The DOM node that will be used for dialogs.
 */
export class Mia extends DApplication {

    constructor(
        public appNode: HTMLElement,
        public dialogNode: HTMLElement) { super(appNode); }

    /**
     * view is the WML content to display on the screen.
     */
    view = new MiaView(this);

    /**
     * modelFactory for producing RemoteModels on request.
     */
    modelFactory = RemoteModelFactory.getInstance(this, 'remote.background');

    /**
     * router for various application views.
     */
    router = new HashRouter(window, {});

    /**
     * values contains various bits of information used to generate
     * the view.
     */
    values = {

        header: {

            /**
             * links for the main navigation area.
             */
            links: {

                'Jobs': '/jobs',

                'Logout': '/logout'// () => this.runFuture(this.logout())

            }

        },

    };

    onError = (e: Error) => {

        console.error(e);
        alert('An error has occurred! Details have been logged to the console.');

    }

    static create(appNode: HTMLElement, dialogNode: HTMLElement): Mia {

        return new Mia(appNode, dialogNode);

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

    /**
     * run puts up the applications base view and spawns all the needed service
     * actors for routing, remote requests etc.
     */
    run() {

        let viewDelegate = new HTMLElementViewDelegate(this.appNode);

        viewDelegate.set(this.view);

        let content = this.view.findById<HTMLElement>('content').get();

        this.spawn({

            id: 'views',

            create: () =>
                new ViewService(new HTMLElementViewDelegate(content), this)

        });

        this.spawn({

            id: 'dialogs',

            create: () => new ViewService(
                new HTMLElementViewDelegate(this.dialogNode), this)

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
