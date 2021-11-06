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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobsManager = exports.AlertOnSearchNoData = exports.TIME_SEARCH_DEBOUNCE = exports.ACTION_SHOW = exports.ACTION_REMOVE = exports.ACTION_APPROVE = void 0;
var jobStatus = require("@board/common/lib/data/job");
var httpStatus = require("@quenk/jhr/lib/status");
var api = require("../../api");
var future_1 = require("@quenk/noni/lib/control/monad/future");
var string_1 = require("@quenk/noni/lib/data/string");
var function_1 = require("@quenk/noni/lib/data/function");
var timer_1 = require("@quenk/noni/lib/control/timer");
var browser_1 = require("@quenk/jhr/lib/browser");
var handlers_1 = require("@quenk/dfront/lib/app/scene/remote/handlers");
var columns_1 = require("../columns");
var preview_1 = require("../dialogs/preview");
var manager_1 = require("../../common/scene/manager");
var jobs_1 = require("./views/jobs");
exports.ACTION_APPROVE = 'approve';
exports.ACTION_REMOVE = 'remove';
exports.ACTION_SHOW = 'show';
exports.TIME_SEARCH_DEBOUNCE = 500;
var agent = (0, browser_1.createAgent)();
/**
 * AlertOnSearchNoData tells the user their search yielded no results.
 */
var AlertOnSearchNoData = /** @class */ (function (_super) {
    __extends(AlertOnSearchNoData, _super);
    function AlertOnSearchNoData() {
        return _super.call(this, httpStatus.NO_CONTENT, function () {
            alert('Your search returned no results');
        }) || this;
    }
    return AlertOnSearchNoData;
}(handlers_1.ExecOnComplete));
exports.AlertOnSearchNoData = AlertOnSearchNoData;
/**
 * JobsManager provides the screen for managing job posts created within
 * the system.
 */
var JobsManager = /** @class */ (function (_super) {
    __extends(JobsManager, _super);
    function JobsManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * view is the WML content to display on the screen.
         */
        _this.view = new jobs_1.JobsManagerView(_this);
        _this.jobsModel = _this.app.getModel(api.JOBS);
        _this.values = {
            search: {
                onChange: (0, timer_1.debounce)(function (e) {
                    var qry = e.value === '' ? {} : { q: e.value };
                    _this.search(qry);
                }, exports.TIME_SEARCH_DEBOUNCE)
            },
            table: {
                id: 'table',
                data: [],
                pagination: {
                    current: {
                        count: 0,
                        page: 1,
                        limit: 50
                    },
                    total: {
                        count: 0,
                        pages: 0
                    }
                },
                columns: [
                    new columns_1.TitleColumn(function (job) { return _this.showJob(job); }),
                    new columns_1.CompanyColumn(),
                    new columns_1.StatusColumn(),
                    new columns_1.ActionColumn([
                        {
                            text: "View",
                            divider: false,
                            onClick: function (data) { return _this.showJob(data); }
                        },
                        {
                            text: "Approve",
                            divider: false,
                            onClick: function (data) {
                                return _this.runFuture(_this.approveJob(data.id));
                            }
                        },
                        {
                            text: "Edit",
                            divider: false,
                            onClick: function (data) { return _this.editJob(data); }
                        },
                        {
                            text: "Remove",
                            divider: true,
                            onClick: function (data) {
                                return _this.runFuture(_this.removeJob(data.id));
                            }
                        }
                    ])
                ]
            }
        };
        _this.onError = function (e) {
            console.error(e);
            alert('An error has occurred! Details have been logged to the console.');
        };
        return _this;
    }
    /**
     * search for job postings that match the specified query criteria.
     *
     * The first time this method is called, results will populate and display
     * the view. Subsequent calls will only update the already displated table.
     */
    JobsManager.prototype.search = function (qry) {
        var that = this;
        return (0, future_1.doFuture)(function () {
            var jobs, mtable;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, that.jobsModel.search(qry)];
                    case 1:
                        jobs = _a.sent();
                        that.values.table.data = jobs;
                        mtable = that.view.findById(that.values.table.id);
                        if (mtable.isJust())
                            mtable.get().update(jobs);
                        return [2 /*return*/, future_1.voidPure];
                }
            });
        });
    };
    /**
     * showJob displays a single Job in a dialog.
     */
    JobsManager.prototype.showJob = function (data) {
        var _this = this;
        this.spawn(function () { return new preview_1.JobPreviewDialog(_this.app, data); });
    };
    /**
     * approveJob sets the approved flag on a job to true.
     *
     * Once this is done the job will show on the site.
     */
    JobsManager.prototype.approveJob = function (id) {
        var that = this;
        return (0, future_1.doFuture)(function () {
            var path, change, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        path = (0, string_1.interpolate)(api.JOB, { id: id });
                        change = { status: jobStatus.JOB_STATUS_ACTIVE };
                        return [4 /*yield*/, agent.patch(path, change)];
                    case 1:
                        r = _a.sent();
                        if (r.code == 200) {
                            alert('Job approved!');
                            that.reload();
                        }
                        else {
                            alert('Could not complete request!');
                        }
                        return [2 /*return*/, (0, future_1.pure)(undefined)];
                }
            });
        });
    };
    /**
     * editJob brings up the dialog editor to quickly edit the title and body
     * of a job.
     */
    JobsManager.prototype.editJob = function (data) {
        var _this = this;
        this.spawn(function () { return new preview_1.JobPreviewDialog(_this.app, data, _this.self()); });
    };
    /**
     * removeJob permenantly removes a job from the site.
     */
    JobsManager.prototype.removeJob = function (id) {
        var that = this;
        return (0, future_1.doFuture)(function () {
            var path, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        path = (0, string_1.interpolate)(api.JOB, { id: id });
                        return [4 /*yield*/, agent.delete(path)];
                    case 1:
                        r = _a.sent();
                        if (r.code == 200) {
                            alert('Job removed!');
                            that.reload();
                        }
                        else {
                            alert('Could not complete request!');
                        }
                        return [2 /*return*/, (0, future_1.pure)(undefined)];
                }
            });
        });
    };
    /**
     * runFuture is used to execute async work wrapped in the Future type.
     */
    JobsManager.prototype.runFuture = function (ft) {
        ft.fork(this.onError, function_1.noop);
    };
    JobsManager.prototype.run = function () {
        var that = this;
        return (0, future_1.doFuture)(function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, that.search({})];
                    case 1:
                        _a.sent();
                        that.show();
                        return [2 /*return*/, future_1.voidPure];
                }
            });
        });
    };
    return JobsManager;
}(manager_1.MiaManager));
exports.JobsManager = JobsManager;
//# sourceMappingURL=index.js.map