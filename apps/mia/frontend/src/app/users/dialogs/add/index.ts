import { Value } from '@quenk/noni/lib/data/jsonx';
import { merge, Record } from '@quenk/noni/lib/data/record';

import { Event } from '@quenk/wml-widgets/lib/control';

import { User } from '@mia/types/lib/user';

import {
    USER_STATUS_ACTIVE,
    USER_STATUS_DISABLED
} from '@devcarib/server/lib/user/status';

import {
    DevCaribDialogRemoteForm
} from '@devcarib/frontend/lib/app/scene/form/remote/dialog';

import { AddUserDialogView } from './views/add';
import { UserRemoteModel } from '../../../remote/models/user';

/**
 * AddUserDialog provides a form embeded in a dialog for adding new users.
 */
export class AddUserDialog extends DevCaribDialogRemoteForm<User, void> {

    name = 'Add User';

    view = new AddUserDialogView(this);

    model:UserRemoteModel = new UserRemoteModel('background', this);

    value: User = merge({ status: USER_STATUS_ACTIVE }, this.value);

    values = {

        data: this.value,

        errors: <Record<string>>{},

        status: {

            options: [

                { text: 'Active', value: USER_STATUS_ACTIVE },

                { text: 'Disabled', value: USER_STATUS_DISABLED },

            ]

        },

        onSelect: (e: Event<Value>) => {

            this.tell(this.self(), e);

        },

        onChange: (e: Event<Value>) => {

            this.tell(this.self(), e);

        },

        close: () => {

            this.close();

            this.abort();

        },

        save: () => {

            this.save();

        }

    };

}
