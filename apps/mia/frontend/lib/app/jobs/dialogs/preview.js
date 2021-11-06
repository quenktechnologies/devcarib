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
exports.JobPreviewDialog = void 0;
var api = require("../../api");
var httpStatus = require("@quenk/jhr/lib/status");
var confirm_1 = require("@quenk/jouvert/lib/app/service/dialog/confirm");
var handlers_1 = require("@quenk/dfront/lib/app/scene/remote/handlers");
var preview_1 = require("./views/preview");
var JobPreviewDialog = /** @class */ (function (_super) {
    __extends(JobPreviewDialog, _super);
    function JobPreviewDialog(app, job, target) {
        if (target === void 0) { target = '?'; }
        var _this = _super.call(this, app, app.services.dialogs, target) || this;
        _this.app = app;
        _this.job = job;
        _this.target = target;
        _this.name = 'Job Preview Dialog';
        _this.view = new preview_1.JobPreviewDialogView(_this);
        _this.jobModel = _this.app.getModel(api.JOB, new handlers_1.ExecOnComplete(httpStatus.OK, function () {
            _this.close();
        }));
        _this.values = {
            job: _this.job,
            changes: {},
            onChange: function (e) {
                _this.values.changes[e.name] = e.value;
            },
            save: function () {
                _this
                    .jobModel
                    .update(_this.job.id, _this.values.changes)
                    .map(function () { _this.confirm(); })
                    .fork();
            },
            close: function () { return _this.close(); }
        };
        return _this;
    }
    return JobPreviewDialog;
}(confirm_1.ConfirmDialog));
exports.JobPreviewDialog = JobPreviewDialog;
//# sourceMappingURL=preview.js.map