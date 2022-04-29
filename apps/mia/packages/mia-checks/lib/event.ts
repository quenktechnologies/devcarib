

/**
 * Event checks module.
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

import { Event } from '@mia/types/lib/event';
import { validate, validatePartial } from '@mia/validators/lib/event';
import { parseMarkdown, inc, unique } from '@devcarib/server/lib/data/checks';

//@ts-ignore: 6133
const _title = 'Event';
//@ts-ignore: 6133
const _collection = 'events';

/**
 * @private Used during template generation.
 */
export type DataType = Event;

/**
 * checks for Event provided as a map.
 */
export const checks: Preconditions<Value, Value> = {
    'id': _every<Value, Value>(unique('events', 'id'))
    ,
    'title': _identity
    ,
    'start': _identity
    ,
    'end': _identity
    ,
    'allDay': _identity
    ,
    'url': _identity
    ,
    'location': _identity
    ,
    'host': _identity
    ,
    'description': _identity
    ,
    'description_html': _identity
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
 * partialChecks for Event provided as a map.
 */
export const partialChecks: Preconditions<Value, Value> = {
    'id': _identity
    ,
    'title': _identity
    ,
    'start': _identity
    ,
    'end': _identity
    ,
    'allDay': _identity
    ,
    'url': _identity
    ,
    'location': _identity
    ,
    'host': _identity
    ,
    'description': _identity
    ,
    'description_html': _identity
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
 * check a Event value.
 */
export const check: Precondition<Value, Event> =
    _and(_and<Value, Event, Event>(
        _async(validate), complete(checks)),
        _every<Event, Event>(parseMarkdown('description', 'description_html'), inc('events'))
    );

/**
 * checkPartial a partial Event value.
 */
export const checkPartial: Precondition<Value, Partial<Event>> =
    _and(_and<Value, Event, Event>(_async(validatePartial),
        partial(partialChecks)),
        _every(parseMarkdown('description', 'description_html')));

