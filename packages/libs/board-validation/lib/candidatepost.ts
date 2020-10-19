
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
    restrict as complete,
    intersect as partial,
    map as _recordMap
} from '@quenk/preconditions/lib/record';
//@ts-ignore: 6133
import { isBoolean as _boolean } from '@quenk/preconditions/lib/boolean';
//@ts-ignore: 6133
import { toNumber as _number } from '@quenk/preconditions/lib/number';
//@ts-ignore: 6133
import {
    isString as _isString,
    trim as _trim
} from '@quenk/preconditions/lib/string';

import { CandidatePost } from '@board/types/lib/candidatepost';
import { textsmall, textlarge, name, email, url } from './';

const _string: Precondition<Value, string> = _and(_isString, _trim);


/**
 * validators for CandidatePost provided as a map.
 */
export const validators: Preconditions<Value, Value> = {
    'title': _and(_string,
        _every<Value, Value>(textsmall)),

    'description': _and(_string,
        _every<Value, Value>(textlarge)),

    'company': _and(_string,
        _every<Value, Value>(name)),

    'company_email': _and(_string,
        _every<Value, Value>(email)),

    'company_logo': _optional(_and(_string,
        _every<Value, Value>(url))

    ),

    'apply_url': _optional(_and(_string,
        _every<Value, Value>(url))

    ),

    'approved': _boolean

};

/**
 * partialValidators for CandidatePost provided as a map.
 */
export const partialValidators: Preconditions<Value, Value> = {
    'title': _and(_string,
        _every<Value, Value>(textsmall)),

    'description': _and(_string,
        _every<Value, Value>(textlarge)),

    'company': _and(_string,
        _every<Value, Value>(name)),

    'company_email': _and(_string,
        _every<Value, Value>(email)),

    'company_logo': _optional(_and(_string,
        _every<Value, Value>(url))

    ),

    'apply_url': _optional(_and(_string,
        _every<Value, Value>(url))

    ),

    'approved': _boolean

};

/**
 * validate a single Value against the rules for CandidatePost.
 */
export const validate: Precondition<Value, CandidatePost> =
    _and(_isRecord, complete<Value, Value, CandidatePost>(validators));

/**
 * validate a single Value against the rules for a partial CandidatePost.
 */
export const validatePartial: Precondition<Value, Partial<CandidatePost>> =
    _and(_isRecord, partial<Value, Value, CandidatePost>(partialValidators));

