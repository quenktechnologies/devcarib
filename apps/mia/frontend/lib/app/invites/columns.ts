import { Value } from '@quenk/noni/lib/data/jsonx';

import { Column } from '@quenk/wml-widgets/lib/data/table';

import { Invite } from '@mia/types/lib/invite';

export class EmailColumn implements Column<Value, Invite> {

    name = 'email';

    heading = 'Email';

}

export class UrlColumn implements Column<Value, Invite> {

    name = 'id';

    heading = 'Token';

}

export class CreatedByColumn implements Column<Value, Invite> {

    name = 'created_by';

    heading = 'Invited By';

    format = (inv: Value) => (<{ created_by: string }>inv).created_by

}
