
/**
 * Invite validators.

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

import { Invite } from '@converse/types/lib/invite';
import { textlarge, minLength, maxLength } from '@devcarib/common/lib/data/validators';

/**
 * @private Used during template generation.
 */
export type DataType = Invite;

//@ts-ignore: 6133
const _string: Precondition<Value, string> = _and(_isString, _trim);


/**
 * validators for Invite provided as a map.
 */
export const validators: Preconditions<Value, Value> = {
    'name': _and(_notNull, _string
    ),

    'email': _and(_notNull, _string
    ),

    'message': _optional(_and(_string,
        _every<Value, Value>(textlarge, minLength(1), maxLength(6000)))

    ),

};

/**
 * partialValidators for Invite provided as a map.
 */
export const partialValidators: Preconditions<Value, Value> = {
    'name': _and(_notNull, _string
    ),

    'email': _and(_notNull, _string
    ),

    'message': _optional(_and(_string,
        _every<Value, Value>(textlarge, minLength(1), maxLength(6000)))

    ),

};

/**
 * validate a single Value against the rules for Invite.
 */
export const validate: Precondition<Value, Invite> =
    _and(_isRecord, complete<Value, Value, Invite>(validators));

/**
 * validate a single Value against the rules for a partial Invite.
 */
export const validatePartial: Precondition<Value, Partial<Invite>> =
    _and(_isRecord, partial<Value, Value, Invite>(partialValidators));


