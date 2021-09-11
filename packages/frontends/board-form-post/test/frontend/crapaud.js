const cp = require('child_process');
const path = require('path');

const future = require('@quenk/noni/lib/control/monad/future');

const exec = (cmd) => future.fromCallback(cb => cp.exec(cmd, cb));

const randomDirName = () => `/tmp/crapaudtest${Math.random() * 1000}`;

const PATH_SRC = `${__dirname}/src`;
const PATH_DEST = `${__dirname}/build`;
const PATH_TSC = `${process.cwd()}/node_modules/.bin/tsc`;
const PATH_BROWSERIFY = `${process.cwd()}/node_modules/.bin/browserify`;

module.exports = {

    url: 'http://localhost:1956/post',

    browser: 'firefox',

    mochaOptions: {

        timeout: '200000'

    },

    before: [

        { path: `${__dirname}/start_server.sh`, background: true },

        () => future.doFuture(function*() {
            yield exec(`rm -R ${PATH_DEST} || true`);

            yield exec(`cp -R ${PATH_SRC} ${PATH_DEST}`);

            yield exec(`${PATH_TSC} --project ${PATH_DEST}`);

            return future.pure();

        })
    ],

    after: [

        `${__dirname}/stop_server.sh`

    ],

    transform: (_, path) => future.doFuture(function*() {

        path = path.split('/').map(dir =>
            (dir === 'src') ? 'build' : dir).join('/');

        let bundle = yield exec(`${PATH_BROWSERIFY} ${path}`);

        return future.pure(bundle);

    }),

    tests: [

        { path: 'build/post-form_test.js', injectMocha: true }

    ]

}
