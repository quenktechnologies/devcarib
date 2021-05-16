import { Future, pure, doFuture } from '@quenk/noni/lib/control/monad/future';
import { Object as JSONObject } from '@quenk/noni/lib/data/json';
import { Value } from '@quenk/noni/lib/data/jsonx';
import { interpolate } from '@quenk/noni/lib/data/string';
import { noop } from '@quenk/noni/lib/data/function';
import { debounce } from '@quenk/noni/lib/control/timer';

import { JApp } from '@quenk/jouvert/lib/app';

import { View } from '@quenk/wml';

import { Column } from '@quenk/wml-widgets/lib/data/table';
import { Event } from '@quenk/wml-widgets/lib/control';
import { getById } from '@quenk/wml-widgets/lib/util';
import { Updatable } from '@quenk/wml-widgets/lib/data/updatable';

import { createAgent } from '@quenk/jhr/lib/browser';
import { Ok } from '@quenk/jhr/lib/response';

import { Post } from '@board/types/lib/post';

import { BoardAdminView } from './views/app';
import { PostPreviewView } from './views/dialog/preview';
import {
    ActionColumn,
    ApprovedColumn,
    TitleColumn,
    CompanyColumn
} from './columns';

export const ACTION_APPROVE = 'approve';
export const ACTION_REMOVE = 'remove';
export const ACTION_SHOW = 'show';

export const RESOURCE_POSTS = '/admin/r/posts';
export const RESOURCE_POST = '/admin/r/posts/{id}';

export const TIME_SEARCH_DEBOUNCE = 500;

const agent = createAgent();

/**
 * OkBody is the format we expect to receive our request results in.
 */
export interface OkBody<D> {

    data: D

}

/**
 * BoardAdmin is the main class for the admin application.
 *
 * @param main    - The DOM node that the main application content will reside.
 * @param dialogs - The DOM node that will be used for dialogs.
 */
export class BoardAdmin extends JApp {

    constructor(
        public main: Node,
        public dialogs: Node) { super(); }

    /**
     * view is the WML content to display on the screen.
     */
    view = new BoardAdminView(this);

    /**
     * values contains various bits of information used to generate
     * the view.
     */
    values = {

        header: {

            links: {

                Logout: () => this.runFuture(this.logout())

            }

        },

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

                new TitleColumn(post => this.showPost(post)),

                new CompanyColumn(),

                new ApprovedColumn(),

                new ActionColumn([
                    {

                        text: "Approve",

                        divider: false,

                        onClick: (data: Post) =>
                            this.runFuture(this.approvePost(<number>data.id))

                    },
                    {
                        text: "Remove",

                        divider: true,

                        onClick: (data: Post) =>
                            this.runFuture(this.removePost(<number>data.id))

                    }

                ])

            ]

        }

    };

    onError = (e: Error) => {

        console.error(e);
        alert('An error has occurred! Details have been logged to the console.');

    }

    static create(main: Node, dialogs: Node): BoardAdmin {

        return new BoardAdmin(main, dialogs);

    }

    onAction(name: string, data: Post) {

        switch (name) {

            case ACTION_APPROVE:
                this.runFuture(this.approvePost(<number>data.id));
                break;

            case ACTION_REMOVE:
                this.runFuture(this.removePost(<number>data.id));
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
     * logout the user from the application.
     */
    logout(): Future<void> {

        return confirm('Do you want to logout now?') ?
            agent
                .post('/admin/logout', {})
                .chain(() => {

                    window.location.href = '/admin';
                    return pure(<void>undefined);

                }) :
            pure(<void>undefined);

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

    /**
     * showPost displays a single Post in a dialog.
     */
    showPost(data: Post): void {

        this.showDialog(new PostPreviewView({

            post: data,

            close: () => this.closeDialog()

        }));

    }

    /**
     * showDialog displays a View in the dialog area of the app's screen.
     */
    showDialog(view: View): void {

        setView(this.dialogs, view);

    }

    /**
     * show a View on the application's screen.
     */
    show(view: View): void {

        setView(this.main, view);

    }

    /**
     * closeDialog removes a dialog from the app's screen.
     */
    closeDialog(): void {

        unsetView(this.dialogs);

    }

    /**
     * refresh reloads and displays the application.
     */
    refresh(): void {

        this.runFuture(this.loadInitialPosts());

    }

    /**
     * runFuture is used to execute async work wrapped in the Future type.
     */
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

const setView = (node: Node, view: View) => {

    unsetView(node);
    node.appendChild(<Node>view.render());

}

const unsetView = (node: Node) => {

    while (node.firstChild != null)
        node.removeChild(node.firstChild);

}
