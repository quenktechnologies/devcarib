import { AddUserDialog } from './add';
/**
 * EditUserDialog provides a form embedded in a dialog for editing existing users.
 */
export declare class EditUserDialog extends AddUserDialog {
    name: string;
    mode: string;
    model: import("@quenk/jouvert/lib/app/remote/model").RemoteModel<import("@quenk/noni/lib/data/jsonx").Object>;
}
