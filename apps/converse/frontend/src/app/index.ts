import {
    Future,
    pure,
    doFuture,
    voidPure
} from '@quenk/noni/lib/control/monad/future';

import {
    AfterGetSetData,
    OnNotFound
} from '@quenk/jouvert/lib/app/scene/remote/handlers';

import { DevCarib } from '@devcarib/frontend/lib/app';

import { User } from '@converse/types/lib/user';

import { CreateInviteDialog } from './dialogs/invite';
import { ConverseView } from './views/app';
import { trap, routes } from './routes';
import { RemoteModels } from './remote/models';

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

            invite: () => this.spawn({

                id: 'invite',

                trap,

                create: () => new CreateInviteDialog(this, this.services.display)

            }),

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

        //XXX: For debugging;
        this.vm.conf.log.level = 1000

        let that = this;

        let init = () => super.init();

        return doFuture(function*() {

            init();

            let models = RemoteModels
                .getInstance(that.services['remote.background'], that);

            yield models.create('user', [

                new AfterGetSetData(data => {

                    that.user = data

                    that.router.start();

                    setTimeout(() =>
                        that.router.handleEvent(new Event('hashchanged')), 100);

                }),

                new OnNotFound(() => window.location.replace('login'))

            ]).get('');

            return voidPure;

        });

    }

}
