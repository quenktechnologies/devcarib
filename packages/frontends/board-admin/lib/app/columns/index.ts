import { Value } from '@quenk/noni/lib/data/jsonx';

import { Column, CellContext } from '@quenk/wml-widgets/lib/data/table';

import { Post } from '@board/types/lib/post';

import { TitleColumnView, ActionSpec, ActionColumnView } from './views';

export { ActionSpec }

/**
 * TitleColumnAction is a function invoked when the title of a post is clicked
 * on.
 */
export type TitleColumnAction = (p: Post) => void;

/**
 * TitleColumn displays the title of the post.
 */
export class TitleColumn implements Column<Value, Post> {

    constructor(public action: TitleColumnAction) { }

    name = 'title';

    heading = 'Title';

    cellFragment = (c: CellContext<Value, Post>) => new TitleColumnView({

        post: c.datum,

        onClick: () => this.action(c.datum)

    });

}

/**
 * CompanyColumn displays the company name.
 */
export class CompanyColumn implements Column<Value, Post> {

    name = 'company';

    heading = 'Company';

}

/**
 * StatusColumn displays the approval status of the post.
 */
export class StatusColumn implements Column<Value, Post> {

    name = 'status';

    heading = 'Status';

}

/**
 * ActionColumn displays a drop-down menu with actions that can be taken on a
 * single post.
 */
export class ActionColumn implements Column<Value, Post> {

    constructor(public actions: ActionSpec[]) { }

    name = '';

    heading = 'Actions';

    cellFragment = (c: CellContext<Value, Post>) => new ActionColumnView({

        actions: this.actions,

        post: c.datum

    });

}
