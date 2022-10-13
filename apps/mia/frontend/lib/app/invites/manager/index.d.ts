import { Value } from '@quenk/noni/lib/data/jsonx';
import { Id, RemoteModel } from '@quenk/jouvert/lib/app/remote/model';
import { Column } from '@quenk/wml-widgets/lib/data/table';
import { Event } from '@quenk/wml-widgets/lib/control';
import { Invite } from '@mia/types/lib/invite';
import { MiaManager } from '../../common/scene/manager';
import { InviteManagerView } from './views/invites';
export declare const TIME_SEARCH_DEBOUNCE = 500;
/**
 * InvitesManager provides the screen for invite management.
 */
export declare class InvitesManager extends MiaManager<Invite, void> {
    name: string;
    view: InviteManagerView;
    values: {
        search: {
            onChange: import("@quenk/noni/lib/data/function").Function<Event<Value>, void>;
        };
        table: {
            id: string;
            title: string;
            data: Invite[];
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
            columns: Column<Value, Invite>[];
        };
    };
    model: RemoteModel<Invite>;
    remove(id: Id): void;
}
