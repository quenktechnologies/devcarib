import * as __wml from '@quenk/wml';
import { BoardDashboard } from '../main';
import { Maybe as __Maybe } from '@quenk/noni/lib/data/maybe';
export declare class JobFormView implements __wml.View {
    constructor(__context: BoardDashboard);
    ids: {
        [key: string]: __wml.WMLElement;
    };
    groups: {
        [key: string]: __wml.WMLElement[];
    };
    widgets: __wml.Widget[];
    tree: __wml.Content;
    template: __wml.Template;
    register(e: __wml.WMLElement, attrs: __wml.Attributes<any>): __wml.WMLElement;
    node(tag: string, attrs: __wml.Attrs, children: __wml.Content[]): HTMLElement;
    widget(w: __wml.Widget, attrs: __wml.Attrs): __wml.Content;
    findById<E extends __wml.WMLElement>(id: string): __Maybe<E>;
    findByGroup<E extends __wml.WMLElement>(name: string): __Maybe<E[]>;
    invalidate(): void;
    render(): __wml.Content;
}
