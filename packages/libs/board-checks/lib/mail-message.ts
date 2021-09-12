

/**
 * MailMessage checks module.
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

import { MailMessage } from '@board/types/lib/mail-message';
import { validate, validatePartial } from '@board/validators/lib/mail-message';

//@ts-ignore: 6133
const _title = 'MailMessage';
//@ts-ignore: 6133
const _collection = 'mail';

/**
 * @private Used during template generation.
 */
export type DataType = MailMessage;

/**
 * checks for MailMessage provided as a map.
 */
export const checks: Preconditions<Value, Value> = {
    'id': _identity
    ,
    'to': _identity
    ,
    'from': _identity
    ,
    'body': _identity

};

/**
 * partialChecks for MailMessage provided as a map.
 */
export const partialChecks: Preconditions<Value, Value> = {
    'id': _identity
    ,
    'to': _identity
    ,
    'from': _identity
    ,
    'body': _identity

};

/**
 * check a MailMessage value.
 */
export const check: Precondition<Value, MailMessage> =
    _and<Value, MailMessage, MailMessage>(_async<Value, MailMessage>(validate),
        complete(checks));

/**
 * checkPartial a partial MailMessage value.
 */
export const checkPartial: Precondition<Value, Partial<MailMessage>> =
    _and<Value, MailMessage, MailMessage>(_async<Value, MailMessage>(validatePartial),
        partial(partialChecks));

