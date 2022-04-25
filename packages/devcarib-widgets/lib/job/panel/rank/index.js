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
exports.JobRankPanel = void 0;
var wml_1 = require("@quenk/wml");
var views_1 = require("./views");
/**
 * JobRankPanel displays a listing of recent jobs.
 */
var JobRankPanel = /** @class */ (function (_super) {
    __extends(JobRankPanel, _super);
    function JobRankPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views_1.JobRankPanelView(_this);
        _this.values = {
            jobs: _this.attrs.data || []
        };
        return _this;
    }
    JobRankPanel.prototype.update = function (data) {
        this.values.jobs = data;
        this.view.invalidate();
    };
    return JobRankPanel;
}(wml_1.Component));
exports.JobRankPanel = JobRankPanel;
//# sourceMappingURL=index.js.map