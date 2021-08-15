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
exports.ClearExpiredJobsTask = void 0;
var moment = require("moment");
var future_1 = require("@quenk/noni/lib/control/monad/future");
var resident_1 = require("@quenk/potoo/lib/actor/resident");
var case_1 = require("@quenk/potoo/lib/actor/resident/case");
var connection_1 = require("@quenk/tendril/lib/app/connection");
var clock_1 = require("../task/clock");
var POST_EXPIRE_MONTHS = 3;
/**
 * ClearExpiredJobsTask removes jobs that have been posted POST_EXPIRE_MONTHS
 * ago from the database.
 */
var ClearExpiredJobsTask = /** @class */ (function (_super) {
    __extends(ClearExpiredJobsTask, _super);
    function ClearExpiredJobsTask() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.receive = [
            new case_1.Case(clock_1.Tick, function (t) { return _this.clear(t.src); })
        ];
        return _this;
    }
    /**
     * clear the expired job postings.
     */
    ClearExpiredJobsTask.prototype.clear = function (clock) {
        var self = this;
        return future_1.doFuture(function () {
            var threshold, db, posts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        threshold = moment
                            .utc()
                            .subtract(POST_EXPIRE_MONTHS, 'months')
                            .toDate();
                        return [4 /*yield*/, connection_1.unsafeGetUserConnection('main')];
                    case 1:
                        db = _a.sent();
                        posts = db.collection('posts');
                        return [4 /*yield*/, future_1.liftP(function () {
                                return posts.deleteMany({ created_on: { $lt: threshold } });
                            })];
                    case 2:
                        _a.sent();
                        self.tell(clock, new clock_1.Finished(self.self()));
                        return [2 /*return*/, future_1.pure(undefined)];
                }
            });
        });
    };
    ClearExpiredJobsTask.prototype.run = function () {
        this.tell('/clock', new clock_1.Subscribe('freq.low', this.self()));
    };
    return ClearExpiredJobsTask;
}(resident_1.Immutable));
exports.ClearExpiredJobsTask = ClearExpiredJobsTask;
//# sourceMappingURL=clear-expired-jobs.js.map