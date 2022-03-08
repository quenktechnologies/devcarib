import * as jobStatus from '@board/common/lib/data/job';
import * as api from '../../api';

import {
    Future,
    pure,
    doFuture
} from '@quenk/noni/lib/control/monad/future';
import { Value, Object } from '@quenk/noni/lib/data/jsonx';
import { interpolate } from '@quenk/noni/lib/data/string';
import { debounce } from '@quenk/noni/lib/control/timer';

import { Column } from '@quenk/wml-widgets/lib/data/table';
import { Event } from '@quenk/wml-widgets/lib/control';

import {
    AfterSearchSetData,
    AfterSearchShowData,
    AfterSearchSetPagination,
    ShiftingOnComplete,
    AfterSearchUpdateWidget
} from '@quenk/jouvert/lib/app/scene/remote/handlers';


import { Job } from '@board/types/lib/job';

import {
    ActionColumn,
    StatusColumn,
    TitleColumn,
    CompanyColumn
} from '../columns';
import { JobPreviewDialog } from '../dialogs/preview';
import { MiaManager } from '../../common/scene/manager';
import { EditJobDialog } from '../dialogs/edit';
import { JobsManagerView } from './views/jobs';

export const TIME_SEARCH_DEBOUNCE = 500;

/**
 * JobsManager provides the screen for managing job posts.
 */
export class JobsManager extends MiaManager<Job, void> {

    name = 'jobs';

    view = new JobsManagerView(this);

    values = {

        search: {

            onChange: debounce((e: Event<Value>) => {

                let qry = e.value === '' ? {} : { q: e.value };

                this.search(qry);

            }, TIME_SEARCH_DEBOUNCE)

        },

        table: {

            id: 'table',

            title: 'Jobs',

            add: ()=> {},

            data: <Job[]>[],

            pagination: {

                current: {

                    count: 0,

                    page: 1,

                    limit: 50

                },

                total: {

                    count: 0,

                    pages: 0

                }

            },

            columns: <Column<Value, Job>[]>[

                new TitleColumn(job => this.showJob(job)),

                new CompanyColumn(),

                new StatusColumn(),

                new ActionColumn([
                    {

                        text: "View",

                        divider: false,

                        onClick: (data: Job) => this.showJob(data)
                    },
                    {

                        text: "Approve",

                        divider: false,

                        onClick: (data: Job) =>
                            this.wait(this.approveJob(<number>data.id))

                    },
                    {

                        text: "Edit",

                        divider: false,

                        onClick: (data: Job) => this.editJob(data)

                    },
                    {
                        text: "Remove",

                        divider: true,

                        onClick: (data: Job) =>
                            this.wait(this.removeJob(<number>data.id))

                    }

                ])

            ]

        }

    }

    model = this.app.getModel(api.JOBS, [

        new AfterSearchSetData(this.values.table),

        new AfterSearchSetPagination(this.values.table),

        new ShiftingOnComplete([

            new AfterSearchShowData(this),

            new AfterSearchUpdateWidget(this.view, this.values.table.id)

        ])

    ]);

    /**
     * search for job postings that match the specified query criteria.
     *
     * The first time this method is called, results will populate and display
     * the view. Subsequent calls will only update the already displated table.
     */
    search(qry: Object): Future<Job[]> {

        return this.model.search(qry);

    }

    /**
     * showJob displays a single Job in a dialog.
     */
    showJob(data: Job): void {

        this.spawn(() => new JobPreviewDialog(this.app, data,
            job => this.editJob(job)));

    }

    /**
     * approveJob sets the approved flag on a job to true.
     *
     * Once this is done the job will show on the site.
     */
    approveJob(id: number): Future<void> {

        let that = this;

        return doFuture<void>(function*() {

            let path = interpolate(api.JOB, { id });

            let change = { status: jobStatus.JOB_STATUS_ACTIVE };

            let r = yield that.model.update(path, change);

            if (r.code == 200) {

                alert('Job approved!');

                that.reload();

            } else {

                alert('Could not complete request!');

            }

            return pure(<void>undefined);

        });

    }

    /**
     * editJob brings up the dialog editor to quickly edit the title and body
     * of a job.
     */
    editJob(job: Job) {

        this.spawn(() => {

            (<any>window).x = new EditJobDialog(this.app, this.self(), job);

            return (<any>window).x;

        });

    }

    /**
     * removeJob permenantly removes a job from the site.
     */
    removeJob(id: number): Future<void> {

        let that = this;

        return doFuture<void>(function*() {

            let path = interpolate(api.JOB, { id });

            let r = yield that.model.remove(path);

            if (r.code == 200) {

                alert('Job removed!');

                that.reload();

            } else {

                alert('Could not complete request!');

            }

            return pure(<void>undefined);

        });

    }

    run() {

        return this.search({});

    }

}
