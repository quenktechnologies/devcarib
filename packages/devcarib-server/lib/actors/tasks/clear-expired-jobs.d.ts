import { Immutable } from '@quenk/potoo/lib/actor/resident';
import { Case } from '@quenk/potoo/lib/actor/resident/case';
import { Address } from '@quenk/potoo/lib/actor/address';
import { Tick } from '../task/clock';
export declare type Message = Tick;
/**
 * ClearExpiredJobsTask removes jobs that have been posted POST_EXPIRE_MONTHS
 * ago from the database.
 */
export declare class ClearExpiredJobsTask extends Immutable<Message> {
    receive(): Case<{
        src: unknown;
    }>[];
    /**
     * clear the expired job postings.
     */
    clear(clock: Address): import("@quenk/noni/lib/control/monad/future").Future<undefined>;
    run(): void;
}
