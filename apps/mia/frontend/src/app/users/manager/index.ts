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
import { UsersManagerView } from './views/users';
import { AddUserDialog } from '../dialogs/add';

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

                new ActionColumn([])

            ],

            add: () => this.add()

        }

    }

    model: RemoteModel<User> = this.app.getModel(api.USERS, defaultHandlers(this));

    /**
     * add brings up the form for adding a new user.
     */
    add() {

        this.spawn(() => new AddUserDialog(this.app, this.self()));

    }

}
