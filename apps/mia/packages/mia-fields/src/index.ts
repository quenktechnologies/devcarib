import { Except, attempt } from '@quenk/noni/lib/control/error';
import { left } from '@quenk/noni/lib/data/either';

/**
 * Fields is an object that can be used in a query to specify the projection of
 * the results.
 */
export interface Fields {

    [key: string]: number

}

/**
 * resolve attempts to provide fields from a string indicator.
 */
export const resolve = (p: string): Except<Fields> =>
    attempt(() => require(`./${p}`).default);
