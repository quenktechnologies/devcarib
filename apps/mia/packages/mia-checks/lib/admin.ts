

/**
 * Admin checks module.
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

import { Admin } from '@mia/types/lib/admin';
import { validate, validatePartial } from '@mia/validators/lib/admin';
import { inc, bcrypt, unique } from '@devcarib/common/lib/checks';

//@ts-ignore: 6133
const _title = 'Admin';
//@ts-ignore: 6133
const _collection = 'admins';

/**
 * @private Used during template generation.
 */
export type DataType = Admin;

/**
 * checks for Admin provided as a map.
 */
export const checks: Preconditions<Value, Value> = {
    'id': _every<Value, Value>(unique('admins', 'id'))
    ,
    'name': _identity
    ,
    'email': _identity
    ,
    'password': _every<Value, Value>(bcrypt)

};

/**
 * partialChecks for Admin provided as a map.
 */
export const partialChecks: Preconditions<Value, Value> = {
    'id': _identity
    ,
    'name': _identity
    ,
    'email': _identity
    ,
    'password': _every<Value, Value>(bcrypt)

};

/**
 * check a Admin value.
 */
export const check: Precondition<Value, Admin> =
    _and(_and<Value, Admin, Admin>(
        _async(validate), complete(checks)),
        _every<Admin, Admin>(inc('users'))
    );

/**
 * checkPartial a partial Admin value.
 */
export const checkPartial: Precondition<Value, Partial<Admin>> =
    _and(_and<Value, Admin, Admin>(_async(validatePartial),
        partial(partialChecks)),
        _every(inc('users')));

