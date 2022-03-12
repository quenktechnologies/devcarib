import { Value } from '@quenk/noni/lib/data/jsonx';

import { Column } from '@quenk/wml-widgets/lib/data/table';

import { User } from '@mia/types/lib/user';

/**
 * CompanyColumn displays the company name.
 */
export class UsernameColumn implements Column<Value, User> {

    name = 'username';

    heading = 'Username';

}

