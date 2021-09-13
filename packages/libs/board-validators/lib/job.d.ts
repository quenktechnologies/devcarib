import { Value } from '@quenk/noni/lib/data/jsonx';
import { Precondition, Preconditions } from '@quenk/preconditions';
import { Job } from '@board/types/lib/job';
/**
 * @private Used during template generation.
 */
export declare type DataType = Job;
/**
 * validators for Job provided as a map.
 */
export declare const validators: Preconditions<Value, Value>;
/**
 * partialValidators for Job provided as a map.
 */
export declare const partialValidators: Preconditions<Value, Value>;
/**
 * validate a single Value against the rules for Job.
 */
export declare const validate: Precondition<Value, Job>;
/**
 * validate a single Value against the rules for a partial Job.
 */
export declare const validatePartial: Precondition<Value, Partial<Job>>;
