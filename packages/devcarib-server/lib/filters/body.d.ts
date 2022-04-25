import { Action } from '@quenk/tendril/lib/app/api';
import { Request } from '@quenk/tendril/lib/app/api/request';
/**
 * fromParams extracts properties from the parsed params object to set them to
 * the body part of a request.
 *
 * It reads from the +params and +nparams tags (nparams casts to number) to
 * determine what to extract and set in the form: +params="<key>:<destination>".
 * Multiple pairs can be specified in a comma separated list.
 */
export declare const fromParams: (req: Request) => Action<void>;
