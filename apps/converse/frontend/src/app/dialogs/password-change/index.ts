import { Value } from '@quenk/noni/lib/data/jsonx';
import { Record } from '@quenk/noni/lib/data/record';

import { Event } from '@quenk/wml-widgets/lib/control';

import { User } from '@converse/types/lib/user';

import {
    DevCaribDialogRemoteForm
} from '@devcarib/frontend/lib/app/scene/form/remote/dialog';
import {
    REMOTE_FORM_MODE_UPDATE
} from '@devcarib/frontend/lib/app/scene/form/remote';

import { UserRemoteModel } from '../../remote/models/user';
import { PasswordChangeDialogView } from './views';

/**
 * PasswordChangeDialog allows the user to quickly change their current password.
 */
export class PasswordChangeDialog
extends
DevCaribDialogRemoteForm<User, void> {

    name = 'Change Password';

    view = new PasswordChangeDialogView(this);

    model = new UserRemoteModel('remote.background', this);

    mode = REMOTE_FORM_MODE_UPDATE;

    values = {

        data: this.value,

        errors: <Record<string>>{},

        onChange: (e: Event<Value>) => {

            this.tell(this.self(), e);

        }

    };

}
