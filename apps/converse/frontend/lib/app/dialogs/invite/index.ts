import * as api from '../../api';

import { Value } from '@quenk/noni/lib/data/jsonx';
import { Record } from '@quenk/noni/lib/data/record';

import { Event } from '@quenk/wml-widgets/lib/control';

import { Invite } from '@converse/types/lib/invite';

import {
    DevCaribDialogRemoteForm
} from '@devcarib/frontend/lib/app/scene/form/remote/dialog';
import {
    REMOTE_FORM_MODE_CREATE
} from '@devcarib/frontend/lib/app/scene/form/remote';

import { CreateInviteDialogView } from './views';

/**
 * CreateInviteDialog is used to create a new invite on the user's behalf.
 */
export class CreateInviteDialog extends DevCaribDialogRemoteForm<Invite, void> {

    name = 'Invite A Friend';

    view = new CreateInviteDialogView(this);

    model = this.app.getModel(api.invites);

    mode = REMOTE_FORM_MODE_CREATE;

    values = {

        data: this.value,

        errors: <Record<string>>{},

        onChange: (e: Event<Value>) => {

            this.tell(this.self(), e);

        }

    };

}
