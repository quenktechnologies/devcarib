import { Object } from '@quenk/noni/lib/data/jsonx';

import { Action, doAction } from '@quenk/tendril/lib/app/api';
import { Request } from '@quenk/tendril/lib/app/api/request';
import { abort, next } from '@quenk/tendril/lib/app/api/control';
import { forbidden } from '@quenk/tendril/lib/app/api/response';

import { now } from '@devcarib/common/lib/data/datetime';

/**
 * KeySpec is a string specifying the session key to retreive the audit object
 * from and the destination key to set on the request body separated by a comma.
 *
 * Example: "user:created_by"
 */
export type KeySpec = string;

const supportedMethods = ['POST', 'PATCH'];

/**
 * auditWrite sets the following keys on POST and PATCH requests respectively.
 * POST:
 *   created_by, created_on
 * PATCH:
 *  last_updated_by, last_updated_on
 *
 * The values for created_by and last_updated_by are fetched from the session.
 *
 * @param key - The session key to get the value from.
 */
export const auditWrite = (key: string) => (req: Request): Action<void> =>
    doAction(function*() {

        if (!supportedMethods.includes(req.method)) return next(req);

        let body = <Object>(req.body) || {};

        let muser = req.session.get(key);

        if (muser.isNothing()) {

            forbidden();

            return abort();

        }

        if (req.method === 'POST') {

            body.created_by = muser.get();

            body.created_on = now();

        } else if (req.method === 'PATCH') {

            body.last_updated_by = <Object>muser.get();

            body.last_updated_on = now();

        }

        req.body = body;

        return next(req);

    })

/**
 * ensureOwner adds a query to +query to ensure the action only takes place on
 * objects owned by the current user.
 *
 * This relies on the compileQueryTag filter being installed and must be
 * installed before it.
 */
export const ensureOwner = (req: Request): Action<void> =>
    doAction(function*() {

        if (!req.route.tags.owned) return next(req);

        let id = req.session.getOrElse('user.id', '');

        let filter = `created_by.id:${id}`;

        let { query } = req.route.tags;

        req.route.tags.query = req.route.tags.query ?
            `(${query}) and ${filter}` : filter;

        return next(req);

    })
