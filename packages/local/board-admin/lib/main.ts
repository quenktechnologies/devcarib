import { Column, CellContext } from '@quenk/wml-widgets/lib/data/table';
import { pure, doFuture, Future } from '@quenk/noni/lib/control/monad/future';
import { Value } from '@quenk/noni/lib/data/jsonx';
import { interpolate } from '@quenk/noni/lib/data/string';
import { noop } from '@quenk/noni/lib/data/function';
import { View } from '@quenk/wml';
import { createAgent } from '@quenk/jhr/lib/browser';
import { Ok } from '@quenk/jhr/lib/response';

import { Post } from '@board/types/lib/post';

import { BoardAdminView } from './views/app';
import { ActionColumnView } from './views/columns';

export const ACTION_APPROVE = 'approve';
export const ACTION_REMOVE = 'remove';

export const RESOURCE_POSTS = '/admin/r/posts';
export const RESOURCE_POST = '/admin/r/posts/{id}';

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

    name = 'title';

    heading = 'Title'

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

        data: <Post[]>[],

        columns: <Column<Value, Post>[]>[

            new TitleColumn(),
            new CompanyColumn(),
            new ApprovedColumn(),
            new ActionColumn(this)

        ]

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

            default:
                break;

        }

    }

    /**
     * loadPosts from the database into the table.
     */
    loadPosts(): Future<void> {

        let that = this;

        return doFuture<void>(function*() {

            let r: Ok<OkBody<Post[]>> = yield agent.get(RESOURCE_POSTS);

            if (r.code !== 200) {

                alert('Could not load posts!');

            } else {

                that.values.data = r.body.data;
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

    /**
     * show a View on the application's screen.
     */
    show(view: View): void {

        while (this.node.firstChild != null)
            this.node.removeChild(this.node.firstChild);

        this.node.appendChild(<Node>view.render());

        window.scroll(0, 0);

    }

    refresh(): void {

        this.runFuture(this.loadPosts());

    }

    runFuture(ft: Future<void>): void {

        ft.fork(this.onError, noop);

    }

    /**
     * run the application.
     */
    run(): void {

        this.show(this.view);
        this.runFuture(this.loadPosts());

    }

}

BoardAdmin.create(<Node>document.getElementById('main')).run();
