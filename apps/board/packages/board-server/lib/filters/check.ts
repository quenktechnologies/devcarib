/* tdc-output-imports */
import { Value } from '@quenk/noni/lib/data/jsonx';

import { badRequest, conflict } from '@quenk/tendril/lib/app/api/response';
import { Request } from '@quenk/tendril/lib/app/api/request';
import { Action, doAction } from '@quenk/tendril/lib/app/api';
import { fork, abort, next } from '@quenk/tendril/lib/app/api/control';

import { Precondition } from '@quenk/preconditions/lib/async';

/**
 * Checks map.
 */
export interface Checks {

    [key: string]: Precondition<Value, Value>

}

const supportedMethods = ['POST', 'PATCH'];

/**
 * checkBody executes a [[Precondition]] from the checks map provided on the
 * request body upon attempt to create or update data.
 *
 * This filter reads the "model" tag to determine which check from the map to
 * use. If the check fails, a 409 status is sent along with the errors. If
 * no check is found for the specified model, status 400 is sent.
 */
export const checkBody = (
    full: Checks,
    partial:Checks,
    messages: object = {}) => (req: Request): Action<void> =>
        doAction(function*() {

            if (!supportedMethods.includes(req.method)) return next(req);

            let ptr = <string>req.route.tags.model;

            let check = ((req.method === 'PATCH') ? partial : full)[ptr];

            if (!check) return badRequest();

            let eresult = yield fork(check(req.body));

            if (eresult.isLeft()) {

                let errors = eresult.takeLeft().explain(messages);

                yield conflict({ errors });

                return abort();

            }

            req.body = eresult.takeRight();

            return next(req);

        });
