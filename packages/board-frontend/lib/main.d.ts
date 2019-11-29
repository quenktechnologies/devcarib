import { View } from '@quenk/wml';
import { Value } from '@quenk/noni/lib/data/json';
import { Event } from '@quenk/wml-widgets/lib/control';
import { Job } from '@board/types/lib/job';
export declare class BoardDashboard {
    content: HTMLElement;
    constructor(content: HTMLElement);
    view: View;
    values: {
        main: {
            id: string;
        };
        data: Job;
        controls: {
            change: (e: Event<Value>) => void;
            create: () => void;
        };
    };
    static create(id: string): BoardDashboard;
    setContent(view: View): void;
    run(): void;
}
