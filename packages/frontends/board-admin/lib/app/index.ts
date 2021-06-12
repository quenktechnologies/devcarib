import * as api from './api';

import { Future, pure, doFuture } from '@quenk/noni/lib/control/monad/future';
import { Object as JSONObject } from '@quenk/noni/lib/data/json';
import { Value, Object } from '@quenk/noni/lib/data/jsonx';
import { interpolate } from '@quenk/noni/lib/data/string';
import { noop } from '@quenk/noni/lib/data/function';
import { debounce } from '@quenk/noni/lib/control/timer';

import { Address } from '@quenk/potoo/lib/actor/address';
import { Message } from '@quenk/potoo/lib/actor/message';

import {
    CloseDialog,
    DialogService,
    ShowDialogView,
    ViewDisplay
} from '@quenk/jouvert/lib/app/service/dialog';
import { RemoteModelFactory } from '@quenk/jouvert/lib/app/remote/model/factory';
import { AbstractCompleteHandler } from '@quenk/jouvert/lib/app/remote/callback';
import { JApp, Template } from '@quenk/jouvert/lib/app';
import { Result } from '@quenk/jouvert/lib/app/remote/model';
import { Remote } from '@quenk/jouvert/lib/app/remote';

import { View } from '@quenk/wml';

import { Column } from '@quenk/wml-widgets/lib/data/table';
import { Event } from '@quenk/wml-widgets/lib/control';
import { getById } from '@quenk/wml-widgets/lib/util';
import { Updatable } from '@quenk/wml-widgets/lib/data/updatable';

import { createAgent } from '@quenk/jhr/lib/browser';
import { Response, Ok } from '@quenk/jhr/lib/response';

import { Post } from '@board/types/lib/post';

import { BoardAdminView } from './views/app';
import { PostPreviewView } from './views/dialog/preview';
import { PostEditViewCtx, PostEditView } from './views/dialog/edit';
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
 * DialogManager is responsible for the actual display and removal of dialog
 * content.
 */
class DialogManager implements ViewDisplay {

    constructor(public node: Node) { }

    open(view: View) {

        setView(this.node, view);

    }

    setView(view: View) {

        setView(this.node, view);

    }

    close() {

        unsetView(this.node);

    }

}

/**
 * AfterOkExec is a CompleteHandler that simply invokes the passed function.
 */
class AfterOkExec<T extends Object> extends AbstractCompleteHandler<Result<T>> {

    constructor(public handler: (r: Response<Result<T>>) => void) { super(); }

    onComplete(r: Response<Result<T>>) {

        if (r.code === 200)
            this.handler(r);

    }

}

/**
 * PostEditViewCtxImpl provides the data and functions used in the dialog for
 * editing posts.
 */
class PostEditViewCtxImpl implements PostEditViewCtx {

    changes: Object = {};

    /**
     * @param post  The post being edited.
     * @param app   The instance of BoardAdmin.
     */
    constructor(public post: Post, public app: BoardAdmin) { }

    onChange = (e: Event<Value>) => {

        this.changes[e.name] = e.value;

    };

    onSave = () => {

        let posts = this.app.modelFactory.create(api.POST,
            new AfterOkExec(() =>  {

                this.app.tell('dialogs', new CloseDialog());
               this.app.runFuture(this.app.loadInitialPosts());

            }));

        posts.update(<number>this.post.id, this.changes).fork();

    };

    onCancel = () => {

        this.app.tell('dialogs', new CloseDialog());

    };

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
     * modelFactory for producing RemoteModels on request.
     */
    modelFactory = RemoteModelFactory.getInstance(t => this.vm.spawn(<Template>t),
        'remote.background');

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

                        text: "View",

                        divider: false,

                        onClick: (data: Post) => this.showPost(data)
                    },
                    {

                        text: "Approve",

                        divider: false,

                        onClick: (data: Post) =>
                            this.runFuture(this.approvePost(<number>data.id))

                    },
                    {

                        text: "Edit",

                        divider: false,

                        onClick: (data: Post) => this.editPost(data)

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
     * showPost displays a single Post in a dialog.
     */
    showPost(data: Post): void {

        this.tell('dialogs', new ShowDialogView(new PostPreviewView({

            post: data,

            close: () => this.tell('dialogs', new CloseDialog())

        }), '$'));

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
     * editPost brings up the dialog editor to quickly edit the title and body
     * of a post.
     */
    editPost(data: Post) {

        this.tell('dialogs', new ShowDialogView(
            new PostEditView(new PostEditViewCtxImpl(data, this)), '$'));

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
     * show a View on the application's screen.
     */
    show(view: View): void {

        setView(this.main, view);

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
     * tell a message to an actor in the system.
     */
    tell(addr: Address, msg: Message): BoardAdmin {

        this.vm.tell(addr, msg);
        return this;

    }

    /**
     * spawn a root child actor given its Template.
     */
    spawn(t: Template): BoardAdmin {

        this.vm.spawn(t);
        return this;

    }

    /**
     * @override
     */
    run() {

        this.spawn({

            id: 'dialogs',

            create: s => new DialogService(new DialogManager(this.dialogs), s)

        });

        this.spawn({

            id: 'remote.background',

            create: () => new Remote(agent, this)

        });

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
