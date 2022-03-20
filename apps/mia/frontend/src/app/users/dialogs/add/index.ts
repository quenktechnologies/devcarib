import * as api from '../../../api';

import { Value } from '@quenk/noni/lib/data/jsonx';
import { merge, Record } from '@quenk/noni/lib/data/record';

import { Event } from '@quenk/wml-widgets/lib/control';

import { User } from '@mia/types/lib/user';

import {
    USER_STATUS_ACTIVE,
    USER_STATUS_DISABLED
} from '@devcarib/server/lib/user/status';

import { MiaFormDialog } from '../../../common/scene/dialog/form';
import { AddUserDialogView } from './views/add';

/**
 * AddUserDialog provides a form embeded in a dialog for adding new users.
 */
export class AddUserDialog extends MiaFormDialog<User, void> {

    name = 'Add User';

    view = new AddUserDialogView(this);

    model = this.getModel(api.USERS);

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