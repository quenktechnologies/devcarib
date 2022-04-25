

/**
 * User checks module.
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

import { User } from '@converse/types/lib/user';
import { validate, validatePartial } from '@converse/validators/lib/user';
import { unique, bcrypt } from '@devcarib/server/lib/data/checks';

//@ts-ignore: 6133
const _title = 'User';
//@ts-ignore: 6133
const _collection = 'users';

/**
 * @private Used during template generation.
 */
export type DataType = User;

/**
 * checks for User provided as a map.
 */
export const checks: Preconditions<Value, Value> = {
    'id': _identity
    ,
    'name': _identity
    ,
    'username': _every<Value, Value>(unique(_collection, 'username'))
    ,
    'password': _every<Value, Value>(bcrypt)
    ,
    'status': _identity
    ,
    'last_login': _identity

};

/**
 * partialChecks for User provided as a map.
 */
export const partialChecks: Preconditions<Value, Value> = {
    'id': _identity
    ,
    'name': _identity
    ,
    'username': _every<Value, Value>(unique(_collection, 'username'))
    ,
    'password': _every<Value, Value>(bcrypt)
    ,
    'status': _identity
    ,
    'last_login': _identity

};

/**
 * check a User value.
 */
export const check: Precondition<Value, User> =
    _and<Value, User, User>(_async<Value, User>(validate),
        complete(checks));

/**
 * checkPartial a partial User value.
 */
export const checkPartial: Precondition<Value, Partial<User>> =
    _and<Value, User, User>(_async<Value, User>(validatePartial),
        partial(partialChecks));

