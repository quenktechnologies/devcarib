import { Future } from '@quenk/noni/lib/control/monad/future';
import { Value } from '@quenk/noni/lib/data/jsonx';
import { Column, CellContext } from '@quenk/wml-widgets/lib/data/table';
import { Event } from '@quenk/wml-widgets/lib/control';
import { View } from '@quenk/wml';
import { Post } from '@board/types/lib/post';
import { BoardAdminView } from './views/app';
import { ActionColumnView, TitleColumnView } from './views/columns';
export declare const ACTION_APPROVE = "approve";
export declare const ACTION_REMOVE = "remove";
export declare const ACTION_SHOW = "show";
export declare const RESOURCE_POSTS = "/admin/r/posts";
export declare const RESOURCE_POST = "/admin/r/posts/{id}";
export declare const TIME_SEARCH_DEBOUNCE = 500;
/**
 * OkBody is the format we expect to receive our request results in.
 */
export interface OkBody<D> {
    data: D;
}
/**
 * ColumnActionListener responds to specific actions happening on a column
 * via the onAction method.
 */
export interface ColumnActionListener {
    /**
     * onAction is called to react to an event the user has triggered in a
     * column.
     */
    onAction(name: string, data: Post): void;
}
export declare class TitleColumn implements Column<Value, Post> {
    listener: ColumnActionListener;
    constructor(listener: ColumnActionListener);
    name: string;
    heading: string;
    cellFragment: (c: CellContext<Value, Post>) => TitleColumnView;
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
    listener: ColumnActionListener;
    constructor(listener: ColumnActionListener);
    name: string;
    heading: string;
    cellFragment: (c: CellContext<Value, Post>) => ActionColumnView;
}
/**
 * BoardAdmin is the main class for the admin application.
 *
 * @param main    - The DOM node that the main application content will reside.
 * @param dialogs - The DOM node that will be used for dialogs.
 */
export declare class BoardAdmin implements ColumnActionListener {
    main: Node;
    dialogs: Node;
    constructor(main: Node, dialogs: Node);
    /**
     * view is the WML content to display on the screen.
     */
    view: BoardAdminView;
    /**
     * values contains various bits of information used to generate
     * the view.
     */
    values: {
        header: {
            links: {
                Logout: () => void;
            };
        };
        search: {
            onChange: import("@quenk/noni/lib/data/function").Function<Event<Value>, void>;
        };
        table: {
            id: string;
            data: Post[];
            columns: Column<Value, Post>[];
        };
    };
    onError: (e: Error) => void;
    static create(main: Node, dialogs: Node): BoardAdmin;
    onAction(name: string, data: Post): void;
    /**
     * searchPosts in the database.
     *
     * Differs from loadPosts() by updating only the table, not the whole
     * view on success.
     *
     * @param qry - The query object to include in the GET request.
     */
    searchPosts(qry?: object): Future<void>;
    /**
     * loadInitialPosts from the database into the table.
     */
    loadInitialPosts(): Future<void>;
    /**
     * logout the user from the application.
     */
    logout(): Future<void>;
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
     * showPost displays a single Post in a dialog.
     */
    showPost(data: Post): void;
    /**
     * showDialog displays a View in the dialog area of the app's screen.
     */
    showDialog(view: View): void;
    /**
     * show a View on the application's screen.
     */
    show(view: View): void;
    /**
     * closeDialog removes a dialog from the app's screen.
     */
    closeDialog(): void;
    /**
     * refresh reloads and displays the application.
     */
    refresh(): void;
    /**
     * runFuture is used to execute async work wrapped in the Future type.
     */
    runFuture(ft: Future<void>): void;
    /**
     * run the application.
     */
    run(): void;
}
