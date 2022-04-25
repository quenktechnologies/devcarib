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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostStream = void 0;
var wml_1 = require("@quenk/wml");
var views_1 = require("./views");
/**
 * PostStream is used to display recent post activity in a list view fashion.
 */
var PostStream = /** @class */ (function (_super) {
    __extends(PostStream, _super);
    function PostStream() {
        var _this = this;
        var _a;
        _this = _super.apply(this, arguments) || this;
        _this.view = new views_1.PostStreamView(_this);
        _this.values = {
            data: ((_a = _this.attrs.data) === null || _a === void 0 ? void 0 : _a.slice()) || [],
            getPostHref: function (post) { return "#/posts/".concat(post.id); },
            onClick: function (idx) { return function () {
                _this.attrs.onPost && _this.attrs.onPost(_this.values.data[idx]);
            }; }
        };
        return _this;
    }
    /**
     * update appends new posts to the stream.
     *
     * This will trigger a refresh of the view.
     */
    PostStream.prototype.update = function (data) {
        this.values.data = __spreadArray(__spreadArray([], this.values.data, true), data, true);
        this.view.invalidate();
    };
    return PostStream;
}(wml_1.Component));
exports.PostStream = PostStream;
//# sourceMappingURL=index.js.map