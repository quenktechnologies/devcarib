import * as __wml from '@quenk/wml';
import * as __document from '@quenk/wml/lib/dom';
import { Maybe as __Maybe } from '@quenk/noni/lib/data/maybe';
import { PostFormApp } from '../main';
export declare class PostFormAppView implements __wml.View {
    constructor(__context: PostFormApp);
    ids: {
        [key: string]: __wml.WMLElement;
    };
    groups: {
        [key: string]: __wml.WMLElement[];
    };
    views: __wml.View[];
    widgets: __wml.Widget[];
    tree: Node;
    template: __wml.Template;
    registerView(v: __wml.View): __wml.View;
    register(e: __wml.WMLElement, attrs: __wml.Attributes<any>): __wml.WMLElement;
    node(tag: string, attrs: __wml.Attrs, children: __wml.Content[]): Element | __document.SSRElement;
    widget(w: __wml.Widget, attrs: __wml.Attrs): import("@quenk/wml").Content;
    findById<E extends __wml.WMLElement>(id: string): __Maybe<E>;
    findByGroup<E extends __wml.WMLElement>(name: string): __Maybe<E[]>;
    invalidate(): void;
    render(): __wml.Content;
}
