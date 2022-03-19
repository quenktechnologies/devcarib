/** AUTO GENERATED MODULE, DO NOT EDIT DIRECTLY. */
/** imports */
import { Record } from '@quenk/noni/lib/data/record';
/**
 * FilterPolicy specifies the allowed searchable fields for a given model
 * within the application.
 */
export interface FilterPolicy {
    [key: string]: string | string[];
}
/**
 * policiesAvailable is a map of model names to FilterPolicys used in the
 * application.
 */
export declare const fields: Record<FilterPolicy>;
