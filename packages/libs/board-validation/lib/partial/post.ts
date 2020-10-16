/**
 * Post validatior.
 * AUTO GENERATED! DO NOT EDIT DIRECTLY! 
 */
/** imports **/
//@ts-ignore: 6133
import { Type } from '@quenk/noni/lib/data/type';
//@ts-ignore: 6133
import { merge as _merge } from '@quenk/noni/lib/data/record';
//@ts-ignore: 6133
import { Value, Object } from '@quenk/noni/lib/data/json';
//@ts-ignore: 6133
import {
    Precondition,
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
    restrict as _restrict,
    intersect as _intersect,
    map as _recordMap
} from '@quenk/preconditions/lib/record';
//@ts-ignore: 6133
import { isBoolean as _boolean } from '@quenk/preconditions/lib/boolean';
//@ts-ignore: 6133
import { toNumber as _number } from '@quenk/preconditions/lib/number';
//@ts-ignore: 6133
import { isString as _string } from '@quenk/preconditions/lib/string';

import { Post } from '@board/types/lib/post';

//@ts-ignore: 6133
const _title = 'Post';
//@ts-ignore: 6133
const _collection = 'posts';
//@ts-ignore: 6133
const _record = _intersect

export const validate: Precondition<Value, Post> =
    _and(_isRecord, _record<Type, Type, Post>({
        'title': _string,

        'description': _string,

        'company': _string,

        'company_email': _string,

        'company_logo': _optional(_string
        ),

        'apply_url': _optional(_string
        ),

    }));

