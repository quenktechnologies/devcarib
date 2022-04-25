
import * as provider from '../fixtures/data/comment';

import { assert } from '@quenk/test/lib/assert';
import { Explanations } from '@quenk/preconditions/lib/result/failure';

import { validate, validatePartial } from '../../lib/comment';

/*
 * Validation tests for Comment.
 */
describe('Comment', () => {

    describe('validate', () => {

        for (let [name, spec] of Object.entries(provider.complete)) {

            it(name, () => {

                let eresult = validate(spec.input());

                if (spec.shouldFail) {

                    assert(eresult.isLeft()).true();

                    if (spec.expectedFailure) {

                        let result = <Explanations>eresult.takeLeft().explain({});
                        assert(result).equate(spec.expectedFailure(result));

                    }

                } else {

                    assert(eresult.isRight()).true();

                    if (spec.expectedValue) {

                        let result = eresult.takeRight();
                        assert(result).equate(spec.expectedValue(result));

                    }

                }

            })

        }

    })

    describe('validatePartial', () => {

        for (let [name, spec] of Object.entries(provider.partial)) {

            it(name, () => {

                for (let [key, value] of Object.entries(spec.input())) {

                    let eresult = validatePartial({ [key]: value });

                    if (spec.shouldFail) {

                        assert(eresult.isLeft()).true();

                        if (spec.expectedFailure) {

                            let result = <Explanations>eresult.takeLeft().explain({});
                            assert(result).equate(spec.expectedFailure(result));

                        } else {

                            assert(eresult.isRight()).true();

                            if (spec.expectedValue) {

                                let result = eresult.takeRight();
                                assert(result).equate(spec.expectedValue(result));

                            }

                        }

                    }

                }

            })

        }

    })

})


