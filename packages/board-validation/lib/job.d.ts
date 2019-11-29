import { Precondition } from '@quenk/preconditions';
import { Value } from '@quenk/noni/lib/data/json';
import { Job } from '@board/types/lib/job';
/**
 * validate a JSON value as a Job.
 */
export declare const validate: Precondition<Value, Job>;
