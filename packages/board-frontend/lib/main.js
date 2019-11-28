"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var board_1 = require("./views/board");
var BoardDashboard = /** @class */ (function () {
    function BoardDashboard(content) {
        var _this = this;
        this.content = content;
        this.view = new board_1.BoardDashboardView(this);
        this.values = {
            main: { id: 'main' },
            data: {},
            controls: {
                change: function (e) {
                    _this.values.data[e.name] = e.value;
                },
                create: function () { },
            }
        };
    }
    BoardDashboard.create = function (id) {
        var e = document.getElementById(id);
        return new BoardDashboard(e);
    };
    BoardDashboard.prototype.setContent = function (view) {
        while (this.content.firstChild != null)
            this.content.removeChild(this.content.firstChild);
        this.content.appendChild(view.render());
    };
    BoardDashboard.prototype.run = function () {
        this.setContent(this.view);
    };
    return BoardDashboard;
}());
exports.BoardDashboard = BoardDashboard;
BoardDashboard.create('app').run();
//# sourceMappingURL=main.js.map