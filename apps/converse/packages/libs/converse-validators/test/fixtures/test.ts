import { Object } from '@quenk/noni/lib/data/jsonx';
import { empty, map } from '@quenk/noni/lib/data/record';
import { assert } from '@quenk/test/lib/assert';
import { Explanations } from '@quenk/preconditions/lib/result/failure';

/**
 * TestSuite is a set of of tests that will be automatically generated at
 * runtime by the `test.validation` template.
 *
 * TestSuites should be specified for complete validation and partial validation.
 */
export interface TestSuite { [key: string]: Test }

/**
 * Test is a configuration used to execute a test at runtime in a script
 * generated from `test.validation`.
 */
export interface Test {

    /**
     * shouldFail if true, indicates we expect the provided input to cause
     * a Failure (precondtion).
     */
    shouldFail?: boolean,

    /**
     * input data for the test, typically an object representing data for
     * the type being tested.
     */
    input: () => Object,

    /**
     * expectedFailure provides an object that we expect the Explanations
     * passed to match.
     *
     * The test fails if they don't.
     */
    expectedFailure?: (info: Explanations) => object,

    /**
     * expectedValue provides an object that we expect the value passed to
     * match.
     *
     * The test fails if they don't.
     */
    expectedValue?: (value: Object) => object

}

/**
 * swap is useful for producing a partial object from a test result.
 */
export const swap = (target: Object, src: Object): Object => {

    assert(empty(target)).false();
    return map(target, (_, key) => src[key]);

}
