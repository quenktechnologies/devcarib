import { View } from '@quenk/wml';
import { BoardDashboardView } from './views/board';
import { Value, Object } from '@quenk/noni/lib/data/json';
import { Event } from '@quenk/wml-widgets/lib/control';
import { Job } from '@board/types/lib/job';
import { createAgent } from '@quenk/jhr/lib/browser';
import { Response } from '@quenk/jhr/lib/response';

const agent = createAgent();

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
            create: () => {

                agent.post('/api/jobs', this.values.data)
                    .fork(console.error, (r: Response<Object>) =>
                        this.redirectToJob(<string>r.body.id));

            },
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

    redirectToJob(id: string) {

        window.location.href = `/jobs/${id}`;

    }

    run() {

        this.setContent(this.view);

    }

}

BoardDashboard.create('app').run();
