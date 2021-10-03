import { Value } from '@quenk/noni/lib/data/json';
import { Component } from '@quenk/wml';
import { Event } from '@quenk/wml-widgets/lib/control';
import { HTMLElementAttrs } from '@quenk/wml-widgets';
import { CurrencyMoneyTextFieldView } from './money';
/**
 * CurrencyFieldName refers to the name used for the currency field.
 */
export declare type CurrencyFieldName = string;
/**
 * ValueFieldName refers to the name used for the value field.
 */
export declare type ValueFieldName = string;
/**
 * MoneyTextFieldAttrs
 */
export interface CurrencyMoneyTextFieldAttrs extends HTMLElementAttrs {
    /**
     * names of the controls this widget generates.
     *
     * These are used for the respective event.
     */
    names?: [CurrencyFieldName, ValueFieldName];
    /**
     * currency to set the control to.
     */
    currency?: string;
    /**
     * value is the dollar amount value.
     */
    value?: number;
    /**
     * onChange handler.
     *
     * This receives events for both the currency and value field changes
     * separately.
     */
    onChange?: (e: Event<Value>) => void;
}
/**
 * CurrencyMoneyTextField provides an input wrapped in an InputGroup for entering
 * dollar amounts along with the currency via a drop down menu.
 */
export declare class CurrencyMoneyTextField extends Component<CurrencyMoneyTextFieldAttrs> {
    view: CurrencyMoneyTextFieldView;
    values: {
        dropList: {
            name: string | undefined;
            value: string;
            options: {
                label: string;
                value: string;
            }[];
            onSelect: ((e: Event<Value>) => void) | undefined;
        };
        input: {
            name: string | undefined;
            value: string;
            onChange: ((e: Event<Value>) => void) | undefined;
        };
    };
}
