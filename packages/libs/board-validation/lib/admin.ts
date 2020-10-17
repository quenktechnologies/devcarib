
/**
 * Admin validator.
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

import { Admin } from '@board/types/lib/admin';


/**
 * validators for Admin provided as a map.
 */
export const validators: Preconditions<Value, Value> = {
    'id': _number,

    'name': _string,

    'email': _string,

    'password': _string

};

/**
 * partialValidators for Admin provided as a map.
 */
export const partialValidators: Preconditions<Value, Value> = {
    'id': _number,

    'name': _string,

    'email': _string,

    'password': _string

};

/**
 * validate a single Value against the rules for Admin.
 */
export const validate: Precondition<Value, Admin> =
    _and(_isRecord, _restrict<Value, Value, Admin>(validators));

/**
 * validate a single Value against the rules for a partial Admin.
 */
export const validatePartial: Precondition<Value, Partial<Admin>> =
    _and(_isRecord, _intersect<Value, Value, Admin>(partialValidators));


