import { View } from '@quenk/wml';
import { BoardDashboardView } from './views/board';

export class BoardDashboard {

    constructor(public content: HTMLElement) { }

    view: View = new BoardDashboardView(this);

    values = {

        main: { id: 'main' }

    };

    static create(id: string) {

        let e: HTMLElement = <HTMLElement>document.getElementById(id);

        return new BoardDashboard(e);

    }

    setContent(view: View) {

        while (this.content.firstChild != null)
            this.content.removeChild(this.content.firstChild);

        this.content.appendChild(view.render());

    }

    run() {

        this.setContent(this.view);

    }

}

BoardDashboard.create('app').run();
