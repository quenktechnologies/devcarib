import { Value } from '@quenk/noni/lib/data/jsonx';
import { Column, CellContext } from '@quenk/wml-widgets/lib/data/table';
import { Post } from '@board/types/lib/post';
import { TitleColumnView, ActionSpec, ActionColumnView } from './views';
export { ActionSpec };
/**
 * TitleColumnAction is a function invoked when the title of a post is clicked
 * on.
 */
export declare type TitleColumnAction = (p: Post) => void;
/**
 * TitleColumn displays the title of the post.
 */
export declare class TitleColumn implements Column<Value, Post> {
    action: TitleColumnAction;
    constructor(action: TitleColumnAction);
    name: string;
    heading: string;
    cellFragment: (c: CellContext<Value, Post>) => TitleColumnView;
}
/**
 * CompanyColumn displays the company name.
 */
export declare class CompanyColumn implements Column<Value, Post> {
    name: string;
    heading: string;
}
/**
 * StatusColumn displays the approval status of the post.
 */
export declare class StatusColumn implements Column<Value, Post> {
    name: string;
    heading: string;
}
/**
 * ActionColumn displays a drop-down menu with actions that can be taken on a
 * single post.
 */
export declare class ActionColumn implements Column<Value, Post> {
    actions: ActionSpec[];
    constructor(actions: ActionSpec[]);
    name: string;
    heading: string;
    cellFragment: (c: CellContext<Value, Post>) => ActionColumnView;
}
