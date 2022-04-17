import { Paths } from '@quenk/jouvert/lib/app/remote/model';

/**
 * This module holds constants for the XHR endpoints of board-admin.
 */
export const jobs: Paths = {

    create: '/mia/r/jobs',

    search: '/mia/r/jobs',

    update: '/mia/r/jobs/{id}',

    get: '/mia/r/jobs/{id}',

    remove: '/mia/r/jobs/{id}',

};

export const users: Paths = {

    create: '/mia/r/users',

    search: '/mia/r/users',

    update: '/mia/r/users/{id}',

    get: '/mia/r/users/{id}',

    remove: '/mia/r/users/{id}',

};
