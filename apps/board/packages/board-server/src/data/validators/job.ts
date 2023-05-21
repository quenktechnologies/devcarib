/**
 * AUTOGENERATED - DO NOT EDIT DIRECTLY!
 */ 

import { Job } from '@board/types/lib/job';
import { textsmall,minLength,textlarge,maxLength,name,email,url,jobStatus } from './common';
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
export type DataType = Job;

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
 * fieldValidators for Job (AUTOGENERATED).
 */ 
export const fieldValidators: _prec.Preconditions<_json.Value, _json.Value> = {
      'title' : _prec.and(_prec.notNull,       _prec.and(    _string
,
      _prec.every<_json.Value,_json.Value>(textsmall,minLength(3)))
),

      'type' : _prec.and(_prec.notNull,       _prec.and(    _string
,
      _prec.every<_json.Value,_json.Value>(textsmall))
),

      'location' : _prec.and(_prec.notNull,       _prec.and(    _string
,
      _prec.every<_json.Value,_json.Value>(textsmall))
),

      'remote' : _prec.optional(          _boolean

),

      'description' : _prec.and(_prec.notNull,       _prec.and(    _string
,
      _prec.every<_json.Value,_json.Value>(textlarge,minLength(3),maxLength(6000)))
),

      'company' : _prec.and(_prec.notNull,       _prec.and(    _string
,
      _prec.every<_json.Value,_json.Value>(name))
),

      'company_email' : _prec.and(_prec.notNull,       _prec.and(    _string
,
      _prec.every<_json.Value,_json.Value>(email))
),

      'company_logo' : _prec.optional(      _prec.and(    _string
,
      _prec.every<_json.Value,_json.Value>(url))
),

      'apply_url' : _prec.optional(      _prec.and(    _string
,
      _prec.every<_json.Value,_json.Value>(url))
),

      'approved' : _prec.optional(          _boolean

),

      'status' : _prec.and(_prec.notNull,       _prec.and(    _string
,
      _prec.every<_json.Value,_json.Value>(jobStatus))
),

};

/**
 * partialFieldValidators for Job (AUTOGENERATED).
 */ 
export const partialFieldValidators:_prec.Preconditions<_json.Value, _json.Value> = {
      'title' : _prec.and(_prec.notNull,       _prec.and(    _string
,
      _prec.every<_json.Value,_json.Value>(textsmall,minLength(3)))
),

      'type' : _prec.and(_prec.notNull,       _prec.and(    _string
,
      _prec.every<_json.Value,_json.Value>(textsmall))
),

      'location' : _prec.and(_prec.notNull,       _prec.and(    _string
,
      _prec.every<_json.Value,_json.Value>(textsmall))
),

      'remote' : _prec.optional(          _boolean

),

      'description' : _prec.and(_prec.notNull,       _prec.and(    _string
,
      _prec.every<_json.Value,_json.Value>(textlarge,minLength(3),maxLength(6000)))
),

      'company' : _prec.and(_prec.notNull,       _prec.and(    _string
,
      _prec.every<_json.Value,_json.Value>(name))
),

      'company_email' : _prec.and(_prec.notNull,       _prec.and(    _string
,
      _prec.every<_json.Value,_json.Value>(email))
),

      'company_logo' : _prec.optional(      _prec.and(    _string
,
      _prec.every<_json.Value,_json.Value>(url))
),

      'apply_url' : _prec.optional(      _prec.and(    _string
,
      _prec.every<_json.Value,_json.Value>(url))
),

      'approved' : _prec.optional(          _boolean

),

      'status' : _prec.and(_prec.notNull,       _prec.and(    _string
,
      _prec.every<_json.Value,_json.Value>(jobStatus))
),

};

/**
 * validate a value to determine if it satisfies the Job type
 * (AUTOGENERATED).
 */
export const validate: _prec.Precondition<_json.Value, Job> =
 _prec.and(
  _recordPrec.isRecord, 
  _recordPrec.restrict<_json.Value, _json.Value, Job>(fieldValidators)
 );

/**
 * validatePartial is like validate but only tests the fields encountered
 * (AUTOGENERATED).
 */
export const validatePartial: _prec.Precondition<_json.Value, Partial<Job>> =
 _prec.and(
  _recordPrec.isRecord, 
  _recordPrec.intersect<_json.Value, _json.Value, Job>(partialFieldValidators)
 );
