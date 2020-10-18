

/**
 * CandidatePost checks module.
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
    discard as _discard,
    and as _and,
    or as _or,
    match as _match,
    caseOf as _caseOf,
    async as _async,
    identity as _identity,
    every as _every,
    reject as _reject
} from '@quenk/preconditions/lib/async';
//@ts-ignore: 6133
import {
    map as _map
} from '@quenk/preconditions/lib/async/array';
//@ts-ignore: 6133
import {
    restrict as _restrict,
    intersect as _intersect,
    map as _recordMap,
} from '@quenk/preconditions/lib/async/record';

import { CandidatePost } from '@board/types/lib/candidatepost';
import { validate, validatePartial } from '@board/validation/lib/candidatepost';
import { inc, unique } from './';

//@ts-ignore: 6133
const _title = 'CandidatePost';
//@ts-ignore: 6133
const _collection = 'posts';

/**
 * checks for CandidatePost provided as a map.
 */
export const checks: Preconditions<Value, Value> = {
    'created_by': _identity
    ,
    'created_on': _identity
    ,
    'last_updated_on': _identity
    ,
    'last_updated_by': _identity
    ,
    'id': _every<Value, Value>(inc('counters.post'), unique('posts', 'id'))
    ,
    'title': _identity
    ,
    'description': _identity
    ,
    'company': _identity
    ,
    'company_email': _identity
    ,
    'company_logo': _identity
    ,
    'apply_url': _identity
    ,
    'approved': _identity

};

/**
 * partialChecks for CandidatePost provided as a map.
 */
export const partialChecks: Preconditions<Value, Value> = {
    'created_by': _identity
    ,
    'created_on': _identity
    ,
    'last_updated_on': _identity
    ,
    'last_updated_by': _identity
    ,
    'id': _every<Value, Value>(inc('counters.post'), unique('posts', 'id'))
    ,
    'title': _identity
    ,
    'description': _identity
    ,
    'company': _identity
    ,
    'company_email': _identity
    ,
    'company_logo': _identity
    ,
    'apply_url': _identity
    ,
    'approved': _identity

};




/**
 * check a CandidatePost value.
 */
export const check = (): Precondition<Value, CandidatePost> =>
    _and<Value, CandidatePost, CandidatePost>(_async(validate),
        _restrict(checks));

/**
 * checkPartial a partial CandidatePost value.
 */
export const checkPartial = (): Precondition<Value, Partial<CandidatePost>> =>
    _and<Value, CandidatePost, CandidatePost>(_async(validatePartial),
        _intersect(partialChecks));

