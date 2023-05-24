/**
 * AUTOGENERATED - DO NOT EDIT DIRECTLY!
 */
 
import { Invite } from '@mia/types/lib/invite';
import { validate,validatePartial } from '../validators/invite';
import { rand } from '@devcarib/server/lib/data/checks';
import * as _json from '@quenk/noni/lib/data/jsonx';
import * as _prec from '@quenk/preconditions/lib/async';
import * as _recordPrec from '@quenk/preconditions/lib/async/record';
import * as _arrayPrec from '@quenk/preconditions/lib/async/array';

//@ts-ignore: 6133
const title = "Invite";
//@ts-ignore: 6133
const collection = "invites";

//@ts-ignore: 6133
const _complete = _recordPrec.restrict;

//@ts-ignore: 6133
const _partial = _recordPrec.intersect;

/**
 * DataType checked.
 * 
 * Used by template generation.
 * @private 
 */
export type DataType = Invite;

/**
 * fieldChecks for Invite (AUTOGENERATED).
 */ 
export const fieldChecks: _prec.Preconditions<_json.Value, _json.Value> = {

    'id':                _prec.identity
,

    'name': _prec.identity,

    'email': _prec.identity,

    'token':                _prec.identity
,

    'message': _prec.identity,

    'accepted_on':                _prec.identity

};

/**
 * partialFieldChecks for Invite (AUTOGENERATED).
 */ 
export const partialFieldChecks: _prec.Preconditions<_json.Value, _json.Value> = {

    'id':                 _prec.identity
,
    'name': _prec.identity,
    'email': _prec.identity,
    'token':                 _prec.identity
,
    'message': _prec.identity,
    'accepted_on':                 _prec.identity
};

/**
 * check a value to determine if it is a correct Invite
 * (AUTOGENERATED).
 */
export const check: _prec.Precondition<_json.Value, Invite> = 
    _prec.and(_prec.and<_json.Value, Invite,Invite>(
      _prec.async(validate), _recordPrec.restrict(fieldChecks)),
      _prec.every<Invite,Invite>(rand('id'))
     );

/**
 * checkPartial is like check but only checks the fields encountered.
 * (AUTOGENERATED).
 */
 export const checkPartial: _prec.Precondition<_json.Value, Partial<Invite>> = 
    _prec.and<_json.Value, Invite,Invite>(_prec.async<_json.Value,Invite>(validatePartial), 
   _recordPrec.intersect(partialFieldChecks));  
