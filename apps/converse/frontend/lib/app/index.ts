import { Future, pure } from '@quenk/noni/lib/control/monad/future';

import { DevCarib } from '@devcarib/frontend/lib/app';

import { ConverseView } from './views/app';
import { routes } from './routes';

/**
 * Converse application frontend main class.
 */
export class Converse extends DevCarib {

    view = new ConverseView(this);

    routes = routes;

    values = {

        header: {

            links: {


            },

            logout: () => this.logout().fork()

        },

    };

    static create(appNode: HTMLElement, dialogNode: HTMLElement): Converse {

        return new Converse(appNode, dialogNode);

    }

    logout(): Future<void> {

        return confirm('Do you want to logout now?') ?
            this.agent
                .post('/converse/logout', {})
                .chain(() => {

                    window.location.href = '/admin';

                    return pure(<void>undefined);

                }) :
            pure(<void>undefined);

    }

}
