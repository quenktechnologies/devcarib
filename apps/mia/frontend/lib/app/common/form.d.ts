import { Object } from '@quenk/noni/lib/data/jsonx';
import { View } from '@quenk/wml';
import { Address } from '@quenk/potoo/lib/actor/address';
import { NoStrategy } from '@quenk/jouvert/lib/app/form/active/validate/strategy';
import { AbstractActiveForm } from '@quenk/jouvert/lib/app/form/active';
import { Mia } from '../';
/**
 * MiaForm
 */
export declare abstract class MiaForm<T extends Object, M> extends AbstractActiveForm<T, M> {
    system: Mia;
    owner: Address;
    display: Address;
    value: Partial<T>;
    constructor(system: Mia, owner: Address, display: Address, value?: Partial<T>);
    abstract view: View;
    name: string;
    validateStrategy: NoStrategy<T>;
    run(): void;
}
