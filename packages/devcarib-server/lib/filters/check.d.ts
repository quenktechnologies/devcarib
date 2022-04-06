import { Value } from '@quenk/noni/lib/data/jsonx';
import { Request } from '@quenk/tendril/lib/app/api/request';
import { Action } from '@quenk/tendril/lib/app/api';
import { Precondition } from '@quenk/preconditions/lib/async';
/**
 * Checks map.
 */
export interface Checks {
    [key: string]: Precondition<Value, Value>;
}
/**
 * checkBody executes a [[Precondition]] from the checks map provided on the
 * request body upon attempt to create or update data.
 *
 * This filter reads the "model" tag to determine which check from the map to
 * use. If the check fails, a 409 status is sent along with the errors. If
 * no check is found for the specified model, status 400 is sent.
 */
export declare const checkBody: (full: Checks, partial: Checks, messages?: object) => (req: Request) => Action<void>;
