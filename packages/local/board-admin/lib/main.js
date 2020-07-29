"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardAdmin = void 0;
//import { BoardAdminView } from './views/app';
/**
 *
 */
var BoardAdmin = /** @class */ (function () {
    function BoardAdmin(node) {
        this.node = node;
        this.view = 1; //new BoardAdminView(this);
        this.values = {};
    }
    BoardAdmin.create = function (node) {
        return new BoardAdmin(node);
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
    };
    return BoardAdmin;
}());
exports.BoardAdmin = BoardAdmin;
BoardAdmin.create(document.getElementById('main')).run();
//# sourceMappingURL=main.js.map