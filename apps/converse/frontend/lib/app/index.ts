import * as api from './api';

import {
    Future,
    pure,
    doFuture,
    voidPure
} from '@quenk/noni/lib/control/monad/future';

import { DevCarib } from '@devcarib/frontend/lib/app';

import { User } from '@converse/types/lib/user';

import { ConverseView } from './views/app';
import { routes } from './routes';

/**
 * Converse application frontend main class.
 */
export class Converse extends DevCarib {

    view = new ConverseView(this);

    routes = routes;

    user: User = {};

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

    run() {

        let that = this;

        let runSuper = () => super.run();

        doFuture(function*() {

            let res = yield that.agent.get(api.me.get);

            if (res.code === 200) {

                that.user = res.body.data;

                runSuper();

            } else {

                window.location.replace('/converse/login');

            }

            return voidPure;

        }).fork();

    }

}
