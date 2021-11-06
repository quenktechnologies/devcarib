import * as jobStatus from '@board/common/lib/data/job';
import * as httpStatus from '@quenk/jhr/lib/status';
import * as api from '../../api';

import { Future, pure, doFuture, voidPure } from '@quenk/noni/lib/control/monad/future';
import { Value, Object } from '@quenk/noni/lib/data/jsonx';
import { interpolate } from '@quenk/noni/lib/data/string';
import { noop } from '@quenk/noni/lib/data/function';
import { debounce } from '@quenk/noni/lib/control/timer';

import { SearchResult } from '@quenk/jouvert/lib/app/remote/model';

import { Column } from '@quenk/wml-widgets/lib/data/table';
import { Event } from '@quenk/wml-widgets/lib/control';

import { createAgent } from '@quenk/jhr/lib/browser';

import {
    ExecOnComplete,
} from '@quenk/dfront/lib/app/scene/remote/handlers';

import { Job } from '@board/types/lib/job';

import {
    ActionColumn,
    StatusColumn,
    TitleColumn,
    CompanyColumn
} from '../columns';
import { JobPreviewDialog } from '../dialogs/preview';
import { MiaManager } from '../../common/scene/manager';
import { JobsManagerView } from './views/jobs';
import { Updatable } from '@quenk/wml-widgets/lib/data/updatable';


export const ACTION_APPROVE = 'approve';
export const ACTION_REMOVE = 'remove';
export const ACTION_SHOW = 'show';

export const TIME_SEARCH_DEBOUNCE = 500;

const agent = createAgent();

/**
 * OkBody is the format we expect to receive our request results in.
 */
export interface OkBody<D> {

    data: D

}


/**
 * AlertOnSearchNoData tells the user their search yielded no results.
 */
export class AlertOnSearchNoData<D extends Object>
    extends
    ExecOnComplete<SearchResult<D>> {

    constructor() {

        super(httpStatus.NO_CONTENT, () => {

            alert('Your search returned no results');

        });

    }

}

/**
 * JobsManager provides the screen for managing job posts created within
 * the system.
 */
export class JobsManager extends MiaManager<void> {

    /**
     * view is the WML content to display on the screen.
     */
    view = new JobsManagerView(this);

    jobsModel = this.app.getModel(api.JOBS);

    values = {

        search: {

            onChange: debounce((e: Event<Value>) => {

                let qry = e.value === '' ? {} : { q: e.value };

                this.search(qry);

            }, TIME_SEARCH_DEBOUNCE)

        },

        table: {

            id: 'table',

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
                            this.runFuture(this.approveJob(<number>data.id))

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
                            this.runFuture(this.removeJob(<number>data.id))

                    }

                ])

            ]

        }

    }

    onError = (e: Error) => {

        console.error(e);
        alert('An error has occurred! Details have been logged to the console.');

    }

    /**
     * search for job postings that match the specified query criteria.
     *
     * The first time this method is called, results will populate and display
     * the view. Subsequent calls will only update the already displated table.
     */
    search(qry: object): Future<void> {

        let that = this;

        return doFuture(function*() {

            let jobs = yield that.jobsModel.search(<Object>qry);

            that.values.table.data = jobs;

            let mtable =
                that.view.findById<Updatable<Job>>(that.values.table.id);

            if (mtable.isJust()) mtable.get().update(jobs);

            return voidPure;

        });

    }

    /**
     * showJob displays a single Job in a dialog.
     */
    showJob(data: Job): void {

        this.spawn(() => new JobPreviewDialog(this.app, data));

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

            let r = yield agent.patch(path, change);

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
    editJob(data: Job) {

        this.spawn(() => new JobPreviewDialog(this.app, data, this.self()));

    }

    /**
     * removeJob permenantly removes a job from the site.
     */
    removeJob(id: number): Future<void> {

        let that = this;

        return doFuture<void>(function*() {

            let path = interpolate(api.JOB, { id });

            let r = yield agent.delete(path);

            if (r.code == 200) {

                alert('Job removed!');

                that.reload();

            } else {

                alert('Could not complete request!');

            }

            return pure(<void>undefined);

        });

    }

    /**
     * runFuture is used to execute async work wrapped in the Future type.
     */
    runFuture<T>(ft: Future<T>): void {

        ft.fork(this.onError, noop);

    }

    run() {

        let that = this;

        return doFuture(function*() {

            yield that.search({});

            that.show();

            return voidPure;

        });

    }

}
