import { View } from '@quenk/wml';
import { Value } from '@quenk/noni/lib/data/json';
import { Event } from '@quenk/wml-widgets/lib/control';
export declare class BoardDashboard {
    content: HTMLElement;
    constructor(content: HTMLElement);
    view: View;
    values: {
        main: {
            id: string;
        };
        data: any;
        controls: {
            change: (e: Event<Value>) => void;
            create: () => void;
        };
    };
    static create(id: string): BoardDashboard;
    setContent(view: View): void;
    redirectToJob(id: string): void;
    run(): void;
}
