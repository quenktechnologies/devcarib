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
exports.JobPanel = void 0;
var wml_1 = require("@quenk/wml");
var panel_1 = require("./panel");
/**
 * JobPanel displays detailed information about a job on the job's profile
 * page or preview.
 */
var JobPanel = /** @class */ (function (_super) {
    __extends(JobPanel, _super);
    function JobPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new panel_1.JobPanelView(_this);
        _this.values = {
            data: _this.attrs.job,
            raw: _this.attrs.raw
        };
        return _this;
    }
    /**
     * setContent allows the content displayed in the JobPanel to be displayed.
     */
    JobPanel.prototype.setContent = function (html) {
        var mcontent = this.view.findById('content');
        if (mcontent.isJust())
            mcontent.get().innerHTML = html;
    };
    return JobPanel;
}(wml_1.Component));
exports.JobPanel = JobPanel;
//# sourceMappingURL=index.js.map