"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dashboard = void 0;
const api = require("../api");
const handlers_1 = require("@quenk/jouvert/lib/app/scene/remote/handlers");
const scene_1 = require("../common/scene");
const post_1 = require("./forms/post");
const views_1 = require("./views");
class DefaultPagination {
    constructor() {
        this.current = {
            count: 0,
            page: 1,
            limit: 50
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
                create: () => this.spawn(() => new post_1.CreatePostForm(this.app, this.self()))
            }
        };
        this.posts = this.app.getModel(api.posts, {}, [
            new handlers_1.AfterSearchSetData(data => this.values.posts.data = data),
            new handlers_1.AfterSearchSetPagination(this.values.posts),
            new handlers_1.ShiftingOnComplete([
                new handlers_1.OnCompleteShowData(this),
                new handlers_1.AfterSearchUpdateWidget(this.view, this.values.posts.id)
            ])
        ]);
    }
    afterFormSaved() {
        this.reload();
    }
    run() {
        return this.posts.search({});
    }
}
exports.Dashboard = Dashboard;
//# sourceMappingURL=index.js.map