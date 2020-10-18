import { Value } from '@quenk/noni/lib/data/jsonx';
import { Precondition, Preconditions } from '@quenk/preconditions/lib/async';
import { CandidatePost } from '@board/types/lib/candidatepost';
/**
 * checks for CandidatePost provided as a map.
 */
export declare const checks: Preconditions<Value, Value>;
/**
 * partialChecks for CandidatePost provided as a map.
 */
export declare const partialChecks: Preconditions<Value, Value>;
/**
 * check a CandidatePost value.
 */
export declare const check: () => Precondition<Value, CandidatePost>;
/**
 * checkPartial a partial CandidatePost value.
 */
export declare const checkPartial: () => Precondition<Value, Partial<CandidatePost>>;
