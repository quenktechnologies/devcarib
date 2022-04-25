

/**
 * Comment checks module.
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

import { Comment } from '@converse/types/lib/comment';
import { validate, validatePartial } from '@converse/validators/lib/comment';
import { parseMarkdown, inc, unique } from '@devcarib/server/lib/data/checks';

//@ts-ignore: 6133
const _title = 'Comment';
//@ts-ignore: 6133
const _collection = 'comments';

/**
 * @private Used during template generation.
 */
export type DataType = Comment;

/**
 * checks for Comment provided as a map.
 */
export const checks: Preconditions<Value, Value> = {
    'id': _every<Value, Value>(unique('comments', 'id'))
    ,
    'post': _every<Value, Value>(unique('posts', 'id'))
    ,
    'body': _identity
    ,
    'body_html': _identity
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
 * partialChecks for Comment provided as a map.
 */
export const partialChecks: Preconditions<Value, Value> = {
    'id': _identity
    ,
    'post': _identity
    ,
    'body': _identity
    ,
    'body_html': _identity
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
 * check a Comment value.
 */
export const check: Precondition<Value, Comment> =
    _and(_and<Value, Comment, Comment>(
        _async(validate), complete(checks)),
        _every<Comment, Comment>(parseMarkdown('body', 'body_html'), inc('comments'))
    );

/**
 * checkPartial a partial Comment value.
 */
export const checkPartial: Precondition<Value, Partial<Comment>> =
    _and(_and<Value, Comment, Comment>(_async(validatePartial),
        partial(partialChecks)),
        _every(parseMarkdown('body', 'body_html')));

