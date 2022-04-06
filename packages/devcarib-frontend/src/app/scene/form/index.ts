import { Object } from '@quenk/noni/lib/data/jsonx';

import { Address } from '@quenk/potoo/lib/actor/address';

import {
    BaseValidatorFormScene
} from '@quenk/jouvert/lib/app/scene/form/validator';

import { DevCarib } from '../../';

/**
 * DevCaribForm is the base class for form controller actors in DevCarib
 * apps.
 */
export abstract class DevCaribForm<T extends Object, M>
    extends
    BaseValidatorFormScene<T, M> {

    constructor(
        public app: DevCarib,
        public target: Address,
        public value: Partial<T> = {}) { super(app, target, value); }

}
