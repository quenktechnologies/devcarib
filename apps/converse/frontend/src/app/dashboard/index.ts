import * as api from '../api';

import {
    AfterSearchSetData,
    AfterSearchSetPagination,
    OnCompleteShowData,
    AfterSearchUpdateWidget,
    ShiftingOnComplete
} from '@quenk/jouvert/lib/app/scene/remote/handlers';
import { Result } from '@quenk/jouvert/lib/app/remote/model';

import { Post } from '@converse/types/lib/post';

import { ConverseScene } from '../common/scene';
import { CreatePostForm } from './forms/post';
import { DashboardView } from './views';

class DefaultPagination {

    current = {

        count: 0,

        page: 1,

        limit: 50

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
                new CreatePostForm(this.app, this.self()))

        }

    };

    posts = this.app.getModel(api.posts, [

        new AfterSearchSetData(data => this.values.posts.data = data),

        new AfterSearchSetPagination(this.values.posts),

        new ShiftingOnComplete<void | Result<Post>>([

            new OnCompleteShowData(this),

            new AfterSearchUpdateWidget(this.view, this.values.posts.id)

        ])

    ]);

    run() {

        return this.posts.search({});

    }

}
