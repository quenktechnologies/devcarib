import { Object } from '@quenk/noni/lib/data/jsonx';
import { Address } from '@quenk/potoo/lib/actor/address';
import { BaseValidatorFormScene } from '@quenk/jouvert/lib/app/scene/form/validator';
import { DevCarib } from '../../';
/**
 * DevCaribForm is the base class for form controller actors in DevCarib
 * apps.
 */
export declare abstract class DevCaribForm<T extends Object, M> extends BaseValidatorFormScene<T, M> {
    app: DevCarib;
    target: Address;
    value: Partial<T>;
    constructor(app: DevCarib, target: Address, value?: Partial<T>);
}
