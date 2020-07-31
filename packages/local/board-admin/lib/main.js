"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardAdmin = void 0;
var browser_1 = require("@quenk/jhr/lib/browser");
var app_1 = require("./views/app");
var agent = browser_1.createAgent();
/**
 * BoardAdmin is the main class for the admin application.
 */
var BoardAdmin = /** @class */ (function () {
    function BoardAdmin(node) {
        this.node = node;
        /**
         * view is the WML content to display on the screen.
         */
        this.view = new app_1.BoardAdminView(this);
        /**
         * values contains various bits of information used to generate
         * the view.
         */
        this.values = {
            data: [],
            columns: [
                { name: 'title', heading: 'Title' },
                { name: 'approved', heading: 'Approved?' }
            ]
        };
    }
    BoardAdmin.create = function (node) {
        return new BoardAdmin(node);
    };
    BoardAdmin.prototype.loadPosts = function () {
        var _this = this;
        agent.get('/admin/r/posts').fork(console.error, function (r) {
            _this.values.data = r.body.data;
            _this.view.invalidate();
        });
    };
    /**
     * render a view of the application to the screen.
     */
    BoardAdmin.prototype.render = function (view) {
        while (this.node.firstChild != null)
            this.node.removeChild(this.node.firstChild);
        this.node.appendChild(view.render());
        window.scroll(0, 0);
    };
    /**
     * run the application.
     */
    BoardAdmin.prototype.run = function () {
        this.render(this.view);
        this.loadPosts();
    };
    return BoardAdmin;
}());
exports.BoardAdmin = BoardAdmin;
BoardAdmin.create(document.getElementById('main')).run();
//# sourceMappingURL=main.js.map