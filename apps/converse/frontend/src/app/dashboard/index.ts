import * as api from '../api';

import {
    AfterSearchSetData,
    AfterSearchSetPagination,
    OnCompleteShowData,
    AfterSearchUpdateWidget,
    ShiftingOnComplete
} from '@quenk/jouvert/lib/app/scene/remote/handlers';
import { Result } from '@quenk/jouvert/lib/app/remote/model';

import { Job } from '@board/types/lib/job';

import { Post } from '@converse/types/lib/post';
import { Event } from '@converse/types/lib/event';

import { ConverseScene } from '../common/scene';
import { CreatePostForm } from './forms/post';
import { DashboardView } from './views';
import { doFuture, voidPure } from '@quenk/noni/lib/control/monad/future';

class DefaultPagination {

    current = {

        count: 0,

        page: 1,

        limit: 25

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

            popular: {

                id: 'popular-posts',

                data: <Post[]>[]

            }

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
    posts = this.app.getModel(api.posts, [

        new AfterSearchSetData(data => doFuture(function*() {

            // @ts-ignore 2683
            let that: Dashboard = this;

            that.values.posts.data = data;

            yield that.jobs.search({ sort: '-created_on', limit: 5 });

            yield that.popularPosts.search({ sort: '-web-views', limit: 5 });

            yield that.events.search({ sort: '-created_on', limit: 5 });

            return voidPure;

        }.bind(this))),

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
    popularPosts = this.app.getModel(api.posts, [

        new AfterSearchSetData(data => { this.values.posts.popular.data = data }),

        new AfterSearchUpdateWidget(this.view, this.values.posts.popular.id)

    ]);

    jobs = this.app.getModel(api.jobs, [

        new AfterSearchSetData(data => { this.values.jobs.data = data }),

        new AfterSearchUpdateWidget(this.view, this.values.jobs.id)

    ]);

    events = this.app.getModel(api.events, [

        new AfterSearchSetData(data => { this.values.events.data = data }),

        new AfterSearchUpdateWidget(this.view, this.values.events.id)

    ]);

    run() {

        return this.posts.search({

            sort: '-created_on',

            limit: this.values.posts.pagination.current.limit

        });

    }

}
