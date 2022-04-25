import { Object, Value } from '@quenk/noni/lib/data/jsonx';
import { identity } from '@quenk/noni/lib/data/function';

import { Action, doAction } from '@quenk/tendril/lib/app/api';
import { Request } from '@quenk/tendril/lib/app/api/request';
import { next } from '@quenk/tendril/lib/app/api/control';

const supportedMethods = ['POST', 'PATCH'];

/**
 * fromParams extracts properties from the parsed params object to set them to
 * the body part of a request.
 *
 * It reads from the +params and +nparams tags (nparams casts to number) to
 * determine what to extract and set in the form: +params="<key>:<destination>".
 * Multiple pairs can be specified in a comma separated list.
 */
export const fromParams = (req: Request): Action<void> => doAction(function*() {

    if (!supportedMethods.includes(req.method) ||
    !req.route.tags.params &&
    !req.route.tags.nparams) return next(req);

    req.body = getPairs(<string>req.route.tags.params)
        .reduce(ingest(req.params), <Object>req.body);

    req.body = getPairs(<string>req.route.tags.nparams)
        .reduce(ingest(req.params, Number), <Object>req.body);

    return next(req);

});

const getPairs = (str: string = '') => str.split(',').map(param => {

    let pair = param.split(':');

    return <[string, string]>((pair.length === 2) ? pair : [pair[0], pair[0]]);

});

const ingest = (src: Object, trans: ((val: Value) => Value) = identity) =>
    (dest: Object, [param, key]: [string, string]) => {

        dest[key] = trans(src[param]);

        return dest;

    }
