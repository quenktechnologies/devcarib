import { Object } from '@quenk/noni/lib/data/jsonx';
export interface User extends Object {
    id?: number;
    name?: string;
    email?: string;
    password?: string;
}
