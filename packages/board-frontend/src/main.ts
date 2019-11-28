import { View } from '@quenk/wml';
import { BoardDashboardView } from './views/board';
import { Value, Object } from '@quenk/noni/lib/data/json';
import { Event } from '@quenk/wml-widgets/lib/control';

export interface Job extends Object {

    id?: string,
    title?: string,
    country?: string,
    city?: string,
    type?: string,
    role?: string,
    industry?: string,
    technologies?: string,
    description?: string,
    link?: string,

}


export class BoardDashboard {

    constructor(public content: HTMLElement) { }

    view: View = new BoardDashboardView(this);

    values = {

        main: { id: 'main' },
        data: <Job>{},
        controls: {

            change: (e: Event<Value>) => {

                this.values.data[e.name] = e.value;

            },
            create: () => { },
        }

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
