import { Future, pure, doFuture } from '@quenk/noni/lib/control/monad/future';
import { Object as JSONObject } from '@quenk/noni/lib/data/json';
import { Value } from '@quenk/noni/lib/data/jsonx';
import { interpolate } from '@quenk/noni/lib/data/string';
import { noop } from '@quenk/noni/lib/data/function';
import { Column, CellContext } from '@quenk/wml-widgets/lib/data/table';
import { Event } from '@quenk/wml-widgets/lib/control';
import { View } from '@quenk/wml';
import { createAgent } from '@quenk/jhr/lib/browser';
import { Ok } from '@quenk/jhr/lib/response';

import { Post } from '@board/types/lib/post';

import { BoardAdminView } from './views/app';
import { ActionColumnView, TitleColumnView } from './views/columns';
import { PostPreviewView } from './views/dialog/preview';
import { debounce } from '@quenk/noni/lib/control/timer';
import { getById } from '@quenk/wml-widgets/lib/util';
import { Updatable } from '@quenk/wml-widgets/lib/data/updatable';

export const ACTION_APPROVE = 'approve';
export const ACTION_REMOVE = 'remove';
export const ACTION_SHOW = 'show';

export const RESOURCE_POSTS = '/admin/r/posts';
export const RESOURCE_POST = '/admin/r/posts/{id}';

export const TIME_SEARCH_DEBOUNCE = 250;

const agent = createAgent();

/**
 * OkBody is the format we expect to receive our request results in.
 */
export interface OkBody<D> {

    data: D

}

/**
 * ActionColumnListener is used by the ActionColumn to execute actions
 * the user selects for a row.
 */
export interface ActionColumnListener {

    executeAction(name: string, data: Post): void

}

export class TitleColumn implements Column<Value, Post> {

    constructor(public listener: ActionColumnListener) { }

    name = 'title';

    heading = 'Title';

    cellFragment = (c: CellContext<Value, Post>) => new TitleColumnView({

        post: c.datum,

        show: () => this.listener.executeAction(ACTION_SHOW, c.datum)

    });

}

export class CompanyColumn implements Column<Value, Post> {

    name = 'company';

    heading = 'Company';

}

export class ApprovedColumn implements Column<Value, Post> {

    name = 'approved';

    heading = 'Approved?';

}

export class ActionColumn implements Column<Value, Post> {

    constructor(public listener: ActionColumnListener) { }

    name = '';

    heading = 'Actions';

    cellFragment = (c: CellContext<Value, Post>) => new ActionColumnView({

        approve: () => this.listener.executeAction(ACTION_APPROVE, c.datum),

        remove: () => this.listener.executeAction(ACTION_REMOVE, c.datum)

    });

}

/**
 * BoardAdmin is the main class for the admin application.
 */
export class BoardAdmin implements ActionColumnListener {

    constructor(public node: Node) { }

    /**
     * view is the WML content to display on the screen.
     */
    view = new BoardAdminView(this);

    /**
     * values contains various bits of information used to generate
     * the view.
     */
    values = {

        search: {

            onChange: debounce((e: Event<Value>) => {

                let qry = e.value === '' ? {} : { q: e.value };

                this.runFuture(this.searchPosts(qry));

            }, TIME_SEARCH_DEBOUNCE)

        },

        table: {

            id: 'table',

            data: <Post[]>[],

            columns: <Column<Value, Post>[]>[

                new TitleColumn(this),

                new CompanyColumn(),

                new ApprovedColumn(),

                new ActionColumn(this)

            ]

        }

    };

    onError = (e: Error) => {

        console.error(e);
        alert('An error has occurred! Details have been logged to the console.');

    }

    static create(node: Node): BoardAdmin {

        return new BoardAdmin(node);

    }

    executeAction(name: string, data: Post) {

        switch (name) {

            case ACTION_APPROVE:
                this.runFuture(this.approvePost(<number>data.id));
                break;

            case ACTION_REMOVE:
                this.runFuture(this.removePost(<number>data.id));
                break;

            case ACTION_SHOW:
                this.showPost(data);
                break;

            default:
                break;

        }

    }

    /**
     * searchPosts in the database.
     *
     * Differs from loadPosts() by updating only the table, not the whole
     * view on success.
     *
     * @param qry - The query object to include in the GET request.
     */
    searchPosts(qry: object = {}): Future<void> {

        let that = this;

        return doFuture<void>(function*() {

            let r: Ok<OkBody<Post[]>> =
                yield agent.get(RESOURCE_POSTS, <JSONObject>qry);

            let mtable = getById<Updatable<Post>>(
                that.view,
                that.values.table.id
            );

            if (mtable.isJust())
                mtable.get().update((r.code === 200) ? r.body.data : []);

            return pure(<void>undefined);

        });

    }

    /**
     * loadInitialPosts from the database into the table.
     */
    loadInitialPosts(): Future<void> {

        let that = this;

        return doFuture<void>(function*() {

            let r: Ok<OkBody<Post[]>> =
                yield agent.get(RESOURCE_POSTS);

            if (r.code !== 200) {

                alert('Could not load posts!');

            } else {

                that.values.table.data = r.body.data;
                that.view.invalidate();

            }

            return pure(<void>undefined);

        });

    }

    /**
     * approvePost sets the approved flag on a post to true.
     *
     * Once this is done the post will show on the site.
     */
    approvePost(id: number): Future<void> {

        let that = this;

        return doFuture<void>(function*() {

            let path = interpolate(RESOURCE_POST, { id });

            let change = { approved: true };

            let r = yield agent.patch(path, change);

            if (r.code == 200) {

                alert('Post approved!');

                that.refresh();

            } else {

                alert('Could not complete request!');

            }

            return pure(<void>undefined);

        });

    }

    /**
     * removePost permenantly removes a post from the site.
     */
    removePost(id: number): Future<void> {

        let that = this;

        return doFuture<void>(function*() {

            let path = interpolate(RESOURCE_POST, { id });

            let r = yield agent.delete(path);

            if (r.code == 200) {

                alert('Post removed!');

                that.refresh();

            } else {

                alert('Could not complete request!');

            }

            return pure(<void>undefined);

        });

    }

    showPost(data: Post): void {

        this.showModal(new PostPreviewView({

            post: data,

            close: () => this.closeModal()

        }));

    }

    /**
     * show a View on the application's screen.
     */
    show(view: View): void {

        while (this.node.firstChild != null)
            this.node.removeChild(this.node.firstChild);

        this.node.appendChild(<Node>view.render());

        window.scroll(0, 0);

    }

    showModal(view: View): void {

        let node = <Node>document.getElementById('modal');

        while (node.firstChild != null)
            node.removeChild(node.firstChild);

        node.appendChild(<Node>view.render());

        window.scroll(0, 0);

    }

    closeModal(): void {

        let node = <Node>document.getElementById('modal');

        while (node.firstChild != null)
            node.removeChild(node.firstChild);

    }

    refresh(): void {

        this.runFuture(this.loadInitialPosts());

    }

    runFuture(ft: Future<void>): void {

        ft.fork(this.onError, noop);

    }

    /**
     * run the application.
     */
    run(): void {

        this.show(this.view);
        this.refresh();

    }

}

BoardAdmin.create(<Node>document.getElementById('main')).run();
