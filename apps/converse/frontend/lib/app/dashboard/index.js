"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dashboard = void 0;
const api = require("../api");
const handlers_1 = require("@quenk/jouvert/lib/app/scene/remote/handlers");
const scene_1 = require("../common/scene");
const post_1 = require("./forms/post");
const views_1 = require("./views");
const future_1 = require("@quenk/noni/lib/control/monad/future");
class DefaultPagination {
    constructor() {
        this.current = {
            count: 0,
            page: 1,
            limit: 25
        };
        this.total = {
            count: 0,
            pages: 0
        };
    }
}
/**
 * Dashboard is the controller for the user's dashboard view.
 *
 * Here recent posts and overviews of other interesting data is shown.
 */
class Dashboard extends scene_1.ConverseScene {
    constructor() {
        super(...arguments);
        this.name = 'dashboard';
        this.view = new views_1.DashboardView(this);
        this.values = {
            posts: {
                id: 'posts',
                data: [],
                pagination: new DefaultPagination(),
                create: () => this.spawn(() => new post_1.CreatePostForm(this.app, this.self())),
                recent: {
                    id: 'recent-posts',
                    data: []
                }
            },
            jobs: {
                id: 'jobs',
                data: []
            },
            events: {
                id: 'events',
                data: []
            }
        };
        /**
         * posts is used to fetch the main posts displayed on the page.
         */
        this.posts = this.app.getModel(api.posts, [
            new handlers_1.AfterSearchSetData(data => (0, future_1.doFuture)(function* () {
                // @ts-ignore 2683
                let that = this;
                that.values.posts.data = data;
                yield that.jobs.search({ sort: '-created_on', limit: 5 });
                yield that.recentPosts.search({ sort: '-created_on', limit: 5 });
                yield that.events.search({ sort: '-created_on', limit: 5 });
                return future_1.voidPure;
            }.bind(this))),
            new handlers_1.AfterSearchSetPagination(this.values.posts),
            new handlers_1.ShiftingOnComplete([
                new handlers_1.OnCompleteShowData(this),
                new handlers_1.AfterSearchUpdateWidget(this.view, this.values.posts.id)
            ])
        ]);
        /**
         * recentPosts is used to fetch the most recently created posts.
         *
         * This does not affect the main view posts.
         */
        this.recentPosts = this.app.getModel(api.posts, [
            new handlers_1.AfterSearchSetData(data => { this.values.posts.recent.data = data; }),
            new handlers_1.AfterSearchUpdateWidget(this.view, this.values.posts.recent.id)
        ]);
        this.jobs = this.app.getModel(api.jobs, [
            new handlers_1.AfterSearchSetData(data => { this.values.jobs.data = data; }),
            new handlers_1.AfterSearchUpdateWidget(this.view, this.values.jobs.id)
        ]);
        this.events = this.app.getModel(api.events, [
            new handlers_1.AfterSearchSetData(data => { this.values.events.data = data; }),
            new handlers_1.AfterSearchUpdateWidget(this.view, this.values.events.id)
        ]);
    }
    run() {
        return this.posts.search({
            sort: '-created_on',
            limit: this.values.posts.pagination.current.limit
        });
    }
}
exports.Dashboard = Dashboard;
//# sourceMappingURL=index.js.map