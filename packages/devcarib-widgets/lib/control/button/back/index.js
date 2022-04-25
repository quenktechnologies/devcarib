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
exports.BackButton = void 0;
var wml_1 = require("@quenk/wml");
var views_1 = require("./views");
/**
 * BackButton provides a button that can be clicked to go back.
 */
var BackButton = /** @class */ (function (_super) {
    __extends(BackButton, _super);
    function BackButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views_1.BackButtonView(_this);
        _this.values = {
            onClick: function () { return _this.attrs.onClick && _this.attrs.onClick(); }
        };
        return _this;
    }
    return BackButton;
}(wml_1.Component));
exports.BackButton = BackButton;
//# sourceMappingURL=index.js.map