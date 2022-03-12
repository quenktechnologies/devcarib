import * as api from '../../api';

import { MIA_FORM_MODE_UPDATE } from '../../common/scene/dialog/form';
import { AddUserDialog } from './add';

/**
 * EditUserDialog provides a form embeded in a dialog for editing existing users.
 */
export class EditUserDialog extends AddUserDialog {

    name = 'Edit';

    mode = MIA_FORM_MODE_UPDATE;

    model = this.app.getModel(api.USER);

}
