import { Object } from '@quenk/noni/lib/data/jsonx';

export interface Post extends Object {

    id?: number,

    title?: string,

    description?: string,

    company?: string,

    company_email?: string,

    company_logo?: string,

    apply_url?: string,
}
