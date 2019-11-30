import { Precondition } from '@quenk/preconditions/lib/async';
import { Value } from '@quenk/noni/lib/data/json';
import { Job } from '@board/types/lib/job';
/**
 * check for Job type.
 */
export declare const check: Precondition<Value, Job>;
