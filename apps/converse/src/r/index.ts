/* tdc-output-imports */

import * as mongodb from 'mongodb';

// @ts-ignore: 2300
import { Request } from '@quenk/tendril/lib/app/api/request';
import { notFound, ok } from '@quenk/tendril/lib/app/api/response';
import { Action } from '@quenk/tendril/lib/app/api';

import { ApiController } from '@quenk/backend/lib/app/controllers/api';
import { MapModelProvider } from '@quenk/backend/lib/app/model';
import { SkipAndLimit } from '@quenk/backend/lib/app/controllers/api/search/strategy';

import { modelsAvailable } from '@converse/server/lib/models';

import { User } from '@converse/types/lib/user';

export class ConverseApi extends ApiController<mongodb.Db> {
    constructor() {
        super(
            'main',
            new MapModelProvider(modelsAvailable),
            new SkipAndLimit()
        );
    }

    users = {
        get(req: Request): Action<void> {
            let muser = req.session.get('user');

            if (muser.isNothing()) return notFound();

            return ok({ data: muser.get() });
        },

        update(req: Request): Action<void> {
            let muser = req.session.get('user');

            if (muser.isNothing()) return notFound();

            req.params.id = String((<User>muser.get()).id);

            return super.update(req);
        }
    };
}

export const api = new ConverseApi();

/* tdc-output-exports */
