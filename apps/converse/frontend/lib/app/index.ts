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
import { RemoteModels } from './remote/models';
import { ConverseView } from './views/app';
import { trap, routes } from './routes';

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

        let that = this;

        return doFuture(function*() {

            if (confirm('Do you want to logout now?')) {

                yield that.agent.post('/logout', {});

                window.location.href = '/';

            }

            return pure(<void>undefined);

        });

    }

    run() {

        //XXX: For debugging;
        this.vm.conf.log.level = 1000

        let that = this;

        let init = () => super.init();

        return doFuture(function*() {

            init();

            yield RemoteModels.create('user', that.services['remote.background'], that, [

                new AfterGetSetData<User>(data => {

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
