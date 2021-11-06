import { Object } from '@quenk/noni/lib/data/jsonx';

import { View } from '@quenk/wml';

import { Address } from '@quenk/potoo/lib/actor/address';

import {
    NoStrategy
} from '@quenk/jouvert/lib/app/form/active/validate/strategy';
import {
    AbstractActiveForm
} from '@quenk/jouvert/lib/app/form/active';
import { Show } from '@quenk/jouvert/lib/app/service/view';


import { Mia } from '../';

/**
 * MiaForm
 */
export abstract class MiaForm<T extends Object, M>
    extends
    AbstractActiveForm<T, M> {

    constructor(
        public system: Mia,
        public owner: Address,
        public display: Address,
        public value: Partial<T> = {}) { super(owner, system, value); }

    abstract view: View;

    name = this.self();

    validateStrategy: NoStrategy<T> = new NoStrategy(this);

    run() {

        this.tell(this.display, new Show(this.name,this.view, this.self()));

    }

}
