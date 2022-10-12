import { Value } from '@quenk/noni/lib/data/jsonx';
import { Precondition, Preconditions } from '@quenk/preconditions/lib/async';
import { Job } from '@converse/types/lib/job';
/**
 * @private Used during template generation.
 */
export declare type DataType = Job;
/**
 * checks for Job provided as a map.
 */
export declare const checks: Preconditions<Value, Value>;
/**
 * partialChecks for Job provided as a map.
 */
export declare const partialChecks: Preconditions<Value, Value>;
/**
 * check a Job value.
 */
export declare const check: Precondition<Value, Job>;
/**
 * checkPartial a partial Job value.
 */
export declare const checkPartial: Precondition<Value, Partial<Job>>;
