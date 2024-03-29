import { contains } from '@quenk/noni/lib/data/array';
import { Err } from '@quenk/noni/lib/control/error';

import { Resume, RoutingTable } from '@quenk/jouvert/lib/app/service/director';

import { System } from '@quenk/potoo/lib/actor/system';
import { ACTION_IGNORE, ACTION_RAISE } from '@quenk/potoo/lib/actor/template';

import { Request } from '@quenk/frontend-routers/lib/hash';

import { Dashboard } from './dashboard';
import { Converse } from './';
import { PostThread } from './posts/thread';

let ignoredErrors = ['ClientError', 'ServerError'];

export const trap = (e: Err) =>
    contains(ignoredErrors, e.message) ? ACTION_IGNORE : ACTION_RAISE;

export const routes: RoutingTable<Request> = {
    '/': {
        id: 'dashboard',

        trap,

        create: (s: System, _: object, r: Resume<Request>) =>
            new Dashboard(<Converse>s, r)
    },

    '/posts/:id': {
        id: 'post',

        trap,

        create: (s: System, _: object, r: Resume<Request>) =>
            new PostThread(<Converse>s, r)
    }
};
