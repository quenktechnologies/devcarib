import * as http from 'http';

import { merge } from '@quenk/noni/lib/data/record';
import { doFuture, attempt, pure } from '@quenk/noni/lib/control/monad/future';
import { assert } from '@quenk/test/lib/assert';
import { Agent, defaultOptions } from '@quenk/jhr/lib/agent';
import { JSONTransform } from '@quenk/jhr/lib/agent/transform/json';
import { FormTransform } from '@quenk/jhr/lib/agent/transform/form';
import { NodeHTTPTransport } from '@quenk/jhr/lib/agent/transport/node';
import { MemoryContainer } from '@quenk/jhr/lib/cookie/container/memory';
import { JSONParser } from '@quenk/jhr/lib/agent/parser/json';
import { NoParser } from '@quenk/jhr/lib/agent/parser';
import { BufferToStringAdapter } from '@quenk/jhr/lib/agent/transport/node/parser';
import { CSRFProtectionPlugin } from '@quenk/jhr/lib/agent/plugin/csrf';

export const HOST = 'localhost';
export const ADMIN_EMAIL = 'admin@example.com';
export const ADMIN_PASSWORD = 'password';

export const paths = {

    admin: {

        posts: '/admin/r/posts',

        post: '/admin/r/posts/{id}'

    }

}

const opts = () =>
    merge(defaultOptions, { port: Number(process.env.PORT) });

export const createHTMLAgent = (host: string = HOST) =>
    new Agent(host, {}, new MemoryContainer(), opts(),
        new NodeHTTPTransport(new FormTransform(),
            new NoParser(), http.globalAgent), [new CSRFProtectionPlugin()]);

export const createJSONAgent = (host: string = HOST) =>
    new Agent(host, {}, new MemoryContainer(), opts(),
        new NodeHTTPTransport(new JSONTransform(),
            new BufferToStringAdapter(new JSONParser({ lenient: true })),
            http.globalAgent), [new CSRFProtectionPlugin()]);

export const loginAdmin = <R>(agent: Agent<object, R>) => doFuture(function*() {

    let password = 'password';
    let email = 'admin@example.com';

    yield agent.get('/admin/login'); // collect the CSRF token.

    let r = yield agent.post('/admin/login', { email, password });

    yield attempt(() => assert(r.code).equal(302));
    yield agent.get('/admin');

    return pure(undefined);

});
