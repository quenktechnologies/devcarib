import * as api from '../api';

import {
    AfterSearchSetData,
    AfterSearchSetPagination,
    AfterSearchShowData,
    AfterSearchUpdateWidget,
    ShiftingOnComplete
} from '@quenk/jouvert/lib/app/scene/remote/handlers';

import { Post } from '@converse/types/lib/post';

import { ConverseScene } from '../common/scene';
import { CreatePostForm } from './forms/post';
import { DashboardView } from './views/dashboard';

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

    posts = this.app.getModel(api.POSTS, [

        new AfterSearchSetData(this.values.posts),

        new AfterSearchSetPagination(this.values.posts),

    new ShiftingOnComplete([

        new AfterSearchShowData(this),

        new AfterSearchUpdateWidget(this.view, this.values.posts.id)

    ])

    ]);

    afterFormSaved() {

        this.reload();

    }

    run() {

        return this.posts.search({});

    }

}
