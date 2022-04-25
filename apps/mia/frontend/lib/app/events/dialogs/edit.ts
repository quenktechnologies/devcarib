import {
    REMOTE_FORM_MODE_UPDATE
} from '@devcarib/frontend/lib/app/scene/form/remote';

import { AddEventDialog } from './add';

/**
 * EditEventDialog provides a form embedded in a dialog for editing existing users.
 */
export class EditEventDialog extends AddEventDialog {

    name = 'Edit';

    mode = REMOTE_FORM_MODE_UPDATE;

}
