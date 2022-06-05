

/**
 * Invite checks module.
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

import { Invite } from '@converse/types/lib/invite';
import { validate, validatePartial } from '@converse/validators/lib/invite';
import { rand } from '@devcarib/server/lib/data/checks';

//@ts-ignore: 6133
const _title = 'Invite';
//@ts-ignore: 6133
const _collection = 'invites';

/**
 * @private Used during template generation.
 */
export type DataType = Invite;

/**
 * checks for Invite provided as a map.
 */
export const checks: Preconditions<Value, Value> = {
    'id': _identity
    ,
    'name': _identity
    ,
    'email': _identity
    ,
    'token': _identity
    ,
    'message': _identity
    ,
    'accepted_on': _identity

};

/**
 * partialChecks for Invite provided as a map.
 */
export const partialChecks: Preconditions<Value, Value> = {
    'id': _identity
    ,
    'name': _identity
    ,
    'email': _identity
    ,
    'token': _identity
    ,
    'message': _identity
    ,
    'accepted_on': _identity

};

/**
 * check a Invite value.
 */
export const check: Precondition<Value, Invite> =
    _and(_and<Value, Invite, Invite>(
        _async(validate), complete(checks)),
        _every<Invite, Invite>(rand('id'))
    );

/**
 * checkPartial a partial Invite value.
 */
export const checkPartial: Precondition<Value, Partial<Invite>> =
    _and<Value, Invite, Invite>(_async<Value, Invite>(validatePartial),
        partial(partialChecks));

