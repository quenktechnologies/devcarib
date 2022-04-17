import { Paths } from '@quenk/jouvert/lib/app/remote/model';

export const me: Paths = {

    get: '/converse/r/me'

}

export const posts: Paths = {

    create: '/converse/r/posts',

    search: '/converse/r/posts',

    update: '/converse/r/posts/{id}',

    get: '/converse/r/posts/{id}',

    remove: '/converse/r/posts/{id}',

}

export const comments: Paths = {

    create: '/converse/r/posts/{id}/comments',

    search: '/converse/r/posts/{id}/comments',

    update: '/converse/r/comments/{id}',

    get: '/converse/r/comments/{id}',

    remove: '/converse/r/comments/{id}',

}
