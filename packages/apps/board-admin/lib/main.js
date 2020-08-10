"use strict";
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
exports.BoardAdmin = exports.ActionColumn = exports.ApprovedColumn = exports.CompanyColumn = exports.TitleColumn = exports.TIME_SEARCH_DEBOUNCE = exports.RESOURCE_POST = exports.RESOURCE_POSTS = exports.ACTION_SHOW = exports.ACTION_REMOVE = exports.ACTION_APPROVE = void 0;
var future_1 = require("@quenk/noni/lib/control/monad/future");
var string_1 = require("@quenk/noni/lib/data/string");
var function_1 = require("@quenk/noni/lib/data/function");
var browser_1 = require("@quenk/jhr/lib/browser");
var app_1 = require("./views/app");
var columns_1 = require("./views/columns");
var preview_1 = require("./views/dialog/preview");
var timer_1 = require("@quenk/noni/lib/control/timer");
var util_1 = require("@quenk/wml-widgets/lib/util");
exports.ACTION_APPROVE = 'approve';
exports.ACTION_REMOVE = 'remove';
exports.ACTION_SHOW = 'show';
exports.RESOURCE_POSTS = '/admin/r/posts';
exports.RESOURCE_POST = '/admin/r/posts/{id}';
exports.TIME_SEARCH_DEBOUNCE = 500;
var agent = browser_1.createAgent();
var TitleColumn = /** @class */ (function () {
    function TitleColumn(listener) {
        var _this = this;
        this.listener = listener;
        this.name = 'title';
        this.heading = 'Title';
        this.cellFragment = function (c) { return new columns_1.TitleColumnView({
            post: c.datum,
            show: function () { return _this.listener.onAction(exports.ACTION_SHOW, c.datum); }
        }); };
    }
    return TitleColumn;
}());
exports.TitleColumn = TitleColumn;
var CompanyColumn = /** @class */ (function () {
    function CompanyColumn() {
        this.name = 'company';
        this.heading = 'Company';
    }
    return CompanyColumn;
}());
exports.CompanyColumn = CompanyColumn;
var ApprovedColumn = /** @class */ (function () {
    function ApprovedColumn() {
        this.name = 'approved';
        this.heading = 'Approved?';
    }
    return ApprovedColumn;
}());
exports.ApprovedColumn = ApprovedColumn;
var ActionColumn = /** @class */ (function () {
    function ActionColumn(listener) {
        var _this = this;
        this.listener = listener;
        this.name = '';
        this.heading = 'Actions';
        this.cellFragment = function (c) { return new columns_1.ActionColumnView({
            approve: function () { return _this.listener.onAction(exports.ACTION_APPROVE, c.datum); },
            remove: function () { return _this.listener.onAction(exports.ACTION_REMOVE, c.datum); }
        }); };
    }
    return ActionColumn;
}());
exports.ActionColumn = ActionColumn;
/**
 * BoardAdmin is the main class for the admin application.
 *
 * @param main    - The DOM node that the main application content will reside.
 * @param dialogs - The DOM node that will be used for dialogs.
 */
