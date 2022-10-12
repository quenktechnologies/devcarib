import { Value } from '@quenk/noni/lib/data/jsonx';
import { Record } from '@quenk/noni/lib/data/record';
import { Event } from '@quenk/wml-widgets/lib/control';
import { User } from '@mia/types/lib/user';
import { DevCaribDialogRemoteForm } from '@devcarib/frontend/lib/app/scene/form/remote/dialog';
import { AddUserDialogView } from './views/add';
/**
 * AddUserDialog provides a form embeded in a dialog for adding new users.
 */
export declare class AddUserDialog extends DevCaribDialogRemoteForm<User, void> {
    name: string;
    view: AddUserDialogView;
    model: import("@quenk/jouvert/lib/app/model").Model<User>;
    value: User;
    values: {
        data: User;
        errors: Record<string>;
        status: {
            options: {
                text: string;
                value: number;
            }[];
        };
        onSelect: (e: Event<Value>) => void;
        onChange: (e: Event<Value>) => void;
        close: () => void;
        save: () => void;
    };
}
