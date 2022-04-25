

/**
 * Job checks module.
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
    restrict as complete,
    intersect as partial,
    map as _recordMap,
} from '@quenk/preconditions/lib/async/record';

import { Job } from '@mia/types/lib/job';
import { validate, validatePartial } from '@mia/validators/lib/job';
import { parseMarkdown, inc, unique } from '@devcarib/server/lib/data/checks';

//@ts-ignore: 6133
const _title = 'Job';
//@ts-ignore: 6133
const _collection = 'jobs';

/**
 * @private Used during template generation.
 */
export type DataType = Job;

/**
 * checks for Job provided as a map.
 */
export const checks: Preconditions<Value, Value> = {
    'id': _every<Value, Value>(unique('jobs', 'id'))
    ,
    'title': _identity
    ,
    'type': _identity
    ,
    'location': _identity
    ,
    'remote': _identity
    ,
    'description': _identity
    ,
    'description_html': _identity
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
    ,
    'payment_currency': _identity
    ,
    'payment_amount': _identity
    ,
    'payment_frequency': _identity
    ,
    'status': _identity
    ,
    'created_by': _identity
    ,
    'created_on': _identity
    ,
    'last_updated_on': _identity
    ,
    'last_updated_by': _identity

};

/**
 * partialChecks for Job provided as a map.
 */
export const partialChecks: Preconditions<Value, Value> = {
    'id': _identity
    ,
    'title': _identity
    ,
    'type': _identity
    ,
    'location': _identity
    ,
    'remote': _identity
    ,
    'description': _identity
    ,
    'description_html': _identity
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
    ,
    'payment_currency': _identity
    ,
    'payment_amount': _identity
    ,
    'payment_frequency': _identity
    ,
    'status': _identity
    ,
    'created_by': _identity
    ,
    'created_on': _identity
    ,
    'last_updated_on': _identity
    ,
    'last_updated_by': _identity

};

/**
 * check a Job value.
 */
export const check: Precondition<Value, Job> =
    _and(_and<Value, Job, Job>(
        _async(validate), complete(checks)),
        _every<Job, Job>(parseMarkdown('description', 'description_html'), inc('jobs'))
    );

/**
 * checkPartial a partial Job value.
 */
export const checkPartial: Precondition<Value, Partial<Job>> =
    _and(_and<Value, Job, Job>(_async(validatePartial),
        partial(partialChecks)),
        _every(parseMarkdown('description', 'description_html'), inc('jobs')));

