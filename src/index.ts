import { Except, attempt } from '@quenk/noni/lib/control/error';
import { left } from '@quenk/noni/lib/data/either';

export interface Fields {

    [key: string]: number

}

/**
 * resolve fields from a string indicator.
 */
export const resolve = (p: string): Except<Fields> =>
    attempt(() => require(`./${p}`).default);
