import { noop } from '@quenk/noni/lib/data/function';
import { Record } from '@quenk/noni/lib/data/record';
import { Object } from '@quenk/noni/lib/data/jsonx';
import { Future, pure } from '@quenk/noni/lib/control/monad/future';

import { Address } from '@quenk/potoo/lib/actor/address';
import { Message } from '@quenk/potoo/lib/actor/message';

import {
    Display,
    HTMLElementViewDelegate,
    WMLLayoutViewDelegate
} from '@quenk/jouvert/lib/app/service/display';
import { CompleteHandlerSpec, RemoteModelFactory } from '@quenk/jouvert/lib/app/remote/model/factory';
import { Director } from '@quenk/jouvert/lib/app/service/director';
import { Remote } from '@quenk/jouvert/lib/app/remote';
import { Jouvert, Template } from '@quenk/jouvert';

import { MainLayout } from '@quenk/wml-widgets/lib/layout/main';

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

const REMOTE_BACKGROUD = 'remote.background';

const agent = createAgent();

/**
 * Mia is the main class for the admin application.
 *
 * @param appNode    - The DOM node for the base application content (layout).
 * @param dialogNode - The DOM node that will be used for dialogs.
 */
export class Mia extends Jouvert {

    constructor(
        public appNode: HTMLElement,
        public dialogNode: HTMLElement) { super({ log: { level: 1000, logger: console } }); }

    /**
     * view is the WML content to display on the screen.
     */
    view = new MiaView(this);

    /**
     * router for various application views.
     */
    router = new HashRouter(window, {});

    /**
     * services map used to look up service actors.
     */
    services: Record<Address> = {};

    get models() {
        return RemoteModelFactory
            .getInstance(this, this.services[REMOTE_BACKGROUD]);
    }

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

            },

            logout: () => this.runFuture(this.logout())

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
     * getModel provides a RemoteModel instance for the specified path.
     */
    getModel<T extends Object>(path: string, handler?: CompleteHandlerSpec<T>) {

        return this.models.create(path, handler);

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
     * Any actor spawned by the app directly's address is stored in the services
     * map.
     */
    spawn(t: Template): Address {

        let addr = super.spawn(t);
        this.services[<string>t.id] = addr;
        return addr;

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

        // TODO: Replace this with library calls once available.
        let viewDelegate = new HTMLElementViewDelegate(this.appNode);

        viewDelegate.set(this.view);

        this.spawn({

            id: 'views',

            create: () => new Display(new WMLLayoutViewDelegate(
                this.view.findById<MainLayout>('content').get()),
                this)

        });

        this.spawn({

            id: 'dialogs',

            create: () => new Display(
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
