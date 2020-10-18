import { Value } from '@quenk/noni/lib/data/jsonx';
import { Precondition, Preconditions } from '@quenk/preconditions';
import { CandidatePost } from '@board/types/lib/candidatepost';
/**
 * validators for CandidatePost provided as a map.
 */
export declare const validators: Preconditions<Value, Value>;
/**
 * partialValidators for CandidatePost provided as a map.
 */
export declare const partialValidators: Preconditions<Value, Value>;
/**
 * validate a single Value against the rules for CandidatePost.
 */
export declare const validate: Precondition<Value, CandidatePost>;
/**
 * validate a single Value against the rules for a partial CandidatePost.
 */
export declare const validatePartial: Precondition<Value, Partial<CandidatePost>>;
