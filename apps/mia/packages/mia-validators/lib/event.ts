
/**
 * Event validators.

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

import { Event } from '@mia/types/lib/event';
import { textsmall, minLength, date, time, tzoffset, url, textmedium, textlarge, maxLength } from '@devcarib/common/lib/data/validators';

/**
 * @private Used during template generation.
 */
export type DataType = Event;

//@ts-ignore: 6133
const _string: Precondition<Value, string> = _and(_isString, _trim);


/**
 * validators for Event provided as a map.
 */
export const validators: Preconditions<Value, Value> = {
    'title': _and(_notNull, _and(_string,
        _every<Value, Value>(textsmall, minLength(3)))

    ),

    'startDate': _and(_notNull, _and(_string,
        _every<Value, Value>(date))

    ),

    'startTime': _optional(_and(_string,
        _every<Value, Value>(time))

    ),

    'tzOffset': _and(_notNull, _and(_string,
        _every<Value, Value>(tzoffset))

    ),

    'endDate': _optional(_and(_string,
        _every<Value, Value>(date))

    ),

    'endTime': _optional(_and(_string,
        _every<Value, Value>(time))

    ),

    'url': _optional(_and(_string,
        _every<Value, Value>(url))

    ),

    'location': _optional(_and(_string,
        _every<Value, Value>(textsmall))

    ),

    'host': _optional(_and(_string,
        _every<Value, Value>(textmedium))

    ),

    'description': _optional(_and(_string,
        _every<Value, Value>(textlarge, minLength(3), maxLength(6000)))

    ),

};

/**
 * partialValidators for Event provided as a map.
 */
export const partialValidators: Preconditions<Value, Value> = {
    'title': _and(_notNull, _and(_string,
        _every<Value, Value>(textsmall, minLength(3)))

    ),

    'startDate': _and(_notNull, _and(_string,
        _every<Value, Value>(date))

    ),

    'startTime': _optional(_and(_string,
        _every<Value, Value>(time))

    ),

    'tzOffset': _and(_notNull, _and(_string,
        _every<Value, Value>(tzoffset))

    ),

    'endDate': _optional(_and(_string,
        _every<Value, Value>(date))

    ),

    'endTime': _optional(_and(_string,
        _every<Value, Value>(time))

    ),

    'url': _optional(_and(_string,
        _every<Value, Value>(url))

    ),

    'location': _optional(_and(_string,
        _every<Value, Value>(textsmall))

    ),

    'host': _optional(_and(_string,
        _every<Value, Value>(textmedium))

    ),

    'description': _optional(_and(_string,
        _every<Value, Value>(textlarge, minLength(3), maxLength(6000)))

    ),

};

/**
 * validate a single Value against the rules for Event.
 */
export const validate: Precondition<Value, Event> =
    _and(_isRecord, complete<Value, Value, Event>(validators));

/**
 * validate a single Value against the rules for a partial Event.
 */
export const validatePartial: Precondition<Value, Partial<Event>> =
    _and(_isRecord, partial<Value, Value, Event>(partialValidators));


