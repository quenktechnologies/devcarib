import * as api from '../../api';

import {
    REMOTE_FORM_MODE_UPDATE
} from '@devcarib/frontend/lib/app/scene/form/remote';

import { AddUserDialog } from './add';

/**
 * EditUserDialog provides a form embedded in a dialog for editing existing users.
 */
export class EditUserDialog extends AddUserDialog {

    name = 'Edit';

    mode = REMOTE_FORM_MODE_UPDATE;

    model = this.app.getModel(api.USER);

}
