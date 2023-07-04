import { Value } from '@quenk/noni/lib/data/jsonx';

import { notNull, optional, Preconditions } from '@quenk/preconditions';

export const validators: Preconditions<Value, Value>[] = [
    {
        poster: notNull,
        email: notNull,
        company: notNull
    },
    {
        title: notNull,
        type: notNull,
        remote: notNull,
        apply_url: optional(notNull)
    },
    {
        description: notNull
    }
];
