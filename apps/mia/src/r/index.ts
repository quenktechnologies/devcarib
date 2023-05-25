/* tdc-output-imports */

import * as mongodb from 'mongodb';

// @ts-ignore: 2300
import { Request } from '@quenk/tendril/lib/app/api/request';

import { ApiController } from '@quenk/backend/lib/app/controllers/api';
import { MapModelProvider } from '@quenk/backend/lib/app/model';
import { SkipAndLimit } from '@quenk/backend/lib/app/controllers/api/search/strategy';

import { modelsAvailable } from '@mia/server/lib/models';

/**
 * MiaAPI
 */
export class MiaAPI extends ApiController<mongodb.Db> {

    constructor() {
        super(
            'main',
            new MapModelProvider(modelsAvailable),
            new SkipAndLimit()
        );
    }

}

export const api = new MiaAPI();

/* tdc-output-exports */
