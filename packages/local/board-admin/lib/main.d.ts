import { View } from '@quenk/wml';
/**
 *
 */
export declare class BoardAdmin {
    node: Node;
    constructor(node: Node);
    view: any;
    values: {};
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
