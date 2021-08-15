"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionColumn = exports.StatusColumn = exports.CompanyColumn = exports.TitleColumn = void 0;
var views_1 = require("./views");
/**
 * TitleColumn displays the title of the post.
 */
var TitleColumn = /** @class */ (function () {
    function TitleColumn(action) {
        var _this = this;
        this.action = action;
        this.name = 'title';
        this.heading = 'Title';
        this.cellFragment = function (c) { return new views_1.TitleColumnView({
            post: c.datum,
            onClick: function () { return _this.action(c.datum); }
        }); };
    }
    return TitleColumn;
}());
exports.TitleColumn = TitleColumn;
/**
 * CompanyColumn displays the company name.
 */
var CompanyColumn = /** @class */ (function () {
    function CompanyColumn() {
        this.name = 'company';
        this.heading = 'Company';
    }
    return CompanyColumn;
}());
exports.CompanyColumn = CompanyColumn;
/**
 * StatusColumn displays the approval status of the post.
 */
var StatusColumn = /** @class */ (function () {
    function StatusColumn() {
        this.name = 'status';
        this.heading = 'Status';
    }
    return StatusColumn;
}());
exports.StatusColumn = StatusColumn;
/**
 * ActionColumn displays a drop-down menu with actions that can be taken on a
 * single post.
 */
var ActionColumn = /** @class */ (function () {
    function ActionColumn(actions) {
        var _this = this;
        this.actions = actions;
        this.name = '';
        this.heading = 'Actions';
        this.cellFragment = function (c) { return new views_1.ActionColumnView({
            actions: _this.actions,
            post: c.datum
        }); };
    }
    return ActionColumn;
}());
exports.ActionColumn = ActionColumn;
//# sourceMappingURL=index.js.map