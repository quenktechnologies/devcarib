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
exports.MiaForm = void 0;
var strategy_1 = require("@quenk/jouvert/lib/app/form/active/validate/strategy");
var active_1 = require("@quenk/jouvert/lib/app/form/active");
var view_1 = require("@quenk/jouvert/lib/app/service/view");
/**
 * MiaForm
 */
var MiaForm = /** @class */ (function (_super) {
    __extends(MiaForm, _super);
    function MiaForm(system, owner, display, value) {
        if (value === void 0) { value = {}; }
        var _this = _super.call(this, owner, system, value) || this;
        _this.system = system;
        _this.owner = owner;
        _this.display = display;
        _this.value = value;
        _this.name = _this.self();
        _this.validateStrategy = new strategy_1.NoStrategy(_this);
        return _this;
    }
    MiaForm.prototype.run = function () {
        this.tell(this.display, new view_1.Show(this.name, this.view, this.self()));
    };
    return MiaForm;
}(active_1.AbstractActiveForm));
exports.MiaForm = MiaForm;
//# sourceMappingURL=form.js.map