
/**
 * MailMessage validators.

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

import { MailMessage } from '@board/types/lib/mail-message';

/**
 * @private Used during template generation.
 */
export type DataType = MailMessage;

//@ts-ignore: 6133
const _string: Precondition<Value, string> = _and(_isString, _trim);


/**
 * validators for MailMessage provided as a map.
 */
export const validators: Preconditions<Value, Value> = {
    'to': _and(_notNull, _string
    ),

    'from': _and(_notNull, _string
    ),

    'body': _and(_notNull, _string
    )

};

/**
 * partialValidators for MailMessage provided as a map.
 */
export const partialValidators: Preconditions<Value, Value> = {
    'to': _and(_notNull, _string
    ),

    'from': _and(_notNull, _string
    ),

    'body': _and(_notNull, _string
    )

};

/**
 * validate a single Value against the rules for MailMessage.
 */
export const validate: Precondition<Value, MailMessage> =
    _and(_isRecord, complete<Value, Value, MailMessage>(validators));

/**
 * validate a single Value against the rules for a partial MailMessage.
 */
export const validatePartial: Precondition<Value, Partial<MailMessage>> =
    _and(_isRecord, partial<Value, Value, MailMessage>(partialValidators));


