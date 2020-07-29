import { View } from '@quenk/wml';

//import { BoardAdminView } from './views/app';

/**
 *
 */
export class BoardAdmin {

    constructor(public node: Node) { }

    view: any = 1;//new BoardAdminView(this);

    values = {};

    static create(node: Node): BoardAdmin {

        return new BoardAdmin(node);

    }

    /**
     * render a view of the application to the screen.
     */
    render(view: View): void {

        while (this.node.firstChild != null)
            this.node.removeChild(this.node.firstChild);

        this.node.appendChild(<Node>view.render());

        window.scroll(0, 0);

    }

    /**
     * run the application.
     */
    run(): void {

        this.render(this.view);

    }

}

BoardAdmin.create(<Node>document.getElementById('main')).run();
