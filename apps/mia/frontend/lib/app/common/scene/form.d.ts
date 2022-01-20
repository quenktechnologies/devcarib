import { Object } from '@quenk/noni/lib/data/jsonx';
import { Address } from '@quenk/potoo/lib/actor/address';
import { BaseValidatorFormScene } from '@quenk/jouvert/lib/app/scene/form/validator';
import { Mia } from '../../';
/**
 * MiaFormScene is the base class for form controller actors in mia.
 *
 * This actor exists mostly for providing the app property.
 */
export declare abstract class MiaFormScene<T extends Object, M> extends BaseValidatorFormScene<T, M> {
    app: Mia;
    target: Address;
    value: Partial<T>;
    constructor(app: Mia, target: Address, value?: Partial<T>);
}
