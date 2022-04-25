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
exports.RankPanel = void 0;
var wml_1 = require("@quenk/wml");
var util_1 = require("@quenk/wml-widgets/lib/util");
var views_1 = require("./views");
/**
 * RankPanel is used to display a listing of recent activity in a sidebar.
 *
 * This is used for posts,jobs,events etc.
 */
var RankPanel = /** @class */ (function (_super) {
    __extends(RankPanel, _super);
    function RankPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views_1.RankPanelView(_this);
        _this.values = {
            title: _this.attrs.title,
            className: (0, util_1.concat)('devcarib-rank-panel', _this.attrs.className)
        };
        return _this;
    }
    return RankPanel;
}(wml_1.Component));
exports.RankPanel = RankPanel;
//# sourceMappingURL=index.js.map