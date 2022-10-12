"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyMoneyTextField = void 0;
const wml_1 = require("@quenk/wml");
const currency_1 = require("@devcarib/common/lib/data/currency");
const money_1 = require("./money");
/**
 * CurrencyMoneyTextField provides an input wrapped in an InputGroup for entering
 * dollar amounts along with the currency via a drop down menu.
 */
class CurrencyMoneyTextField extends wml_1.Component {
    constructor() {
        var _a, _b;
        super(...arguments);
        this.view = new money_1.CurrencyMoneyTextFieldView(this);
        this.values = {
            dropList: {
                name: (_a = this.attrs.names) === null || _a === void 0 ? void 0 : _a[0],
                value: this.attrs.currency || currency_1.supportedCurrencies[0],
                options: currency_1.supportedCurrencies.map(sym => ({ label: sym, value: sym })),
                onSelect: this.attrs.onChange
            },
            input: {
                name: (_b = this.attrs.names) === null || _b === void 0 ? void 0 : _b[1],
                value: this.attrs.value ? String(this.attrs.value) : '0',
                onChange: this.attrs.onChange
            }
        };
    }
}
exports.CurrencyMoneyTextField = CurrencyMoneyTextField;
//# sourceMappingURL=index.js.map