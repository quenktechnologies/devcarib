import * as moment from 'moment';

import {
    Future,
    doFuture,
    voidPure
} from '@quenk/noni/lib/control/monad/future';
import { noop } from '@quenk/noni/lib/data/function';

import {
    AfterSearchSetData,
    AfterSearchSetPagination,
    OnCompleteShowData,
    AfterSearchUpdateWidget,
    AfterSearchUpdateWidgets,
    ShiftingOnComplete
} from '@quenk/jouvert/lib/app/scene/remote/handlers';
import { Result } from '@quenk/jouvert/lib/app/remote/model/response';

import { PageSelectedEvent } from '@quenk/wml-widgets/lib/control/pager';

import { Job } from '@board/types/lib/job';

import { Post } from '@converse/types/lib/post';
import { Event } from '@converse/types/lib/event';

import { ConverseScene } from '../common/scene';
import { CreatePostForm } from './forms/post';
import { DashboardView } from './views';

const eventThreshold = moment().subtract(6, 'hours').toISOString();

class DefaultPagination {

    current = {

        count: 0,

        page: 1,

        limit: 500

    };

    total = {

        count: 0,

        pages: 0

    }
}

/**
 * Dashboard is the controller for the user's dashboard view.
 *
 * Here recent posts and overviews of other interesting data is shown.
 */
export class Dashboard extends ConverseScene<void> {

    name = 'dashboard';

    view = new DashboardView(this);

    values = {

        posts: {

            id: 'posts',

            data: <Post[]>[],

            pagination: new DefaultPagination(),

            create: () => this.spawn(() =>
                new CreatePostForm(this.app, this.self())),

            next: ({ value }: PageSelectedEvent) =>
                this.wait(this.fetchPosts(value)),


        },

        popular: {

            id: 'popular-posts',

            data: <Post[]>[]

        },

        jobs: {

            id: 'jobs',

            data: <Job[]>[]

        },

        events: {

            id: 'events',

            data: <Event[]>[]

        }

    };

    /**
     * posts is used to fetch the main posts displayed on the page.
     */
    posts = this.models.create('post', [

        new AfterSearchSetData(data => { this.values.posts.data = data; }),

        new AfterSearchSetPagination(this.values.posts),

        new ShiftingOnComplete<void | Result<Post>>([

            new OnCompleteShowData(this),

            new AfterSearchUpdateWidget(this.view, this.values.posts.id)

        ])

    ]);

    /**
     * popularPosts is used to fetch the most popular posts.
     *
     * This does not affect the main view posts.
     */
    popularPosts = this.models.create('post', [

        new AfterSearchSetData(data => { this.values.popular.data = data }),

        new AfterSearchUpdateWidget(this.view, this.values.popular.id)

    ]);

    jobs = this.models.create('job', [

        new AfterSearchSetData(data => { this.values.jobs.data = data }),

        new AfterSearchUpdateWidgets(this.view, this.values.jobs.id)

    ]);

    events = this.models.create('event', [

        new AfterSearchSetData(data => { this.values.events.data = data }),

        new AfterSearchUpdateWidgets(this.view, this.values.events.id)

    ]);

    /**
     * fetchPosts recently posted for the main part of the view using the
     * current pagination data.
     *
     * Currently ranks on created_on but future iterations will use last
     * activity data.
     *
     * @param page - The page number to return from the paginated results.
     */
    fetchPosts(page = 1): Future<void> {

        return this.posts.search({

            sort: '-created_on',

            page,

            limit: this.values.posts.pagination.current.limit

        }).map(noop);

    }

    run() {

        let that = this;

        return doFuture(function*() {

            yield that.fetchPosts();

            yield that.jobs.search({ sort: '-created_on', limit: 5 });

            yield that.popularPosts.search({ sort: '-web-views', limit: 5 });

            yield that.events.search({

                q: `startDateTime:>${eventThreshold}`,

                sort: '-created_on',

                limit: 5

            });

            return voidPure;

        });

    }

}
