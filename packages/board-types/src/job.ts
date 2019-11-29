import {Object} from '@quenk/noni/lib/data/json';

export interface Job extends Object {

    id?: string,
    title?: string,
    country?: string,
    city?: string,
    type?: string,
    role?: string,
    industry?: string,
    technologies?: string,
    description?: string,
    link?: string,

}