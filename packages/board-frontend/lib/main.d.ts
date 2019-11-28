import { View } from '@quenk/wml';
export declare class BoardDashboard {
    content: HTMLElement;
    constructor(content: HTMLElement);
    view: View;
    values: {
        main: {
            id: string;
        };
    };
    static create(id: string): BoardDashboard;
    setContent(view: View): void;
    run(): void;
}
