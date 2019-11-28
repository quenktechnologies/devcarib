import { View } from '@quenk/wml';
import { Value, Object } from '@quenk/noni/lib/data/json';
import { Event } from '@quenk/wml-widgets/lib/control';
export interface Job extends Object {
    id?: string;
    title?: string;
    country?: string;
    city?: string;
    type?: string;
    role?: string;
    industry?: string;
    technologies?: string;
    description?: string;
    link?: string;
}
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