var BoardAdmin = /** @class */ (function () {
    function BoardAdmin(main, dialogs) {
        var _this = this;
        this.main = main;
        this.dialogs = dialogs;
        /**
         * view is the WML content to display on the screen.
         */
        this.view = new app_1.BoardAdminView(this);
        /**
         * values contains various bits of information used to generate
         * the view.
         */
        this.values = {
            search: {
                onChange: timer_1.debounce(function (e) {
                    var qry = e.value === '' ? {} : { q: e.value };
                    _this.runFuture(_this.searchPosts(qry));
                }, exports.TIME_SEARCH_DEBOUNCE)
            },
            table: {
                id: 'table',
                data: [],
                columns: [
                    new TitleColumn(this),
                    new CompanyColumn(),
                    new ApprovedColumn(),
                    new ActionColumn(this)
                ]
            }
        };
        this.onError = function (e) {
            console.error(e);
            alert('An error has occurred! Details have been logged to the console.');
        };
    }
    BoardAdmin.create = function (main, dialogs) {
        return new BoardAdmin(main, dialogs);
    };
    BoardAdmin.prototype.onAction = function (name, data) {
        switch (name) {
            case exports.ACTION_APPROVE:
                this.runFuture(this.approvePost(data.id));
                break;
            case exports.ACTION_REMOVE:
                this.runFuture(this.removePost(data.id));
                break;
            case exports.ACTION_SHOW:
                this.showPost(data);
                break;
            default:
                break;
        }
    };
    /**
     * searchPosts in the database.
     *
     * Differs from loadPosts() by updating only the table, not the whole
     * view on success.
     *
     * @param qry - The query object to include in the GET request.
     */
    BoardAdmin.prototype.searchPosts = function (qry) {
        if (qry === void 0) { qry = {}; }
        var that = this;
        return future_1.doFuture(function () {
            var r, mtable;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, agent.get(exports.RESOURCE_POSTS, qry)];
                    case 1:
                        r = _a.sent();
                        mtable = util_1.getById(that.view, that.values.table.id);
                        if (mtable.isJust())
                            mtable.get().update((r.code === 200) ? r.body.data : []);
                        return [2 /*return*/, future_1.pure(undefined)];
                }
            });
        });
    };
    /**
     * loadInitialPosts from the database into the table.
     */
    BoardAdmin.prototype.loadInitialPosts = function () {
        var that = this;
        return future_1.doFuture(function () {
            var r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, agent.get(exports.RESOURCE_POSTS)];
                    case 1:
                        r = _a.sent();
                        if (r.code !== 200) {
                            alert('Could not load posts!');
                        }
                        else {
                            that.values.table.data = r.body.data;
                            that.view.invalidate();
                        }
                        return [2 /*return*/, future_1.pure(undefined)];
                }
            });
        });
    };
    /**
     * approvePost sets the approved flag on a post to true.
     *
     * Once this is done the post will show on the site.
     */
    BoardAdmin.prototype.approvePost = function (id) {
        var that = this;
        return future_1.doFuture(function () {
            var path, change, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        path = string_1.interpolate(exports.RESOURCE_POST, { id: id });
                        change = { approved: true };
                        return [4 /*yield*/, agent.patch(path, change)];
                    case 1:
                        r = _a.sent();
                        if (r.code == 200) {
                            alert('Post approved!');
                            that.refresh();
                        }
                        else {
                            alert('Could not complete request!');
                        }
                        return [2 /*return*/, future_1.pure(undefined)];
                }
            });
        });
    };
    /**
     * removePost permenantly removes a post from the site.
     */
    BoardAdmin.prototype.removePost = function (id) {
        var that = this;
        return future_1.doFuture(function () {
            var path, r;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        path = string_1.interpolate(exports.RESOURCE_POST, { id: id });
                        return [4 /*yield*/, agent.delete(path)];
                    case 1:
                        r = _a.sent();
                        if (r.code == 200) {
                            alert('Post removed!');
                            that.refresh();
                        }
                        else {
                            alert('Could not complete request!');
                        }
                        return [2 /*return*/, future_1.pure(undefined)];
                }
            });
        });
    };
    /**
     * showPost displays a single Post in a dialog.
     */
    BoardAdmin.prototype.showPost = function (data) {
        var _this = this;
        this.showDialog(new preview_1.PostPreviewView({
            post: data,
            close: function () { return _this.closeDialog(); }
        }));
    };
    /**
     * showDialog displays a View in the dialog area of the app's screen.
     */
    BoardAdmin.prototype.showDialog = function (view) {
        setView(this.dialogs, view);
    };
    /**
     * show a View on the application's screen.
     */
    BoardAdmin.prototype.show = function (view) {
        setView(this.main, view);
    };
    /**
     * closeDialog removes a dialog from the app's screen.
     */
    BoardAdmin.prototype.closeDialog = function () {
        unsetView(this.dialogs);
    };
    /**
     * refresh reloads and displays the application.
     */
    BoardAdmin.prototype.refresh = function () {
        this.runFuture(this.loadInitialPosts());
    };
    /**
     * runFuture is used to execute async work wrapped in the Future type.
     */
    BoardAdmin.prototype.runFuture = function (ft) {
        ft.fork(this.onError, function_1.noop);
    };
    /**
     * run the application.
     */
    BoardAdmin.prototype.run = function () {
        this.show(this.view);
        this.refresh();
    };
    return BoardAdmin;
}());
exports.BoardAdmin = BoardAdmin;
var setView = function (node, view) {
    unsetView(node);
    node.appendChild(view.render());
};
var unsetView = function (node) {
    while (node.firstChild != null)
        node.removeChild(node.firstChild);
};
//Create and run the app. Note that it will crash if the DOM nodes below are
//missing.
BoardAdmin.create(document.getElementById('main'), document.getElementById('dialogs')).run();
//# sourceMappingURL=main.js.map