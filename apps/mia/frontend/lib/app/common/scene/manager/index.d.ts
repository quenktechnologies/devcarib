import { Future } from '@quenk/noni/lib/control/monad/future';
import { Object } from '@quenk/noni/lib/data/jsonx';
import { Case } from '@quenk/potoo/lib/actor/resident/case';
import { Pagination, RemoteModel } from '@quenk/jouvert/lib/app/remote/model';
import { AfterSearchSetData, AfterSearchSetPagination, ShiftingOnComplete } from '@quenk/jouvert/lib/app/scene/remote/handlers';
import { FormSaved } from '@quenk/jouvert/lib/app/scene/form';
import { MainSceneMessage } from '@quenk/jouvert/lib/app/scene/main';
import { MiaScene } from '../';
/**
 * MiaManagerMessage adds the FormSaved message to the accepted types.
 */
export declare type MiaManagerMessage<M> = MainSceneMessage<M> | FormSaved;
/**
 *  TableValues
 */
export interface TableValues<T extends Object> {
    id: string;
    pagination?: Pagination;
    sort?: string;
    data: T[];
}
/**
 * MiaManager is the base class for data management style views within the Mia
 * application.
 *
 * MiaManagers show data loaded from the server in a table. Most provide the
 * same functionality including search.
 */
export declare abstract class MiaManager<T extends Object, M> extends MiaScene<MiaManagerMessage<M>> {
    abstract values: {
        table: TableValues<T>;
    };
    /**
     * model used to fetch the remote data.
     */
    abstract model: RemoteModel<T>;
    receive(): Case<MiaManagerMessage<M>>[];
    /**
     * search the server for data that matches the specified query criteria.
     *
     * Handling of the found data is expected to occur in the installed
     * CompleteHandlers.
     */
    search(qry: Object): Future<T[]>;
    /**
     * afterFormSaved callback that will effectively reload the view after
     * the user saves new data.
     *
     * @override
     */
    afterFormSaved(): Future<void>;
    run(): Future<T[]>;
}
export declare const defaultHandlers: <T extends Object, M>(mgr: MiaManager<T, M>) => (AfterSearchSetData<T> | AfterSearchSetPagination<Object> | ShiftingOnComplete<import("@quenk/jouvert/lib/app/remote/model").SearchResult<Object>>)[];
