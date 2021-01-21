
/**
 * Post validators.

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

import { Post } from '@board/types/lib/post';
import { textsmall, minLength, textlarge, name, email, url } from './validators';

/**
 * @private Used during template generation.
 */
export type DataType = Post;

//@ts-ignore: 6133
const _string: Precondition<Value, string> = _and(_isString, _trim);


/**
 * validators for Post provided as a map.
 */
export const validators: Preconditions<Value, Value> = {
    'approved': _optional(_boolean
    ),

    'title': _and(_notNull, _and(_string,
        _every<Value, Value>(textsmall, minLength(3)))

    ),

    'description': _and(_notNull, _and(_string,
        _every<Value, Value>(textlarge, minLength(3)))

    ),

    'company': _and(_notNull, _and(_string,
        _every<Value, Value>(name))

    ),

    'company_email': _and(_notNull, _and(_string,
        _every<Value, Value>(email))

    ),

    'company_logo': _optional(_and(_string,
        _every<Value, Value>(url))

    ),

    'apply_url': _optional(_and(_string,
        _every<Value, Value>(url))

    )

};

/**
 * partialValidators for Post provided as a map.
 */
export const partialValidators: Preconditions<Value, Value> = {
    'approved': _optional(_boolean
    ),

    'title': _and(_notNull, _and(_string,
        _every<Value, Value>(textsmall, minLength(3)))

    ),

    'description': _and(_notNull, _and(_string,
        _every<Value, Value>(textlarge, minLength(3)))

    ),

    'company': _and(_notNull, _and(_string,
        _every<Value, Value>(name))

    ),

    'company_email': _and(_notNull, _and(_string,
        _every<Value, Value>(email))

    ),

    'company_logo': _optional(_and(_string,
        _every<Value, Value>(url))

    ),

    'apply_url': _optional(_and(_string,
        _every<Value, Value>(url))

    )

};

/**
 * validate a single Value against the rules for Post.
 */
export const validate: Precondition<Value, Post> =
    _and(_isRecord, complete<Value, Value, Post>(validators));

/**
 * validate a single Value against the rules for a partial Post.
 */
export const validatePartial: Precondition<Value, Partial<Post>> =
    _and(_isRecord, partial<Value, Value, Post>(partialValidators));


