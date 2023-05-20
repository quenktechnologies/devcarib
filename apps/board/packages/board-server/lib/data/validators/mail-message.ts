/**
 * AUTOGENERATED - DO NOT EDIT DIRECTLY!
 */ 

import { MailMessage } from '@board/types/lib/mail-message';
import * as _json from '@quenk/noni/lib/data/jsonx';
import * as _prec from '@quenk/preconditions';
import * as _booleanPrec from '@quenk/preconditions/lib/boolean';
import * as _numberPrec from '@quenk/preconditions/lib/number';
import * as _stringPrec from '@quenk/preconditions/lib/string';
import * as _recordPrec from '@quenk/preconditions/lib/record';
import * as _arrayPrec from '@quenk/preconditions/lib/array';

/**
 * DataType validated.
 * 
 * Used by template generation.
 * @private 
 */
export type DataType = MailMessage;

//@ts-ignore: 6133
const _boolean = _booleanPrec.toBoolean;

//@ts-ignore: 6133
const _number = _numberPrec.toNumber;

//@ts-ignore: 6133
const _string:_prec.Precondition<_json.Value, string> =
_prec.and(_stringPrec.isString, _stringPrec.trim);


/**
 * fieldValidators for MailMessage (AUTOGENERATED).
 */ 
export const fieldValidators: _prec.Preconditions<_json.Value, _json.Value> = {
      'to' : _prec.and(_prec.notNull,           _string

),

      'from' : _prec.and(_prec.notNull,           _string

),

      'body' : _prec.and(_prec.notNull,           _string

)

};

/**
 * partialFieldValidators for MailMessage (AUTOGENERATED).
 */ 
export const partialFieldValidators:_prec.Preconditions<_json.Value, _json.Value> = {
      'to' : _prec.and(_prec.notNull,           _string

),

      'from' : _prec.and(_prec.notNull,           _string

),

      'body' : _prec.and(_prec.notNull,           _string

)

};

/**
 * validate a value to determine if it satisfies the MailMessage type
 * (AUTOGENERATED).
 */
export const validate: _prec.Precondition<_json.Value, MailMessage> =
 _prec.and(
  _recordPrec.isRecord, 
  _recordPrec.restrict<_json.Value, _json.Value, MailMessage>(fieldValidators)
 );

/**
 * validatePartial is like validate but only tests the fields encountered
 * (AUTOGENERATED).
 */
export const validatePartial: _prec.Precondition<_json.Value, Partial<MailMessage>> =
 _prec.and(
  _recordPrec.isRecord, 
  _recordPrec.intersect<_json.Value, _json.Value, MailMessage>(partialFieldValidators)
 );