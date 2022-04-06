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
exports.PostEditor = void 0;
var wml_1 = require("@quenk/wml");
var views_1 = require("./views");
/**
 * PostEditor is used by the user to add a new [[Post]] to the system.
 */
var PostEditor = /** @class */ (function (_super) {
    __extends(PostEditor, _super);
    function PostEditor() {
        var _this = this;
        var _a, _b, _c, _d;
        _this = _super.apply(this, arguments) || this;
        _this.view = new views_1.PostEditorView(_this);
        _this.values = {
            title: {
                value: ((_a = _this.attrs.value) === null || _a === void 0 ? void 0 : _a.title) || '',
                error: (_b = _this.attrs.errors) === null || _b === void 0 ? void 0 : _b.title,
                onChange: _this.attrs.onChange
            },
            body: {
                value: (_c = _this.attrs.value) === null || _c === void 0 ? void 0 : _c.body,
                error: (_d = _this.attrs.errors) === null || _d === void 0 ? void 0 : _d.body,
                onChange: _this.attrs.onChange
            },
            post: {
                onClick: _this.attrs.onPost
            }
        };
        return _this;
    }
    return PostEditor;
}(wml_1.Component));
exports.PostEditor = PostEditor;
//# sourceMappingURL=index.js.map