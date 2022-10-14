
/**
 * User validators.

 * AUTO GENERATED, DO NOT EDIT DIRECTLY, CHANGES WILL BE LOST!
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
    notNull as _notNull,
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

import { User } from '@converse/types/lib/user';
import { name, email, username, password } from '@devcarib/common/lib/data/validators';

/**
 * @private Used during template generation.
 */
export type DataType = User;

//@ts-ignore: 6133
const _string: Precondition<Value, string> = _and(_isString, _trim);


/**
 * validators for User provided as a map.
 */
export const validators: Preconditions<Value, Value> = {
    'name': _and(_notNull, _and(_string,
        _every<Value, Value>(name))

    ),

    'email': _and(_notNull, _and(_string,
        _every<Value, Value>(email))

    ),

    'username': _and(_notNull, _and(_string,
        _every<Value, Value>(username))

    ),

    'password': _and(_notNull, _and(_string,
        _every<Value, Value>(password))

    ),

};

/**
 * partialValidators for User provided as a map.
 */
export const partialValidators: Preconditions<Value, Value> = {
    'name': _and(_notNull, _and(_string,
        _every<Value, Value>(name))

    ),

    'email': _and(_notNull, _and(_string,
        _every<Value, Value>(email))

    ),

    'username': _and(_notNull, _and(_string,
        _every<Value, Value>(username))

    ),

    'password': _and(_notNull, _and(_string,
        _every<Value, Value>(password))

    ),

};

/**
 * validate a single Value against the rules for User.
 */
export const validate: Precondition<Value, User> =
    _and(_isRecord, complete<Value, Value, User>(validators));

/**
 * validate a single Value against the rules for a partial User.
 */
export const validatePartial: Precondition<Value, Partial<User>> =
    _and(_isRecord, partial<Value, Value, User>(partialValidators));


