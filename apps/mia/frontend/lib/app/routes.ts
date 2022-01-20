import { contains } from '@quenk/noni/lib/data/array';
import { Err } from '@quenk/noni/lib/control/error';

import { Resume, RoutingTable } from '@quenk/jouvert/lib/app/service/director';

import { System } from '@quenk/potoo/lib/actor/system';
import { ACTION_IGNORE, ACTION_RAISE } from '@quenk/potoo/lib/actor/template';

import { Request } from '@quenk/frontend-routers/lib/hash';

import { JobsManager } from './jobs/manager';
import { Mia } from './';

let ignoredErrors = ['ClientError', 'ServerError'];

const trap = (e: Err) => contains(ignoredErrors, e.message) ?
    ACTION_IGNORE : ACTION_RAISE;

export const routes: RoutingTable<Request> = {

    '/': {

        id: 'dashboard',

        trap,

        create: (s: System, _: object, r: Resume<Request>) =>
            new JobsManager(<Mia>s, r)

    }

};
