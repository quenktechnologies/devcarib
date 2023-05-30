import { Future, pure } from '@quenk/noni/lib/control/monad/future';

/**
 * connected hook sample.
 */
export const connected = (): Future<void> =>
    pure(console.info('board: Connections established.'));

/**
 * started hook sample
 */
export const started = (): Future<void> => pure(console.info('board: running'));
