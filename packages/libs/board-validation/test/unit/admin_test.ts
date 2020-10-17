
import * as provider from '../fixtures/data/admin';

import { assert } from '@quenk/test/lib/assert';
import { Explanations } from '@quenk/preconditions/lib/result/failure';

import { validate, validatePartial } from '../../lib/admin';

const { expected } = provider;

/*
 * Validation tests for Admin.
 */
describe('Admin', () => {

    describe('validate', () => {

        it('should pass valid data', () => {

            let data = provider.valid();
            let result = validate(data);

            assert(result.isRight()).true();
            assert(result.takeRight()).equate(expected.valid);

        })

        it('should fail invalid data', () => {

            let data = provider.invalid();
            let result = validate(data);

            assert(result.isLeft()).true();

            assert(<Explanations>result.takeLeft().explain({}))
                .equate(expected.invalid);

        })

        it('should fail data lower than the lower bounds', () => {

            let data = provider.lower();
            let result = validate(data);

            assert(result.isLeft()).true();

            assert(<Explanations>result.takeLeft().explain({}))
                .equate(expected.lower);

        })

        it('should fail data higher than the upper bounds', () => {

            let data = provider.upper();
            let result = validate(data);

            assert(result.isLeft()).true();

            assert(<Explanations>result.takeLeft().explain({})).equate(expected.upper);

        })

        it('should fail non-objects', () => {

            let result = validate('');

            assert(result.isLeft()).true();

        })

    })

    describe('validatePartial', () => {

        it('should pass valid data', () => {

            let data = provider.valid();

            for (let key in data)
                if (data.hasOwnProperty(key)) {

                    let result = validatePartial({ [key]: data[key] });

                    assert(result.isRight()).true();
                    assert(result.takeRight()[key]).equate(expected.valid[key]);

                }

        })

        it('should fail invalid data', () => {

            let data = provider.invalid();

            for (let key in data)
                if (data.hasOwnProperty(key)) {

                    let result = validatePartial({ [key]: data[key] });

                    assert(result.isLeft()).true();
                    assert((<Explanations>result.takeLeft().explain({}))[key])
                        .equate(expected.invalid[key]);

                }

        })

        it('should fail data lower than the lower bounds', () => {

            let data = provider.lower();

            for (let key in data)
                if (data.hasOwnProperty(key)) {

                    let result = validatePartial({ [key]: data[key] });

                    assert(result.isLeft()).true();
                    assert((<Explanations>result.takeLeft().explain({}))[key])
                        .equate(expected.lower[key]);

                }

        })

        it('should fail data higher than the upper bounds', () => {

            let data = provider.upper();

            for (let key in data)
                if (data.hasOwnProperty(key)) {

                    let result = validatePartial({ [key]: data[key] });

                    assert(result.isLeft()).true();
                    assert((<Explanations>result.takeLeft().explain({}))[key])
                        .equate(expected.upper[key]);

                }

        })

    })

    it('should fail non-objects', () => {

        let result = validatePartial('');
        assert(result.isLeft()).true();

    })

    it('should not fail empty objects', () => {

        let result = validatePartial({});
        assert(result.isRight()).true();

    })

})


