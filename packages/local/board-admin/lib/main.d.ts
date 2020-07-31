import { Column } from '@quenk/wml-widgets/lib/data/table';
import { Value } from '@quenk/noni/lib/data/jsonx';
import { View } from '@quenk/wml';
import { Post } from '@board/types/lib/post';
import { BoardAdminView } from './views/app';
/**
 * BoardAdmin is the main class for the admin application.
 */
export declare class BoardAdmin {
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
    static create(node: Node): BoardAdmin;
    /**
     * render a view of the application to the screen.
     */
    render(view: View): void;
    /**
     * run the application.
     */
    run(): void;
}
