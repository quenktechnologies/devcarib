import * as fs from 'fs';
import * as path from 'path';
import * as mkdirp from 'mkdirp';
import { assert } from '@quenk/test/lib/assert';
import { Precondition } from '@quenk/preconditions';
import { validate as full } from '../../lib/admin';
import { validate as partial } from '../../lib/partial/admin';

const writeFile = (p: string, contents: string) => {

    mkdirp.sync(path.dirname(p));
    fs.writeFileSync(p, contents);

}

const makeTest = <A, B>(suite: string, test: any, index: string, fn: Precondition<A, B>) => {

    let file = index.replace(/\s/g, '-');

    if (test.dump)
        return console.error(fn(test.input));

    let data = test.success ?
        fn(test.input).takeRight() :
        fn(test.input).takeLeft().explain({});

    if (process.env.GENERATE) {

        writeFile(`${path.dirname(__filename)}/../fixtures/expectations/${suite + '-' + file}.json`,
            JSON.stringify(data));

    } else {

        assert(data)
            .equate(
                require(`${path.dirname(__filename)}/../fixtures/expectations/${suite + '-' + file}.json`));

    }

}

const fullTests = {

    'should pass valid data': {

        input: require('../fixtures/data/valid/admin'),
        success: true

    },
    'should fail if required fields ommitted': {

        input: {},
        failure: true

    },
    'should fail on invalid input': {

        input: require('../fixtures/data/invalid/admin'),
        failure: true

    },
    'should detect failed lower bounds': {

        input: require('../fixtures/data/lower/admin'),
        failure: true

    },
    'should detect failed upper bounds': {

        input: require('../fixtures/data/upper/admin'),
        failure: true

    }

}

const partialTests = {

    'should pass valid data': {

        input: require('../fixtures/data/valid/admin'),
        success: true

    },
    'should not fail if all fields ommitted': {

        input: {},
        success: true

    },
    'should fail on invalid input': {

        input: require('../fixtures/data/invalid/admin'),
        failure: true

    },
    'should detect failed lower bounds': {

        input: require('../fixtures/data/lower/admin'),
        failure: true

    },
    'should detect failed upper bounds': {

        input: require('../fixtures/data/upper/admin'),
        falure: true

    }

}

describe('Admin', () =>
    describe('full', () =>
        Object
            .keys(fullTests)
            .forEach(k => it(k, () => makeTest('admin-full',
                (<any>fullTests)[k], k, full)))));

describe('Admin', () =>
    describe('partial', () =>
        Object
            .keys(partialTests)
            .forEach(k => it(k, () => makeTest('admin-partial',
                (<any>partialTests)[k], k, partial)))));


