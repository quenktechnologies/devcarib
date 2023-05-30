/**
 * AUTOGENERATED - DO NOT EDIT DIRECTLY!
 */ 

import { User } from '@mia/types/lib/user';
import { name,username,password } from '@devcarib/common/lib/data/validators';
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
export type DataType = User;

//@ts-ignore: 6133
const _boolean = _booleanPrec.toBoolean;

//@ts-ignore: 6133
const _number = _numberPrec.toNumber;

//@ts-ignore: 6133
const _string:_prec.Precondition<_json.Value, string> =
_prec.and(_stringPrec.isString, _stringPrec.trim);

//@ts-ignore: 6133
const _complete = _recordPrec.restrict;

//@ts-ignore: 6133
const _partial = _recordPrec.intersect;


/**
 * fieldValidators for User (AUTOGENERATED).
 */ 
export const fieldValidators: _prec.Preconditions<_json.Value, _json.Value> = {
      'name' : _prec.and(_prec.notNull,       _prec.and(    _string
,
      _prec.every<_json.Value,_json.Value>(name))
),

      'username' : _prec.and(_prec.notNull,       _prec.and(    _string
,
      _prec.every<_json.Value,_json.Value>(username))
),

      'password' : _prec.and(_prec.notNull,       _prec.and(    _string
,
      _prec.every<_json.Value,_json.Value>(password))
),

      'status' : _prec.and(_prec.notNull,           _number

),

};

/**
 * partialFieldValidators for User (AUTOGENERATED).
 */ 
export const partialFieldValidators:_prec.Preconditions<_json.Value, _json.Value> = {
      'name' : _prec.and(_prec.notNull,       _prec.and(    _string
,
      _prec.every<_json.Value,_json.Value>(name))
),

      'username' : _prec.and(_prec.notNull,       _prec.and(    _string
,
      _prec.every<_json.Value,_json.Value>(username))
),

      'password' : _prec.and(_prec.notNull,       _prec.and(    _string
,
      _prec.every<_json.Value,_json.Value>(password))
),

      'status' : _prec.and(_prec.notNull,           _number

),

};

/**
 * validate a value to determine if it satisfies the User type
 * (AUTOGENERATED).
 */
export const validate: _prec.Precondition<_json.Value, User> =
 _prec.and(
  _recordPrec.isRecord, 
  _recordPrec.restrict<_json.Value, _json.Value, User>(fieldValidators)
 );

/**
 * validatePartial is like validate but only tests the fields encountered
 * (AUTOGENERATED).
 */
export const validatePartial: _prec.Precondition<_json.Value, Partial<User>> =
 _prec.and(
  _recordPrec.isRecord, 
  _recordPrec.intersect<_json.Value, _json.Value, User>(partialFieldValidators)
 );