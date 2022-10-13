import { Value } from '@quenk/noni/lib/data/jsonx';
import { debounce } from '@quenk/noni/lib/control/timer';
import { doFuture, voidPure } from '@quenk/noni/lib/control/monad/future';

import { Id, RemoteModel } from '@quenk/jouvert/lib/app/remote/model';

import { Column } from '@quenk/wml-widgets/lib/data/table';
import { Event } from '@quenk/wml-widgets/lib/control';

import { Invite } from '@mia/types/lib/invite';

import { ActionColumn } from '../../common/columns';
import { CreatedByColumn, EmailColumn, UrlColumn } from '../columns';
import { defaultHandlers, MiaManager } from '../../common/scene/manager';
import { InviteManagerView } from './views/invites';

export const TIME_SEARCH_DEBOUNCE = 500;

/**
 * InvitesManager provides the screen for invite management.
 */
export class InvitesManager extends MiaManager<Invite, void> {

    name = 'users';

    view = new InviteManagerView(this);

    values = {

        search: {

            onChange: debounce((e: Event<Value>) => {

                let qry = e.value === '' ? {} : { q: e.value };

                this.search(qry);

            }, TIME_SEARCH_DEBOUNCE)

        },

        table: {

            id: 'table',

            title: 'Invites',

            data: <Invite[]>[],

            pagination: {

                current: {

                    count: 0,

                    page: 1,

                    limit: 50

                },

                total: {

                    count: 0,

                    pages: 0

                }

            },

            columns: <Column<Value, Invite>[]>[

                new EmailColumn(),

                new UrlColumn(),

                new CreatedByColumn(),

                new ActionColumn([

                    {
                        text: 'Remove',

                        onClick: (usr: Invite) => this.remove(<string>usr.id)

                    }


                ])

            ],

        }

    }

    model: RemoteModel<Invite> =
        this.models.create('invite', defaultHandlers(this));

    remove(id: Id) {

        let that = this;

        this.wait(doFuture(function*() {

            yield that.model.remove(id);

            that.reload();

            return voidPure;

        }));

    }

}
