import { Value } from '@quenk/noni/lib/data/json';

import { Component } from '@quenk/wml';

import { Event } from '@quenk/wml-widgets/lib/control';
import { HTMLElementAttrs } from '@quenk/wml-widgets';

import { supportedCurrencies } from '@devcarib/common/lib/data/currency';

import { CurrencyMoneyTextFieldView } from './money';

/**
 * CurrencyFieldName refers to the name used for the currency field.
 */
export type CurrencyFieldName = string;

/**
 * ValueFieldName refers to the name used for the value field.
 */
export type ValueFieldName = string;

/**
 * MoneyTextFieldAttrs
 */
export interface CurrencyMoneyTextFieldAttrs extends HTMLElementAttrs {

    /**
     * names of the controls this widget generates.
     *
     * These are used for the respective event.
     */
    names?: [CurrencyFieldName, ValueFieldName],

    /**
     * currency to set the control to.
     */
    currency?: string,

    /**
     * value is the dollar amount value.
     */
    value?: number,

    /**
     * onChange handler.
     *
     * This receives events for both the currency and value field changes
     * separately.
     */
    onChange?: (e: Event<Value>) => void

}

/**
 * CurrencyMoneyTextField provides an input wrapped in an InputGroup for entering
 * dollar amounts along with the currency via a drop down menu.
 */
export class CurrencyMoneyTextField
    extends
    Component<CurrencyMoneyTextFieldAttrs> {

    view = new CurrencyMoneyTextFieldView(this);

    values = {

        dropList: {

            name: this.attrs.names?.[0],

            value: this.attrs.currency || supportedCurrencies[0],

            options: supportedCurrencies.map(sym =>
                ({ label: sym, value: sym })),

            onSelect: this.attrs.onChange

        },

        input: {

            name: this.attrs.names?.[1],

            value: this.attrs.value ? String(this.attrs.value) : '0',

            onChange: this.attrs.onChange

        }

    }

}
