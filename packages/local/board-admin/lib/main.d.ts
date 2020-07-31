import { Column, CellContext } from '@quenk/wml-widgets/lib/data/table';
import { Future } from '@quenk/noni/lib/control/monad/future';
import { Value } from '@quenk/noni/lib/data/jsonx';
import { View } from '@quenk/wml';
import { Post } from '@board/types/lib/post';
import { BoardAdminView } from './views/app';
import { ActionColumnView } from './views/columns';
export declare const ACTION_APPROVE = "approve";
export declare const ACTION_REMOVE = "remove";
export declare const RESOURCE_POSTS = "/admin/r/posts";
export declare const RESOURCE_POST = "/admin/r/posts/{id}";
/**
 * OkBody is the format we expect to receive our request results in.
 */
export interface OkBody<D> {
    data: D;
}
/**
 * ActionColumnListener is used by the ActionColumn to execute actions
 * the user selects for a row.
 */
export interface ActionColumnListener {
    executeAction(name: string, data: Post): void;
}
export declare class TitleColumn implements Column<Value, Post> {
    name: string;
    heading: string;
}
export declare class CompanyColumn implements Column<Value, Post> {
    name: string;
    heading: string;
}
export declare class ApprovedColumn implements Column<Value, Post> {
    name: string;
    heading: string;
}
export declare class ActionColumn implements Column<Value, Post> {
    listener: ActionColumnListener;
    constructor(listener: ActionColumnListener);
    name: string;
    heading: string;
    cellFragment: (c: CellContext<Value, Post>) => ActionColumnView;
}
/**
 * BoardAdmin is the main class for the admin application.
 */
export declare class BoardAdmin implements ActionColumnListener {
    node: Node;
    constructor(node: Node);
    /**
     * view is the WML content to display on the screen.
     */
    view: BoardAdminView;
    /**
     * values contains various bits of information used to generate
     * the view.
     */
    values: {
        data: Post[];
        columns: Column<Value, Post>[];
    };
    onError: (e: Error) => void;
    static create(node: Node): BoardAdmin;
    executeAction(name: string, data: Post): void;
    /**
     * loadPosts from the database into the table.
     */
    loadPosts(): Future<void>;
    /**
     * approvePost sets the approved flag on a post to true.
     *
     * Once this is done the post will show on the site.
     */
    approvePost(id: number): Future<void>;
    /**
     * removePost permenantly removes a post from the site.
     */
    removePost(id: number): Future<void>;
    /**
     * show a View on the application's screen.
     */
    show(view: View): void;
    refresh(): void;
    runFuture(ft: Future<void>): void;
    /**
     * run the application.
     */
    run(): void;
}
