import { Value } from '@quenk/noni/lib/data/jsonx';
import { Column } from '@quenk/wml-widgets/lib/data/table';
import { Event } from '@quenk/wml-widgets/lib/control';
import { RemoteModel } from '@quenk/jouvert/lib/app/remote/model';
import { User } from '@mia/types/lib/user';
import { MiaManager } from '../../common/scene/manager';
import { UsersManagerView } from './views/users';
export declare const TIME_SEARCH_DEBOUNCE = 500;
/**
 * UsersManager provides the screen for managing users.
 */
export declare class UsersManager extends MiaManager<User, void> {
    name: string;
    view: UsersManagerView;
    values: {
        search: {
            onChange: import("@quenk/noni/lib/data/function").Function<Event<Value>, void>;
        };
        table: {
            id: string;
            title: string;
            data: User[];
            pagination: {
                current: {
                    count: number;
                    page: number;
                    limit: number;
                };
                total: {
                    count: number;
                    pages: number;
                };
            };
            columns: Column<Value, User>[];
        };
    };
    model: RemoteModel<User>;
    /**
     * edit brings up the form for editing an existing user profile.
     */
    edit(usr: User): void;
}
