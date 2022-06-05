import * as api from '../../api';

import { Value } from '@quenk/noni/lib/data/jsonx';
import { debounce } from '@quenk/noni/lib/control/timer';

import { Column } from '@quenk/wml-widgets/lib/data/table';
import { Event } from '@quenk/wml-widgets/lib/control';

import { RemoteModel } from '@quenk/jouvert/lib/app/remote/model';

import { User } from '@mia/types/lib/user';

import { ActionColumn } from '../../common/columns';
import { UsernameColumn } from '../columns';
import { defaultHandlers, MiaManager } from '../../common/scene/manager';
import { EditUserDialog } from '../dialogs/edit';

import { UsersManagerView } from './views/users';

export const TIME_SEARCH_DEBOUNCE = 500;

/**
 * UsersManager provides the screen for managing users.
 */
export class UsersManager extends MiaManager<User, void> {

    name = 'users';

    view = new UsersManagerView(this);

    values = {

        search: {

            onChange: debounce((e: Event<Value>) => {

                let qry = e.value === '' ? {} : { q: e.value };

                this.search(qry);

            }, TIME_SEARCH_DEBOUNCE)

        },

        table: {

            id: 'table',

          title: 'Users',

            data: <User[]>[],

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

            columns: <Column<Value, User>[]>[

                new UsernameColumn(),

                new ActionColumn([

                    {
                        text: 'Edit',

                        onClick: (usr:User) => this.edit(usr)

                    }


                ])

            ],

        }

    }

    model: RemoteModel<User> = this.app.getModel(api.users, defaultHandlers(this));

    /**
     * edit brings up the form for editing an existing user profile.
     */
    edit(usr:User) {

        this.spawn(()=> new EditUserDialog(this.app, this.self(), usr));


    }

}
