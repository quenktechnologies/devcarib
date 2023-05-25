import { noop } from '@quenk/noni/lib/data/function';
import { Future, pure } from '@quenk/noni/lib/control/monad/future';

import { DevCarib } from '@devcarib/frontend/lib/app';

import { MiaView } from './views/app';
import { routes } from './routes';

/**
 * Mia application main class.
 */
export class Mia extends DevCarib {

    view = new MiaView(this);

    routes =  routes;

    values = {

        header: {

            /**
             * links for the main navigation area.
             */
            links: [

                {type:'link', text:'Jobs', href: '#/jobs'},

                {type: 'link', text:'Users', herf:'#/users'},

                {type: 'link', text:'Events', href: '#/events'}

            ],

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
     * logout the user from the application.
     *
     * TODO: better
     */
    logout(): Future<void> {

        return confirm('Do you want to logout now?') ?
            this.agent
                .post('/mia/logout', {})
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

}
