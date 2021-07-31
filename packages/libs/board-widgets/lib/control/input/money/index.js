"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyMoneyTextField = void 0;
var wml_1 = require("@quenk/wml");
var currency_1 = require("@board/common/lib/data/currency");
var money_1 = require("./money");
/**
 * CurrencyMoneyTextField provides an input wrapped in an InputGroup for entering
 * dollar amounts along with the currency via a drop down menu.
 */
var CurrencyMoneyTextField = /** @class */ (function (_super) {
    __extends(CurrencyMoneyTextField, _super);
    function CurrencyMoneyTextField() {
        var _a, _b;
        var _this = _super.apply(this, arguments) || this;
        _this.view = new money_1.CurrencyMoneyTextFieldView(_this);
        _this.values = {
            dropList: {
                name: (_a = _this.attrs.names) === null || _a === void 0 ? void 0 : _a[0],
                value: _this.attrs.currency || currency_1.supportedCurrencies[0],
                options: currency_1.supportedCurrencies.map(function (sym) {
                    return ({ label: sym, value: sym });
                }),
                onSelect: _this.attrs.onChange
            },
            input: {
                name: (_b = _this.attrs.names) === null || _b === void 0 ? void 0 : _b[1],
                value: _this.attrs.value ? String(_this.attrs.value) : '0',
                onChange: _this.attrs.onChange
            }
        };
        return _this;
    }
    return CurrencyMoneyTextField;
}(wml_1.Component));
exports.CurrencyMoneyTextField = CurrencyMoneyTextField;
//# sourceMappingURL=index.js.map