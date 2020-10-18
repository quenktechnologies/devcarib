
/**
 * CandidatePost validator.
 * AUTO GENERATED! DO NOT EDIT DIRECTLY!
 */
/** imports **/
//@ts-ignore: 6133
import { merge as _merge } from '@quenk/noni/lib/data/record';
//@ts-ignore: 6133
import { Value, Object } from '@quenk/noni/lib/data/jsonx';
//@ts-ignore: 6133
import {
    Precondition,
    Preconditions,
    optional as _optional,
    and as _and,
    every as _every,
    reject as _reject,
    identity as _identity
} from '@quenk/preconditions';
//@ts-ignore: 6133
import { isArray as _isArray, map as _map } from '@quenk/preconditions/lib/array';
//@ts-ignore: 6133
import {
    isRecord as _isRecord,
    restrict as _restrict,
    intersect as _intersect,
    map as _recordMap
} from '@quenk/preconditions/lib/record';
//@ts-ignore: 6133
import { isBoolean as _boolean } from '@quenk/preconditions/lib/boolean';
//@ts-ignore: 6133
import { toNumber as _number } from '@quenk/preconditions/lib/number';
//@ts-ignore: 6133
import { isString as _string } from '@quenk/preconditions/lib/string';

import { CandidatePost } from '@board/types/lib/candidatepost';


/**
 * validators for CandidatePost provided as a map.
 */
export const validators: Preconditions<Value, Value> = {
    'title': _string,

    'description': _string,

    'company': _string,

    'company_email': _string,

    'company_logo': _optional(_string
    ),

    'apply_url': _optional(_string
    ),

    'approved': _boolean

};

/**
 * partialValidators for CandidatePost provided as a map.
 */
export const partialValidators: Preconditions<Value, Value> = {
    'title': _string,

    'description': _string,

    'company': _string,

    'company_email': _string,

    'company_logo': _optional(_string
    ),

    'apply_url': _optional(_string
    ),

    'approved': _boolean

};

/**
 * validate a single Value against the rules for CandidatePost.
 */
export const validate: Precondition<Value, CandidatePost> =
    _and(_isRecord, _restrict<Value, Value, CandidatePost>(validators));

/**
 * validate a single Value against the rules for a partial CandidatePost.
 */
export const validatePartial: Precondition<Value, Partial<CandidatePost>> =
    _and(_isRecord, _intersect<Value, Value, CandidatePost>(partialValidators));


