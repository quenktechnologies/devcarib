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
exports.PostPanel = void 0;
var wml_1 = require("@quenk/wml");
var record_1 = require("@quenk/noni/lib/data/record");
var views_1 = require("./views");
/**
 * PostPanel displays a post made by a user.
 */
var PostPanel = /** @class */ (function (_super) {
    __extends(PostPanel, _super);
    function PostPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.readView = new views_1.PostPanelView(_this);
        _this.editView = new views_1.EditPostPanelView(_this);
        _this.view = _this.readView;
        _this.values = {
            editable: _this.attrs.editable,
            editing: false,
            data: _this.attrs.data,
            editor: {
                data: (0, record_1.clone)(_this.attrs.data),
                onChange: function (evt) {
                    _this.values.editor.data[evt.name] = evt.value;
                },
                onPost: function () {
                    _this.values.data = (0, record_1.clone)(_this.values.editor.data);
                    if (_this.attrs.onEdit)
                        _this.attrs.onEdit((0, record_1.clone)(_this.values.editor.data));
                    _this.view.tree.replaceWith(_this.readView.render());
                    _this.view = _this.readView;
                },
                onCancel: function () {
                    _this.values.editor.data = (0, record_1.clone)(_this.values.data);
                    _this.view.tree.replaceWith(_this.readView.render());
                    _this.view = _this.readView;
                },
                show: function () {
                    _this.view.tree.replaceWith(_this.editView.render());
                    _this.view = _this.editView;
                }
            }
        };
        return _this;
    }
    return PostPanel;
}(wml_1.Component));
exports.PostPanel = PostPanel;
//# sourceMappingURL=index.js.map