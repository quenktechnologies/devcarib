import { Column } from '@quenk/wml-widgets/lib/data/table';
import { Value } from '@quenk/noni/lib/data/jsonx';
import { View } from '@quenk/wml';
import { createAgent } from '@quenk/jhr/lib/browser';

import { Post } from '@board/types/lib/post';

import { BoardAdminView } from './views/app';

const agent = createAgent();

/**
 * BoardAdmin is the main class for the admin application.
 */
export class BoardAdmin {

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

            { name: 'title', heading: 'Title' },

            { name: 'approved', heading: 'Approved?' }

        ]

    };

    static create(node: Node): BoardAdmin {

        return new BoardAdmin(node);

    }

    loadPosts(): void {
    agent.get('/admin/r/posts').fork(console.error,r=>{

      this.values.data=<any>r.body.data;
      this.view.invalidate();

    });

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
        this.loadPosts();

    }

}

BoardAdmin.create(<Node>document.getElementById('main')).run();
