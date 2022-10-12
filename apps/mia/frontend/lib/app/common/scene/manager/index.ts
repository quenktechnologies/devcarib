import { Future } from '@quenk/noni/lib/control/monad/future';
import { Object } from '@quenk/noni/lib/data/jsonx';

import { Case } from '@quenk/potoo/lib/actor/resident/case';

import { Pagination } from '@quenk/jouvert/lib/app/remote/model/response';
import { RemoteModel } from '@quenk/jouvert/lib/app/remote/model';
import {
    AfterSearchSetData,
    AfterSearchSetPagination,
    OnCompleteShowData,
    AfterSearchUpdateWidget,
    ShiftingOnComplete
} from '@quenk/jouvert/lib/app/scene/remote/handlers';
import { FormSaved, FormSavedCase } from '@quenk/jouvert/lib/app/scene/form';
import { MainSceneMessage } from '@quenk/jouvert/lib/app/scene/main';

import { MiaScene } from '../';

/**
 * MiaManagerMessage adds the FormSaved message to the accepted types.
 */
export type MiaManagerMessage<M>
    = MainSceneMessage<M>
    | FormSaved
    ;

/**
 *  TableValues
 */
export interface TableValues<T extends Object> {

    id: string,

    pagination?: Pagination,

    sort?: string,

    data: T[]

}

/**
 * MiaManager is the base class for data management style views within the Mia
 * application.
 *
 * MiaManagers show data loaded from the server in a table. Most provide the
 * same functionality including search.
 */
export abstract class MiaManager<T extends Object, M>
    extends MiaScene<MiaManagerMessage<M>> {

    abstract values: {

        table: TableValues<T>

    }

    /**
     * model used to fetch the remote data.
     */
    abstract model: RemoteModel<T>;

    receive() {

        return <Case<MiaManagerMessage<M>>[]>[

            new FormSavedCase(this),

            ...super.receive()

        ];

    }

    /**
     * search the server for data that matches the specified query criteria.
     *
     * Handling of the found data is expected to occur in the installed
     * CompleteHandlers.
     */
    search(qry: Object): Future<T[]> {

        return this.model.search(qry);

    }

    /**
     * afterFormSaved callback that will effectively reload the view after
     * the user saves new data.
     *
     * @override
     */
    afterFormSaved() {

        return this.search({}).map(() => { });

    }

    run() {

        return this.search({});

    }

}

export const defaultHandlers = <T extends Object, M>(mgr: MiaManager<T, M>) => [

    new AfterSearchSetData<T>(data => { mgr.values.table.data = data }),

    new AfterSearchSetPagination(mgr.values.table),

    new ShiftingOnComplete([

        new OnCompleteShowData(mgr),

        new AfterSearchUpdateWidget(mgr.view, mgr.values.table.id)

    ])

];
