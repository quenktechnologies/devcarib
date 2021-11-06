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
exports.Mia = exports.TIME_SEARCH_DEBOUNCE = exports.RESOURCE_JOB = exports.RESOURCE_JOBS = exports.ACTION_SHOW = exports.ACTION_REMOVE = exports.ACTION_APPROVE = void 0;
var future_1 = require("@quenk/noni/lib/control/monad/future");
var function_1 = require("@quenk/noni/lib/data/function");
var view_1 = require("@quenk/jouvert/lib/app/service/view");
var factory_1 = require("@quenk/jouvert/lib/app/remote/model/factory");
var director_1 = require("@quenk/jouvert/lib/app/director");
var remote_1 = require("@quenk/jouvert/lib/app/remote");
var app_1 = require("@quenk/dfront/lib/app");
var hash_1 = require("@quenk/frontend-routers/lib/hash");
var browser_1 = require("@quenk/jhr/lib/browser");
var app_2 = require("./views/app");
var routes_1 = require("./routes");
exports.ACTION_APPROVE = 'approve';
exports.ACTION_REMOVE = 'remove';
exports.ACTION_SHOW = 'show';
exports.RESOURCE_JOBS = '/admin/r/jobs';
exports.RESOURCE_JOB = '/admin/r/jobs/{id}';
exports.TIME_SEARCH_DEBOUNCE = 500;
var agent = (0, browser_1.createAgent)();
/**
 * Mia is the main class for the admin application.
 *
 * @param main    - The DOM node that the main application content will reside.
 * @param dialogs - The DOM node that will be used for dialogs.
 */
var Mia = /** @class */ (function (_super) {
    __extends(Mia, _super);
    function Mia(main, dialogs) {
        var _this = _super.call(this, main) || this;
        _this.main = main;
        _this.dialogs = dialogs;
        /**
         * view is the WML content to display on the screen.
         */
        _this.view = new app_2.MiaView(_this);
        /**
         * modelFactory for producing RemoteModels on request.
         */
        _this.modelFactory = factory_1.RemoteModelFactory.getInstance(_this, 'remote.background');
        _this.router = new hash_1.HashRouter(window, {});
        /**
         * values contains various bits of information used to generate
         * the view.
         */
        _this.values = {
            header: {
                links: {
                    Logout: function () { return _this.runFuture(_this.logout()); }
                }
            },
        };
        _this.onError = function (e) {
            console.error(e);
            alert('An error has occurred! Details have been logged to the console.');
        };
        return _this;
    }
    Mia.create = function (main, dialogs) {
        return new Mia(main, dialogs);
    };
    /**
     * logout the user from the application.
     */
    Mia.prototype.logout = function () {
        return confirm('Do you want to logout now?') ?
            agent
                .post('/admin/logout', {})
                .chain(function () {
                window.location.href = '/admin';
                return (0, future_1.pure)(undefined);
            }) :
            (0, future_1.pure)(undefined);
    };
    /**
     * runFuture is used to execute async work wrapped in the Future type.
     */
    Mia.prototype.runFuture = function (ft) {
        ft.fork(this.onError, function_1.noop);
    };
    /**
     * tell a message to an actor in the system.
     */
    Mia.prototype.tell = function (addr, msg) {
        this.vm.tell(addr, msg);
        return this;
    };
    Mia.prototype.run = function () {
        var _this = this;
        this.spawn({
            id: 'views',
            create: function () { return new view_1.ViewService(new view_1.HTMLElementViewDelegate(_this.main), _this); }
        });
        this.spawn({
            id: 'dialogs',
            create: function () { return new view_1.ViewService(new view_1.HTMLElementViewDelegate(_this.dialogs), _this); }
        });
        this.spawn({
            id: 'remote.background',
            create: function () { return new remote_1.Remote(agent, _this); }
        });
        this.spawn({
            id: 'router',
            create: function () { return new director_1.Director(_this.services.views, _this.router, {}, routes_1.routes, _this); }
        });
        this.router.start();
        setTimeout(function () { return _this.router.handleEvent(new Event('hashchanged')); }, 100);
    };
    return Mia;
}(app_1.DApplication));
exports.Mia = Mia;
//# sourceMappingURL=index.js.map