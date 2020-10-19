
/**
 * Login validator.
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

import { Login } from '@board/types/lib/login';

const _string: Precondition<Value, string> = _and(_isString, _trim);


/**
 * validators for Login provided as a map.
 */
export const validators: Preconditions<Value, Value> = {
    'email': _string,

    'password': _string

};

/**
 * partialValidators for Login provided as a map.
 */
export const partialValidators: Preconditions<Value, Value> = {
    'email': _string,

    'password': _string

};

/**
 * validate a single Value against the rules for Login.
 */
export const validate: Precondition<Value, Login> =
    _and(_isRecord, complete<Value, Value, Login>(validators));

/**
 * validate a single Value against the rules for a partial Login.
 */
export const validatePartial: Precondition<Value, Partial<Login>> =
    _and(_isRecord, partial<Value, Value, Login>(partialValidators));


