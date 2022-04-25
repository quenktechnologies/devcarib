import { Paths } from '@quenk/jouvert/lib/app/remote/model';

export const me: Paths = {

    get: '/converse/r/me'

}

export const posts: Paths = {

    create: '/converse/r/posts',

    search: '/converse/r/posts',

    update: '/converse/r/posts/{id}',

    get: '/converse/r/posts/{id}',

    remove: '/converse/r/posts/{id}'

}

export const comments: Paths = {

    create: '/converse/r/posts/{id}/comments',

    search: '/converse/r/posts/{id}/comments',

    update: '/converse/r/comments/{id}',

    get: '/converse/r/comments/{id}',

    remove: '/converse/r/comments/{id}'

}

export const jobs: Paths = {

    create: '/r/jobs',

    search: '/r/jobs',

    update: '/jobs/{id}',

    get: '/r/jobs/{id}',

    remove: '/r/jobs/{id}'

}

export const events: Paths = {

    create: '/converse/r/events',

    search: '/converse/r/events',

    update: '/converse/events/{id}',

    get: '/converse/r/events/{id}',

    remove: '/converse/r/events/{id}'

}
